# get_ten
A game of getting ten seconds

## 访问地址

[点我](https://dawnfar.top/)

[备用地址](https://barnett617.github.io/get_ten)

[fork me on github](https://github.com/barnett617/get_ten)

## 背景

灵感来源于前阵子（2018年07月21日）去北京国家会议中心参加[看雪安全峰会](https://www.bagevent.com/event/1134294)玩的按十秒送书小游戏，和上周去南锣鼓巷看见很多家饮品店也有这个游戏，所以想到自己实现一个这样的小玩意，并借此运用一些前端的知识。这次专门考虑了移动端的访问（上次做了个[苹果发布会倒计时](https://barnett617.github.io/apple_time)，没有考虑到移动端的使用体验，发给朋友去测试，发现大多都是在移动端打开，而且是在微信中访问，真的体会到如今`移动优先`的重要性。因为如今移动端的web应用传播性显然要快于电脑，因为大家大部分时间是在移动互联网的世界，而打开电脑通过浏览器访问页面的条件显得有点苛刻）

## Key points

### 终端判断

根据不同的终端显示不同的说明，比如电脑打开，游戏说明改为通过按下`空格键`来进行游戏，而手机端或平板端通过触摸屏幕进行游戏

### 动作监听

PC端要监听第一次空格按下启动计时，再次按下停止计时

手机端或平板要监听触屏事件

### 毫秒计算

游戏进行过程中，要在屏幕实时显示毫秒进度

## 问题记录

问题一：使用jQuery绑定事件犯了低级错误，给hide掉的DOM先绑定click事件，再渲染DOM（show），当然不会生效，怎么调试都不生效。

本以为这个改掉会有效，但发现还有问题

问题二：两个id相同的button，根据条件进行hide和show，但当其中一个显示时，绑定事件，事件触发时并不会响应，可能因为找到两个id相同的元素

最终将两个button的id改为不同的名字，生效

问题三：创建函数的方式分两种，通过函数表达式创建的函数，在其创建之前调用是无效的，而通过函数声明的方式，在执行代码之前会先读取函数声明，所以声明位置不会影响

函数表达式
```js
var fun = function() {

};
```

函数声明
```js
function fun() {

}
```

问题四：当点击重玩按钮后需要重置游戏状态，若允许点击鼠标也作为游戏开始的触发，则点击重玩按钮时就会触发游戏初始化，随之触发鼠标点击事件，而经过刚刚的游戏初始化，符合时钟开始的条件，所以游戏会随着点击重玩的按钮点击，立即进入第二次计时开始，而未等用户在初始化后手动触发。（如果只用空格作为游戏动作则无此问题，主要由于鼠标点击重玩按钮也会作为游戏进行的触发条件）

~~解决方案：暂时去掉通过鼠标触发游戏进行，若有好的方案欢迎提PR~~

点击重玩按钮后解除点击事件监听，并初始化游戏，并阻止点击重玩按钮的事件冒泡，防止document监听到鼠标点击事件，在重玩按钮点击后自动触发下一次游戏开始

```js
event = event || window.event;

if (event && event.stopPropagation) {
    event.stopPropagation();
} else {
    event.cancelBubble = true;
}
```

## TODO List & Bugs

- [ ] 微信打开外来网址会失去样式
- [ ] 移动端字体适配
- [x] 鼠标控制游戏动作
- [ ] ~~小程序版本~~ (已有成熟产品，不重复造轮子)
- [ ] 毫秒数不总显示三位数
- [ ] 统计历史成绩

## 参考链接

- [cnblogs-JavaScript：事件对象Event和冒泡](https://www.cnblogs.com/smyhvae/p/8413602.html)
- [juejin-JS 中的事件绑定、事件监听、事件委托是什么？](https://juejin.im/entry/57ea329e67f3560057ad41a6)
- [csdn-JS制作计时器（毫秒级），简单、易懂](https://blog.csdn.net/qq_35616850/article/details/78425524)
- [Detect Mobile Browsers](http://detectmobilebrowsers.com/)
- [csdn-js判断客户端是pc端还是移动端](https://blog.csdn.net/kongjiea/article/details/17612899)

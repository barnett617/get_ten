//绑定监听事件
function addEventHandler(target,type,fn){
  if(target.addEventListener){
    target.addEventListener(type,fn);
  }else{
    target.attachEvent("on"+type,fn);
  }
}

//移除监听事件
function removeEventHandler(target,type,fn){
  if(target.removeEventListener){
    target.removeEventListener(type,fn);
  }else{
    target.detachEvent("on"+type,fn);
  }
}

//测试
// var btn5 = document.getElementById("btn5");
// addEventHandler(btn5,"click",hello1);//添加事件hello1
// addEventHandler(btn5,"click",hello2);//添加事件hello2
// removeEventHandler(btn5,"click",hello1);//移除事件hello
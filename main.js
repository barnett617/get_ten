var gameStatusEnum = {
  READY: 'ready',
  ING: 'ing',
  END: 'end',
  OTHER: 'other'
}

// 设备是否为移动设备（手机或平板）
var mobileDevice;
// 计时器
var clock;
// 区分动作是否是第一次执行
var gameStatus;
// 初始时间
var beginTime = '00:000';
// 游戏目标
var target = '10:000';
// 超时时限
var overtime = '11:000';

var ua = window.navigator.userAgent.toLowerCase();
console.log(ua);

/**
 * judge ua(from im-qq)
 */
var os = function() {
  var ua = navigator.userAgent,
  isWindowsPhone = /(?:Windows Phone)/.test(ua),
  isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone, 
  isAndroid = /(?:Android)/.test(ua), 
  isFireFox = /(?:Firefox)/.test(ua), 
  isChrome = /(?:Chrome|CriOS)/.test(ua),
  isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
  isPhone = /(?:iPhone)/.test(ua) && !isTablet,
  isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet: isTablet,
    isPhone: isPhone,
    isAndroid : isAndroid,
    isPc : isPc
  };
}();

var isMobile = function() {
  if(os.isAndroid || os.isPhone){
    alert('mobile');
  } else if(os.isTablet) {
    alert('tablet');
  } else {
  }
  if (os.isAndroid || os.isPhone || os.isTablet) {
    return 1;
  } else {
    return 0;
  }
};

/**
 * 初始化
 */
function initial() {
  
  // 初始时间
  $('#time').text(beginTime);
  // 初始动作状态
  gameStatus = gameStatusEnum.READY;
  // 初始内容显示
  $('#intro-content').show();
  $('#success').hide();
  $('#fail').hide();
  if (mobileDevice) {
    $('#pc').hide();
  } else {
    $('#mobile').hide();
  }
};

/**
 * 开启计时
 */
var startClock = function() {
  
  var showTime;
  var start = new Date().valueOf();
  clock = setInterval(function() {
    var now = new Date().valueOf();
    var gap = now - start;
    var second = parseInt(gap / 1000);
    var millisecond = parseInt(gap % 1000);
    if (second < 10) {
      second = '0' + second;
    }
    showTime = second + ':' + millisecond;
    if (showTime == overtime) {
      stopClock();
      handleFail();
    }
    $('#time').text(showTime);
  }, 1);
};

/**
 * 停止计时
 */
function stopClock() {
  window.clearInterval(clock);
};

/**
 * 处理成功显示
 */
var handleSuccess = function() {
  $('#intro-content').hide();
  $('#success').show();
  $('#successAgain').click(function() {
    initial();
  });
};

/**
 * 处理失败显示
 */
function handleFail() {
  $('#intro-content').hide();
  $('#fail').show();
  
  $('#failAgain').click(function() {
    
    initial();
  });
};

/**
 * 处理游戏结算
 */
var handleGameEnd = function() {
  var time = $('#time').text();
  if (time === target) {
    handleSuccess();
  } else {
    handleFail();
  }
};

/**
 * 用户发生动作
 */
var userAction = function() {
  
  if (gameStatus === gameStatusEnum.READY) {
    gameStatus = gameStatusEnum.ING;
    startClock();
  } else if(gameStatus === gameStatusEnum.ING) {
    gameStatus = gameStatusEnum.END;
    stopClock();
    handleGameEnd();
  }
}

/**
 * 绑定动作监听
 */
var listenAction = function() {
  // 根据设备类型监听用户动作事件
  if (mobileDevice) {
    $(document).bind('tap', function() {
      userAction();
    });
  } else {
    // $(document).bind('click', function() {
    //   userAction();
    // });
    $(document).keyup(function(event) {
      if(event.keyCode === 32) {
        userAction();
      }
    });
  }
};

var showScore = function() {

};

$(document).ready(function () {
  // 判断设备类型
  mobileDevice = isMobile();

  // 初始化
  initial();


  // 监听空格或触屏
  listenAction();

  // 显示结果
  showScore();
});




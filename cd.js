/*
1.首先绘制时间 根据digit.js。
2.根据endtime中传入的时间，在得到当前的时间，减法计算得出时间差。用秒表示。
3.render里：可以通过set函数算出具体相差的时分秒
4.50毫秒clearRect画布一次，
5.renderdigit:然后通过二维数组遍历确定每个小球的位置去绘制每一个小球。
添加动画效果---
6.在函数执行开始时，记录下当前时间nextShowTmeSeconds；
7.render时进行判断，取得当前的时间，一一进行比较与next是否有区别，有区别就addBall ,并赋值
8.addBall：有一个balls数组，记录所有的小球。
9.updateBall:更新balls中小球的x,y。并进行小球个数限制。50毫秒刷新一次。
*/
function CountDown(obj) {
  var WIDTH = $('body').width();
  var HEIGHT = $('body').height();
  this.WINDOW_WIDTH = obj.width || WIDTH;
  this.WINDOW_HEIGHT = obj.height || HEIGHT;
  this.R = this.WINDOW_WIDTH * 0.75 / 2 / 70;
  this.MARGIN_TOP = this.WINDOW_HEIGHT * 0.1;
  this.MAGIN_LEFT = this.WINDOW_WIDTH * 0.1;
  var time = new Date();
  this.endTime = obj.time ? new Date(obj.time) : new Date(time.setHours(time.getHours() + 1));
  this.curShowTimeSecond;
  this.c = obj.el[0];
  this.context = this.c.getContext('2d');
  this.c.width = this.WINDOW_WIDTH;
  this.c.height = this.WINDOW_HEIGHT;
  this.balls = [];
  var nextShowTmeSeconds = this.setCurrentShowTimeSecond();
  this.chours1 = parseInt(nextShowTmeSeconds / 3600 / 10);
  this.chours2 = parseInt(nextShowTmeSeconds / 3600 % 10);
  this.cminutes1 = parseInt((nextShowTmeSeconds - parseInt(nextShowTmeSeconds / 3600) * 3600) / 60 / 10);
  this.cminutes2 = parseInt((nextShowTmeSeconds - parseInt(nextShowTmeSeconds / 3600) * 3600) / 60 % 10);
  this.cseconds1 = parseInt(nextShowTmeSeconds % 60 / 10);
  this.cseconds2 = nextShowTmeSeconds % 60 % 10;
  this.init();
}
CountDown.prototype.init = function() {
  var that = this;
  var time = setInterval(function() {
    that.render(that.context);
    that.updateBall();
    if (this.curShowTimeSecond <= 0) {
      clearInterval(time)
    }
  }, 50);
}
CountDown.prototype.setCurrentShowTimeSecond = function() {
  var cur = new Date();
  var ret = this.endTime.getTime();
  var des = Math.round((ret - cur.getTime()) / 1000);
  return des > 0 ? des : 0; //返回的相差多少秒
}
CountDown.prototype.addBall = function(x, y, num) {
  var arr = digit[num];
  var len = arr.length;
  var R = this.R;
  for (var i = 0; i < len; i++) {
    var len2 = arr[i].length;
    for (var j = 0; j < len2; j++) {
      if (arr[i][j] == 1) {
        var ball = {};
        ball.x = x + (j) * 2 * (R + 1);
        ball.y = y + (i) * 2 * (R + 1);
        ball.vx = 5 * Math.pow(-1, Math.ceil(Math.random() * 1000));
        ball.vy = -3;
        ball.r = R;
        ball.a = 1.8 + Math.round(Math.random() * 10) * 0.1;
        ball.color = this.color();
        this.balls.push(ball)
      }
    }
  }
}
CountDown.prototype.updateBall = function() {
  var l = this.balls.length;

  for (var i = 0; i < l; i++) {
    var b = this.balls[i];
    b.x += b.vx;
    b.y += b.vy;
    b.vy += (b.a);
    if (b.y >= this.WINDOW_HEIGHT - b.r) {
      b.y = this.WINDOW_HEIGHT - b.r
      b.vy = -b.vy * 0.5;
    }
  }
  var l2 = this.balls.length;
  var cnt = 0;
  for (var m = 0; m < l2; m++) {
    var b = this.balls[m];
    if (b.x > 0 || b.x < this.WINDOW_WIDTH) {
      this.balls[cnt++] = b;
    }
  }
  this.balls.splice(cnt, l2 - cnt)
  while (this.balls.length > 500) {
    this.balls.splice(0, this.balls.length - 500)
  }
}
CountDown.prototype.color = function() {
  var str = 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')';
  return str;
}
CountDown.prototype.render = function() {
  this.context.clearRect(0, 0, this.WINDOW_WIDTH, this.WINDOW_HEIGHT); //先清除上次的动画
  this.curShowTimeSecond = this.setCurrentShowTimeSecond();
  var hours = parseInt(this.curShowTimeSecond / 3600);
  var minutes = parseInt((this.curShowTimeSecond - hours * 3600) / 60);
  var seconds = this.curShowTimeSecond % 60;
  var MAGIN_LEFT = this.MAGIN_LEFT;
  var MARGIN_TOP = this.MARGIN_TOP;
  var R = this.R;
  var context = this.context;
  ///
  if (parseInt(hours / 10) != this.chours1) {
    this.chours1 = parseInt(hours / 10);
    this.addBall(MAGIN_LEFT + R, MARGIN_TOP, parseInt(hours / 10));
  }
  if (hours % 10 != this.chours2) {
    this.chours2 = hours % 10;
    this.addBall(MAGIN_LEFT + 16 * (R + 1), MARGIN_TOP, hours % 10);
  }

  if (parseInt(minutes / 10) != this.cminutes1) {
    this.cminutes1 = parseInt(minutes / 10);
    this.addBall(MAGIN_LEFT + 40 * (R + 1), MARGIN_TOP, parseInt(minutes / 10));
  }
  if (minutes % 10 != this.cminutes2) {
    this.cminutes2 = minutes % 10;
    this.addBall(MAGIN_LEFT + 55 * (R + 1), MARGIN_TOP, minutes % 10);
  }
  if (parseInt(seconds / 10) != this.cseconds1) {
    this.cseconds1 = parseInt(seconds / 10);
    this.addBall(MAGIN_LEFT + 79 * (R + 1), MARGIN_TOP, parseInt(seconds / 10));
  }
  if (seconds % 10 != this.cseconds2) {
    this.cseconds2 = seconds % 10;
    this.addBall(MAGIN_LEFT + 95 * (R + 1), MARGIN_TOP, seconds % 10);
  }
  ///
  this.renderDigit(MAGIN_LEFT + R, MARGIN_TOP, parseInt(hours / 10), context);
  this.renderDigit(MAGIN_LEFT + 16 * (R + 1), MARGIN_TOP, hours % 10, context);
  this.renderDigit(MAGIN_LEFT + 31 * (R + 1), MARGIN_TOP, 10, context);

  this.renderDigit(MAGIN_LEFT + 40 * (R + 1), MARGIN_TOP, parseInt(minutes / 10), context);
  this.renderDigit(MAGIN_LEFT + 55 * (R + 1), MARGIN_TOP, minutes % 10, context);
  this.renderDigit(MAGIN_LEFT + 70 * (R + 1), MARGIN_TOP, 10, context);

  this.renderDigit(MAGIN_LEFT + 79 * (R + 1), MARGIN_TOP, parseInt(seconds / 10), context);
  this.renderDigit(MAGIN_LEFT + 95 * (R + 1), MARGIN_TOP, seconds % 10, context);

  var l = this.balls.length;
  for (var i = 0; i < l; i++) {
    var b = this.balls[i];
    context.beginPath();
    context.arc(b.x, b.y, R, 0, 2 * Math.PI);
    context.fillStyle = b.color;
    context.fill();

  }
}
CountDown.prototype.renderDigit = function(x, y, num, ctx) {
  var arr = digit[num];
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    var len2 = arr[i].length;
    for (var j = 0; j < len2; j++) {
      if (arr[i][j] == 1) {
        ctx.beginPath();
        ctx.fillStyle = '#5533CC'
        ctx.arc(x + (j) * 2 * (this.R + 1), y + (i) * 2 * (this.R + 1), this.R, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
}
$(function() {
  var WINDOW_WIDTH = 1024;
  var WINDOW_HEIGHT = 768;
  var R = 8;
  var MARGIN_TOP = 20;
  var MAGIN_LEFT = 10;
  const endTime = new Date(2016, 0, 25, 22, 55, 20);
  var curShowTimeSecond;
  var c = $('#canvas')[0];
  var context = c.getContext('2d');
  c.width = WINDOW_WIDTH;
  c.height = WINDOW_HEIGHT;
  var chours = null;
  var cminutes = null;
  var cseconds = null;
  var balls = [];
  var ns = null;
  var nextShowTmeSeconds = setCurrentShowTimeSecond();
  var chours1 = parseInt(nextShowTmeSeconds / 3600 / 10);
  var chours2 = parseInt(nextShowTmeSeconds / 3600 % 10);

  var cminutes1 = parseInt((nextShowTmeSeconds - parseInt(nextShowTmeSeconds / 3600) * 3600) / 60 / 10);
  var cminutes2 = parseInt((nextShowTmeSeconds - parseInt(nextShowTmeSeconds / 3600) * 3600) / 60 % 10);


  var cseconds1 = parseInt(nextShowTmeSeconds % 60 / 10);
  var cseconds2 = nextShowTmeSeconds % 60 % 10;
  var time = setInterval(function() {

    render(context);
    updateb(context)
  }, 50);

  function update() {

    var nexthours = parseInt(nextShowTmeSeconds / 3600);
    var nextminutes = parseInt((nextShowTmeSeconds - hours * 3600) / 60);
    var nextseconds = nextShowTmeSeconds % 60;
  }

  function setCurrentShowTimeSecond() {
    var current = new Date();
    var ret = endTime.getTime();
    var des = Math.round((ret - current.getTime()) / 1000);
    return des > 0 ? des : 0;
  }

  function render(context) {
    curShowTimeSecond = setCurrentShowTimeSecond();
    context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    var hours = parseInt(curShowTimeSecond / 3600);
    var minutes = parseInt((curShowTimeSecond - hours * 3600) / 60);
    var seconds = curShowTimeSecond % 60;
    if (parseInt(hours / 10) != chours1) {
      chours1 = parseInt(hours / 10);
      addBall(R, MARGIN_TOP, parseInt(hours / 10));
    }
    if (hours % 10 != chours2) {
      chours2 = hours % 10;
      addBall(16 * (R + 1), MARGIN_TOP, hours % 10);
    }

    if (parseInt(minutes / 10) != cminutes1) {
      cminutes1 = parseInt(minutes / 10);
      addBall(40 * (R + 1), MARGIN_TOP, parseInt(minutes / 10));
    }
    if (minutes % 10 != cminutes2) {
      cminutes2 = minutes % 10;
      addBall(55 * (R + 1), MARGIN_TOP, minutes % 10);
    }
    if (parseInt(seconds / 10) != cseconds1) {
      cseconds1 = parseInt(seconds / 10);
      addBall(79 * (R + 1), MARGIN_TOP, parseInt(seconds / 10));
    }
    if (seconds % 10 != cseconds2) {
      cseconds2 = seconds % 10;
      addBall(95 * (R + 1), MARGIN_TOP, seconds % 10);
    }
    renderDigit(R, MARGIN_TOP, parseInt(hours / 10), context);
    renderDigit(16 * (R + 1), MARGIN_TOP, hours % 10, context);
    renderDigit(31 * (R + 1), MARGIN_TOP, 10, context);

    renderDigit(40 * (R + 1), MARGIN_TOP, parseInt(minutes / 10), context);
    renderDigit(55 * (R + 1), MARGIN_TOP, minutes % 10, context);
    renderDigit(70 * (R + 1), MARGIN_TOP, 10, context);

    renderDigit(79 * (R + 1), MARGIN_TOP, parseInt(seconds / 10), context);
    renderDigit(95 * (R + 1), MARGIN_TOP, seconds % 10, context);
  }

  function updateb(ctx) {
    var l = balls.length;

    for (var i = 0; i < l; i++) {
      var b = balls[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy += (b.a);
      if (b.y >= 768 - b.r) {
        b.y = 768 - b.r
        b.vy = -b.vy * 0.5;
      }
      ctx.beginPath();
      ctx.arc(b.x, b.y, R, 0, 2 * Math.PI);
      ctx.fillStyle = b.color;
      ctx.fill();
    }

  }


  function addBall(x, y, num) {
    var arr = digit[num];
    var len = arr.length;
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
          ball.color = color();
          balls.push(ball)
        }
      }
    }

  }

  function renderDigit(x, y, num, ctx) {

    // ctx.moveTo(x,y);
    var arr = digit[num];
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      var len2 = arr[i].length;
      for (var j = 0; j < len2; j++) {
        if (arr[i][j] == 1) {
          ctx.beginPath();
          ctx.fillStyle = '#5533CC'
          ctx.arc(x + (j) * 2 * (R + 1), y + (i) * 2 * (R + 1), R, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }
  }

  function color() {
    var str = 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')';



    return str;
  }
})
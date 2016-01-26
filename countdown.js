$(function() {
  var bodywidth=$('body').width();
  var bodyheight=$('body').height();
  var WINDOW_WIDTH = bodywidth;
  var WINDOW_HEIGHT = bodyheight;
  var R = bodywidth*0.75/140;
  var MARGIN_TOP = bodyheight*0.1;
  var MAGIN_LEFT = bodywidth*0.1;
  const endTime = new Date(2016, 0, 26, 22, 55, 20);
  var curShowTimeSecond;
  var c = $('#canvas')[0];
  var context = c.getContext('2d');
  c.width = WINDOW_WIDTH;
  c.height = WINDOW_HEIGHT;
  var balls = [];
  var nextShowTmeSeconds = setCurrentShowTimeSecond();
  var chours1 = parseInt(nextShowTmeSeconds / 3600 / 10);
  var chours2 = parseInt(nextShowTmeSeconds / 3600 % 10);

  var cminutes1 = parseInt((nextShowTmeSeconds - parseInt(nextShowTmeSeconds / 3600) * 3600) / 60 / 10);
  var cminutes2 = parseInt((nextShowTmeSeconds - parseInt(nextShowTmeSeconds / 3600) * 3600) / 60 % 10);


  var cseconds1 = parseInt(nextShowTmeSeconds % 60 / 10);
  var cseconds2 = nextShowTmeSeconds % 60 % 10;
  
  var time = setInterval(function() {

    render(context);
    updateb(context);
  }, 50);

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
      addBall(MAGIN_LEFT+R, MARGIN_TOP, parseInt(hours / 10));
    }
    if (hours % 10 != chours2) {
      chours2 = hours % 10;
      addBall(MAGIN_LEFT+16 * (R + 1), MARGIN_TOP, hours % 10);
    }

    if (parseInt(minutes / 10) != cminutes1) {
      cminutes1 = parseInt(minutes / 10);
      addBall(MAGIN_LEFT+40 * (R + 1), MARGIN_TOP, parseInt(minutes / 10));
    }
    if (minutes % 10 != cminutes2) {
      cminutes2 = minutes % 10;
      addBall(MAGIN_LEFT+55 * (R + 1), MARGIN_TOP, minutes % 10);
    }
    if (parseInt(seconds / 10) != cseconds1) {
      cseconds1 = parseInt(seconds / 10);
      addBall(MAGIN_LEFT+79 * (R + 1), MARGIN_TOP, parseInt(seconds / 10));
    }
    if (seconds % 10 != cseconds2) {
      cseconds2 = seconds % 10;
      addBall(MAGIN_LEFT+95 * (R + 1), MARGIN_TOP, seconds % 10);
    }
    renderDigit(MAGIN_LEFT+R, MARGIN_TOP, parseInt(hours / 10), context);
    renderDigit(MAGIN_LEFT+16 * (R + 1), MARGIN_TOP, hours % 10, context);
    renderDigit(MAGIN_LEFT+31 * (R + 1), MARGIN_TOP, 10, context);

    renderDigit(MAGIN_LEFT+40 * (R + 1), MARGIN_TOP, parseInt(minutes / 10), context);
    renderDigit(MAGIN_LEFT+55 * (R + 1), MARGIN_TOP, minutes % 10, context);
    renderDigit(MAGIN_LEFT+70 * (R + 1), MARGIN_TOP, 10, context);

    renderDigit(MAGIN_LEFT+79 * (R + 1), MARGIN_TOP, parseInt(seconds / 10), context);
    renderDigit(MAGIN_LEFT+95 * (R + 1), MARGIN_TOP, seconds % 10, context);

    var l = balls.length;

    for (var i = 0; i < l; i++) {
      var b = balls[i];

      context.beginPath();
      context.arc(b.x, b.y, R, 0, 2 * Math.PI);
      context.fillStyle = b.color;
      context.fill();

    }
  }

  function updateb(ctx) {
    var l = balls.length;

    for (var i = 0; i < l; i++) {
      var b = balls[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy += (b.a);
      if (b.y >= WINDOW_HEIGHT - b.r) {
        b.y = WINDOW_HEIGHT - b.r
        b.vy = -b.vy * 0.5;
      }
    }
    var l2 = balls.length;
    var cnt=0;
    for(var m=0;m<l2;m++){
      var b = balls[m];
      if(b.x>0 || b.x<WINDOW_WIDTH){
        balls[cnt++]=b;
      }
    }
    balls.splice(cnt,l2-cnt)
    while(balls.length>500){
       balls.splice(0,balls.length-500)
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
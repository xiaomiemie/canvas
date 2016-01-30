  $(function() {
    var c = $('#canvas')[0];
    var context = c.getContext('2d'); //用context进行绘制
    var offc = $('#offcanvas')[0];
    var offcontext = offc.getContext('2d');
    var scalew;
    var scaleh;
    var mr = 50;
    var img = new Image();
    img.src = 'img.jpg';

    function distance(x, y, el) {
      var l = $(el).offset().left;
      var r = $(el).offset().top;
      return {
        x: x - l,
        y: y - r
      }
    }
    img.onload = function() {
      offc.width = img.width;
      offc.height = img.height;
      offcontext.drawImage(img, 0, 0)
      scalew = offc.width / c.width;
      scaleh = offc.height / c.height;
      context.drawImage(img, 0, 0, c.width, c.height);
    }
    $(c).on('mousedown', function(e) {
      draw(true, distance(e.pageX, e.pageY, this))
      $(c).on('mousemove', function(e) {
        draw(true, distance(e.pageX, e.pageY, this))
      });
      $(c).on('mouseout', function(e) {
        $(c).off('mousemove');
        draw(false, distance(e.pageX, e.pageY, this))
      });
    });
    $(c).on('mouseup', function(e) {
      $(c).off('mousemove');
      draw(false, distance(e.pageX, e.pageY, this))

    });

    function draw(flag, point) {
      context.clearRect(0, 0, c.width, c.height);
      context.drawImage(img, 0, 0, c.width, c.height);
      if (flag) {
        Magnifier(point)
      }
    }

    function Magnifier(point) {
      var cx = point.x * scalew;
      var cy = point.y * scaleh;
      var sx = parseInt(cx - mr);
      var sy = parseInt(cy - mr);
      var dx = parseInt(point.x - mr);
      var dy = parseInt(point.y - mr);
      //把第一个参数的图像，按照后面四个参数的方式截取，添加到后四个参数的地方
      context.save();
      context.beginPath();
      context.arc(point.x, point.y, mr, 0, 2 * Math.PI);
      context.lineWidth = 10;
      context.strokeStyle = '#690';
      context.stroke();
      context.clip();
      context.drawImage(offc, sx, sy, 2 * mr, 2 * mr, dx, dy, 2 * mr, 2 * mr);
      context.restore();
    }
  })
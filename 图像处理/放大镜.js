/*
这里我把放大镜效果封装起来。在html中创建两个canvas，传入相应参数调用即可。
*/

function Magnifier(obj) {
  this.c = obj.el1;
  this.context = this.c.getContext('2d');
  this.offc = obj.el2;
  this.offcontext = this.offc.getContext('2d');
  this.mr = obj.mr || 50;
  this.src = obj.src;
  this.scalew;
  this.scaleh;
  this.flag = false;
  this.img;
  this.createImage();
}

Magnifier.prototype.createImage = function() {
  this.img = new Image();
  this.img.src = this.src;
  var that = this;
  this.img.onload = function() {
    that.offc.width = that.img.width;
    that.offc.height = that.img.height;
    that.scaleh = that.offc.height / that.c.height;
    that.scalew = that.offc.width / that.c.width;
    that.offcontext.drawImage(that.img, 0, 0);
    that.context.drawImage(that.img, 0, 0, that.c.width, that.c.height);
    $(that.c).on('mousedown', function(e) {
      var p = that.distance(e.pageX, e.pageY, that.c);
      that.draw(true, p);
      $(that.c).on('mousemove', function(e) {
        var p = that.distance(e.pageX, e.pageY, that.c);
        that.draw(true, p)
      });
    });
    $(that.c).on('mouseout', function(e) {
      var p = that.distance(e.pageX, e.pageY, that.c);
      that.draw(false, p);
      $(that.c).off('mousemove');
    });
    $(that.c).on('mouseup', function(e) {
      var p = that.distance(e.pageX, e.pageY, that.c);
      that.draw(false, p);
      $(that.c).off('mousemove');
    });

  }
}
Magnifier.prototype.distance = function(x, y, el) {
  var l = $(el).offset().left;
  var r = $(el).offset().top;
  return {
    x: x - l,
    y: y - r
  }
}

Magnifier.prototype.draw = function(flag, point) {
  this.context.clearRect(0, 0, this.c.width, this.c.height);
  this.context.drawImage(this.img, 0, 0, this.c.width, this.c.height);
  if (flag) {
    this.drawMagnifier(point);
  }
}
Magnifier.prototype.drawMagnifier = function(point) {
  var cx = point.x * this.scalew; //实际的x,y
  var cy = point.y * this.scaleh;
  var sx = parseInt(cx - this.mr); //原图截取位置
  var sy = parseInt(cy - this.mr);
  var dx = parseInt(point.x - this.mr); //实际图展示位置
  var dy = parseInt(point.y - this.mr);
  //把第一个参数的图像，按照后面四个参数的方式截取，添加到后四个参数的地方
  this.context.save();
  this.context.beginPath();
  this.context.arc(point.x, point.y, this.mr, 0, 2 * Math.PI);
  this.context.lineWidth = 10;
  this.context.strokeStyle = '#690';
  this.context.stroke();
  this.context.clip();
  this.context.drawImage(this.offc, sx, sy, 2 * this.mr, 2 * this.mr, dx, dy, 2 * this.mr, 2 * this.mr);
  this.context.restore();
}
function HandWriting(obj) {
  this.c = obj.el;
  this.context = this.c.getContext('2d');
  this.canvasWidth = Math.min(800, $(window).width() - 20);
  this.canvasHeight = Math.min(500, $(window).height() * 0.7);
  this.c.width = this.canvasWidth;
  this.c.height = this.canvasHeight;
  this.lineWidth;
  this.lineColor = 'black';
  this.lastLoc = {
      x: 0,
      y: 0
    }
    // this.drawGrid();
  this.bindEvent();
  this.chooseColor();
  this.calcLineWidth();
  this.bindTouchEvent();
}

HandWriting.prototype.drawGrid = function() {
  var context = this.context;
  context.save();
  context.beginPath();
  context.lineWidth = 6;
  context.strokeStyle = 'red';
  context.strokeRect(3, 3, this.canvasWidth - 6, this.canvasHeight - 6);
  context.setLineDash([5, 5]); //参数：第一个是虚线的长度，第二个是两虚线段的间隔长度
  context.moveTo(3, 3);
  context.lineTo(this.canvasWidth - 3, this.canvasHeight - 3);
  context.moveTo(this.canvasWidth - 3, 3);
  context.lineTo(3, this.canvasHeight - 3);
  context.moveTo(this.canvasWidth / 2, 3);
  context.lineTo(this.canvasWidth / 2, this.canvasHeight - 3);
  context.moveTo(3, this.canvasHeight / 2);
  context.lineTo(this.canvasWidth - 3, this.canvasHeight / 2);

  context.strokeStyle = 'red';
  context.lineWidth = 1;
  context.stroke();
  context.restore();
}

HandWriting.prototype.bindEvent = function() {
  var c = this.c;
  var that = this;
  $(c).on('mousedown', function(e) {
    e.preventDefault();
    var p = that.distance(e.pageX, e.pageY, c)
    that.lastLoc.x = p.x;
    that.lastLoc.y = p.y;
    $(c).on('mousemove', function(e) {
      e.preventDefault();
      var curLoc = that.distance(e.pageX, e.pageY, c);
      that.draw(that.lastLoc.x, that.lastLoc.y, curLoc.x, curLoc.y)
      that.lastLoc = curLoc;
    });
  });
  $(c).on('mouseup', function(e) {
    e.preventDefault();
    $(c).off('mousemove')
  });
  $(c).on('mouseout', function(e) {
    e.preventDefault();
    $(c).off('mousemove');
  });


}
HandWriting.prototype.bindTouchEvent = function() {
  var c = this.c;
  var that = this;
  $(c).on('touchstart', function(e) {
    e.preventDefault();
    console.log(e)
    touch=e.originalEvent.touches[0];
    var p = that.distance(touch.pageX, touch.pageY, c)
    that.lastLoc.x = p.x;
    that.lastLoc.y = p.y;
    $(c).on('touchmove', function(e) {
      e.preventDefault();
      touch=e.originalEvent.touches[0];
      var curLoc = that.distance(touch.pageX, touch.pageY, c);
      that.draw(that.lastLoc.x, that.lastLoc.y, curLoc.x, curLoc.y)
      that.lastLoc = curLoc;
    });
  });
  $(c).on('touchend', function(e) {
    e.preventDefault();
    $(c).off('touchmove')
  });
  // $(c).on('mouseout', function(e) {
  //   e.preventDefault();
  //   $(c).off('mousemove');
  // });


}

HandWriting.prototype.distance = function(x, y, el) {
  var m = $(el).offset();
  return {
    x: x - m.left,
    y: y - m.top
  }
}
HandWriting.prototype.draw = function(bx, by, ex, ey) {
  var context = this.context;
  context.save();
  context.beginPath();
  context.moveTo(bx, by);
  context.lineTo(ex, ey);
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.lineWidth = this.lineWidth;
  context.strokeStyle = this.lineColor
  context.stroke();
  context.restore();

}

HandWriting.prototype.calcDistance = function(loc1, loc2) {
  return Math.sqrt((loc1.x - loc2.x) * (loc1.x - loc2.x) + (loc1.y - loc2.y) * (loc1.y - loc2.y));
}

HandWriting.prototype.calcLineWidth = function() {
  var value = $('#linewidth').val();
  var that = this;
  this.lineWidth = value * 10;
  $('#linewidth').on('change', function() {
    var v = $(this).val();
    that.lineWidth = v;
  })
}

HandWriting.prototype.chooseColor = function() {
  var that = this;
  $('.chooseColor button').on('click', function() {
    $('.chooseColor button').removeClass('light');
    $(this).addClass('light');
    var color = $(this).data('type');
    that.lineColor = color;
  })
}
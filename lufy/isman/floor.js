function Floor() {
  base(this, LSprite, []);
  this.hy = 0;
  this.y = 480;
  this.setView();
}
Floor.prototype.setView = function() {};
Floor.prototype.onframe = function() {
  this.y -= STAGE_STEP;
  if (this.child) {
    this.child.y -= STAGE_STEP;
  }
}
Floor.prototype.hitRun = function() {}
  //01
function Floor01() {
  base(this, Floor, []);

}
Floor01.prototype.setView = function() {
  this.bitmap = new LBitmap(new LBitmapData(imglist['floor0']));
  this.addChild(this.bitmap)
}

function Floor02() {
  base(this, Floor, []);
  var self = this;
  self.ctrlIndex = 0;
}
Floor02.prototype.setView = function() {
  var self = this;
  self.bitmap = new LBitmap(new LBitmapData(imglist["floor1"], 0, 0, 100, 20));
  self.addChild(self.bitmap);
}
Floor02.prototype.hitRun = function() {
  var self = this;
  self.callParent("hitRun", arguments);
  self.ctrlIndex++;
  if (self.ctrlIndex >= 40) {
    self.parent.removeChild(this);
  } else if (self.ctrlIndex == 20) {
    self.bitmap.bitmapData.setCoordinate(100, 0);
  }
}

function Floor03() {
  base(this, Floor, []);
  this.hit = false;
  this.hy = 10;
}
Floor03.prototype.setView = function() {
  var self = this;
  self.bitmap = new LBitmap(new LBitmapData(imglist["floor3"]));
  self.addChild(self.bitmap);
}
Floor03.prototype.hitRun = function() {
  var self = this;
  self.callParent("hitRun", arguments);
  if (self.hit) return;
  self.hit = true;
  self.child.hp -= 1;
}

function Floor04() {
  base(this, Floor, []);
  var self = this;
  self.ctrlIndex = 0;
  this.hy = 8;
}
Floor04.prototype.setView = function() {
  var self = this;
  self.bitmap = new LBitmap(new LBitmapData(imglist["floor2"], 0, 0, 100, 20));
  self.addChild(self.bitmap);
}
Floor04.prototype.onframe = function() {
  var self = this;
  self.callParent("onframe", arguments);
  self.ctrlIndex++;
  if (self.ctrlIndex == 20) self.bitmap.bitmapData.setCoordinate(0, 0);
}
Floor04.prototype.hitRun = function() {
  var self = this;
  self.callParent("hitRun", arguments);
  self.ctrlIndex = 0;
  self.child.y -= self.hy;
  self.child.speed = -4;
  self.child.isJump = true;
  // self.child = null;
  self.bitmap.bitmapData.setCoordinate(100, 0);
}
function Floor05(){
  base(this,Floor,[]);
}
Floor05.prototype.setView = function(){
  var self = this;
  self.graphics.drawRect(1,"#cccccc",[10,2,80,16]);
  self.wheelLeft = new LBitmap(new LBitmapData(imglist["wheel"]));
  self.addChild(self.wheelLeft);
  self.wheelRight = new LBitmap(new LBitmapData(imglist["wheel"]));
  self.wheelRight.x = 100 - self.wheelRight.getWidth()
  self.addChild(self.wheelRight);
}
Floor05.prototype.onframe = function (){
  var self = this;
  self.callParent("onframe",arguments);
  self.wheelLeft.rotate += 2;
  self.wheelRight.rotate += 2;
}
Floor05.prototype.hitRun = function (){
  var self = this;
  self.callParent("hitRun",arguments);
  self.child.x += (MOVE_STEP-1);
}
function Floor06(){
  base(this,Floor,[]);
}
Floor06.prototype.setView = function(){
  var self = this;
  self.graphics.drawRect(1,"#cccccc",[10,2,80,16]);
  self.wheelLeft = new LBitmap(new LBitmapData(imglist["wheel"]));
  self.addChild(self.wheelLeft);
  self.wheelRight = new LBitmap(new LBitmapData(imglist["wheel"]));
  self.wheelRight.x = 100 - self.wheelRight.getWidth()
  self.addChild(self.wheelRight);
}
Floor06.prototype.onframe = function (){
  var self = this;
  self.callParent("onframe",arguments);
  self.wheelLeft.rotate -= 2;
  self.wheelRight.rotate -= 2;
}
Floor06.prototype.hitRun = function (){
  var self = this;
  self.callParent("hitRun",arguments);
  self.child.x -= (MOVE_STEP-1);
}
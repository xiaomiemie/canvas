function Chara() {
  base(this, LSprite, []);
  this.moveType = null;
  this.isJump = true;
  this.hp = 3;
  this.speed = 0;
  this.index = 0;
  this.lastLoc = 0;
  this.x = 100;
  var list = LGlobal.divideCoordinate(960, 50, 1, 24);
  var data = new LBitmapData(imglist['hero'], 0, 0, 40, 50)
  this.animation = new LAnimation(this, data, [
    [list[0][0]],
    [list[0][1]],
    [list[0][2], list[0][3], list[0][4], list[0][5], list[0][6], list[0][7], list[0][8], list[0][9], list[0][10], list[0][11], list[0][12]],
    [list[0][13], list[0][14], list[0][15], list[0][16], list[0][17], list[0][18], list[0][19], list[0][20], list[0][21], list[0][22], list[0][23]]
  ]);

}

Chara.prototype.onframe = function() {
  this.lastLoc = this.y;
  this.y += this.speed;
  this.speed += g;
  var self=this;
  if (self.y > LGlobal.height) {
    self.hp --;
    self.y = 10;
    self.speed=0;
  } else if (self.y < 0) {
    self.hp--;
    self.y = 5;
    if (self.speed < 0) self.speed = 0;
  }
  if (this.speed > 20) {
    this.speed = 20;
  }

  if (this.moveType == 'left') {
    this.x -= MOVE_STEP;
  } else if (this.moveType == 'right') {
    this.x += MOVE_STEP;
  }
  if (this.x < 0) {
    this.x = 0
  } else if (this.x > LGlobal.width - 30) {
    this.x = LGlobal.width - 30
  }
  if (this.index-- < 0) {
    this.index = 10;
    this.animation.onframe();
  }
}

Chara.prototype.changeAction = function() {
  if (this.moveType == 'left') {
    this.animation.setAction(3)
  } else if (this.moveType == 'right') {
    this.animation.setAction(2)
  } else if (this.isJump) {
    this.animation.setAction(1, 0)
  } else {
    this.animation.setAction(0, 0)
  }
}
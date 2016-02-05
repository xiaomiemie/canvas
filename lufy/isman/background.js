function Background(){
  base(this,LSprite,[]);//实现继承
  this.bitmapData=new LBitmapData(imglist['back']);
  this.bitmap1=new LBitmap(this.bitmapData);
  this.addChild(this.bitmap1);
  this.bitmap2=new LBitmap(this.bitmapData);
  this.bitmap2.y=this.bitmap1.getHeight();
  this.addChild(this.bitmap2);
  this.bitmap3=new LBitmap(this.bitmapData);
  this.bitmap3.y=this.bitmap1.getHeight()*2;
  this.addChild(this.bitmap3);
}
Background.prototype.run=function(){
  this.bitmap1.y-=STAGE_STEP;
  this.bitmap2.y-=STAGE_STEP;
  this.bitmap3.y-=STAGE_STEP;
  var h = this.bitmap1.getHeight();
  if(this.bitmap1.y<-h){
    LAYER++;
    this.bitmap1.y=this.bitmap2.y;
    this.bitmap2.y=this.bitmap1.y+this.bitmap1.getHeight();
    this.bitmap3.y=this.bitmap1.y+this.bitmap1.getHeight()*2
  }
}
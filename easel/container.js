$(function(){
  /*
     var c = $('#canvas')[0];
   var stage = new createjs.Stage(c);//wutai
   var container = new createjs.Container();//创建容器
   stage.addChild(container);//容器添加到舞台上
    var rect = new createjs.Shape();
    rect.graphics.beginFill('red');
    rect.graphics.drawRect(5,5,50,50);
    container.x=100;
    container.addChild(rect);
    stage.update();
  */
function ChildContainer(){
  var rect = new createjs.Shape();
  rect.graphics.beginFill('red');
  rect.graphics.drawRect(5,5,50,50);
  rect.graphics.endFill();
  var text = new createjs.Text('1','30px Arial','#fff');
  this.addChild(rect);
  this.addChild(text);
}
ChildContainer.prototype=new createjs.Container();


  var c = $('#canvas')[0];
   var stage = new createjs.Stage(c);//wutai
   var container = new createjs.Container();//创建容器
   stage.addChild(container);//容器添加到舞台上
   var c= new ChildContainer();
   container.addChild(c);
   stage.update();


})
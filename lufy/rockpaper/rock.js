$(function() {
  init(200, 'canvas', 800, 500, main);

  function main() {
    // alert('x')
    var backLayer = new LSprite();
    addChild(backLayer);
    var resultLayer, clickLayer;
    var showlist = [];
    var imglist = {};
    var selfBitmap;
    var enemyBitmap;
    var selfTextAll;
    var selfTextWin;
    var selfTextLoss;
    var selfTextDraw;
    var win=0;
    var loss=0;
    var draw=0;
    var resultList = [
    [0,1,-1],
    [-1,0,1],
    [1,-1,0]
    ]
    var imgdata = [{
      name: 'title',
      path: 'images/title.png'
    }, {
      name: 'shitou',
      path: 'images/shitou.png'
    }, {
      name: 'jiandao',
      path: 'images/jiandao.png'
    }, {
      name: 'bu',
      path: 'images/bu.png'
    }]
    var loadingLayer = new LoadingSample3();
    backLayer.addChild(loadingLayer);
    LLoadManage.load(imgdata, function(progress) {
      loadingLayer.setProgress(progress)
    }, function(res) {
      imglist = res;
      backLayer.removeChild(loadingLayer);
      loadingLayer = null;
      gameInit();
    })

    function gameInit() {
      showlist.push(new LBitmapData(imglist['shitou']))
      showlist.push(new LBitmapData(imglist['jiandao']))
      showlist.push(new LBitmapData(imglist['bu']));
      //背景初始化
      backLayer.graphics.drawRect(10, '#008800', [0, 0, LGlobal.width, LGlobal.height], true, '#000000')
      //标题
      var titlebitmap= new LBitmap(new LBitmapData(imglist['title']));
      titlebitmap.y=10;
      titlebitmap.x=(LGlobal.width-titlebitmap.width)/2
      backLayer.addChild(titlebitmap);
      
      //玩家出拳图
      selfBitmap=new LBitmap(showlist[0]);
      selfBitmap.x=400-selfBitmap.width-50;
      selfBitmap.y=100;
      backLayer.addChild(selfBitmap);
      //电脑出拳图
      enemyBitmap=new LBitmap(showlist[0]);
      enemyBitmap.x=450;
      enemyBitmap.y=100;
      backLayer.addChild(enemyBitmap);
      
        //结果页面初始化
      resultLayerInit();
      //操作层初始化
      clickLayerInit();
    }

    function resultLayerInit() {
      resultLayer = new LSprite();
      resultLayer.graphics.drawRect(4, '#ff8800', [0, 0, 150, 110], true, 'white');
      resultLayer.x=10;
      resultLayer.y=100;
      backLayer.addChild(resultLayer);
      selfTextAll=new LTextField();
      selfTextAll.text="猜拳次数：0";
      selfTextAll.x=10;
      selfTextAll.y=20;
      selfTextAll.weight='bold';
      resultLayer.addChild(selfTextAll);
      selfTextWin=new LTextField();
      selfTextWin.text="胜利次数：0";
      selfTextWin.x=10;
      selfTextWin.y=40;
      selfTextWin.weight='bold';
      resultLayer.addChild(selfTextWin);
       selfTextLoss=new LTextField();
      selfTextLoss.text="失败次数：0";
      selfTextLoss.x=10;
      selfTextLoss.y=60;
      selfTextLoss.weight='bold';
      resultLayer.addChild(selfTextLoss);
       selfTextDraw=new LTextField();
      selfTextDraw.text="平局次数：0";
      selfTextDraw.x=10;
      selfTextDraw.y=80;
      selfTextDraw.weight='bold';
      resultLayer.addChild(selfTextDraw);
    }

    function clickLayerInit() {
      clickLayer = new LSprite();
      clickLayer.graphics.drawRect(4, '#ff8800', [0,0, 300, 110], true, '#ffffff');
      clickLayer.x=250;
      clickLayer.y=275;
      backLayer.addChild(clickLayer)
      var text = new LTextField();
      text.text='请出拳：';
      text.x=10;
      text.y=10;
      text.weight='bold'
      clickLayer.addChild(text);
      var btnshitou= getButton('shitou');
      btnshitou.x=30;
      btnshitou.y=35;
      clickLayer.addChild(btnshitou);
      btnshitou.addEventListener(LMouseEvent.MOUSE_UP,onclick);
      var btnjiandao= getButton('jiandao');
      btnjiandao.x=115;
      btnjiandao.y=35;
      btnjiandao.addEventListener(LMouseEvent.MOUSE_UP,onclick);
      clickLayer.addChild(btnjiandao);
      var btnbu= getButton('bu');
      btnbu.x=200;
      btnbu.y=35;
      btnbu.addEventListener(LMouseEvent.MOUSE_UP,onclick);
      clickLayer.addChild(btnbu);
    }
    
    function getButton(value){
      var btnUp=new LBitmap(new LBitmapData(imglist[value]));
      btnUp.scaleX=0.5;
      btnUp.scaleY=0.5;
      var btnOver= new LBitmap(new LBitmapData(imglist[value]));
      btnOver.x=2;
      btnOver.y=2;
      btnOver.scaleY=0.5;
      btnOver.scaleX=0.5;
      var btn = new LButton(btnUp,btnOver);
      btn.name=value;
      return btn;
    }
    
    function onclick(e,display){
      var selfvalue,enemyvalue;
      var name= display.name;
      if(name=='shitou'){
        selfvalue=0;
      }else if(name=='jiandao'){
        selfvalue=1;
      }else if(name=='bu'){
        selfvalue=2;
      }
      enemyvalue=Math.floor(Math.random()*3);
      selfBitmap.bitmapData=showlist[selfvalue]
      enemyBitmap.bitmapData=showlist[enemyvalue]
      checkResult(selfvalue,enemyvalue);
    }
    
    function checkResult(a,b){
      var res= resultList[a][b];
      if(res==0){
        selfTextDraw.text='平局次数：'+(++draw);
      }else if(res==1){
        selfTextWin.text='胜利次数：'+(++win);
      }else if(res==-1){
        selfTextLoss.text='失败次数：'+(++loss);
      }
      selfTextAll.text="猜拳次数："+(loss+win+draw);
    }


  }
})
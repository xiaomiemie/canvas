var backlayer, loadinglayer, backgroundlayer, obstaclelayer, manlayer;
var imglist = []
var showlist = [];
var stageSpeed = 0,
  hero, layers = 0,
  layersText, hpText;
var MOVE_STEP = 2,
  STAGE_STEP = 1;
var g = 0.08;
var LAYER = 0;
var imgData = new Array({
  name: "back",
  path: "./images/back.png"
}, {
  name: "hero",
  path: "./images/hero.png"
}, {
  name: "wheel",
  path: "./images/wheel.png"
}, {
  name: "floor0",
  path: "./images/floor0.png"
}, {
  name: "floor1",
  path: "./images/floor1.png"
}, {
  name: "floor2",
  path: "./images/floor2.png"
}, {
  name: "floor3",
  path: "./images/floor3.png"
});
init(10, 'canvas', 320, 480, main);

function main() {
  backlayer = new LSprite();
  addChild(backlayer);
  loadinglayer = new LoadingSample2();
  backlayer.addChild(loadinglayer);
  LLoadManage.load(imgData, function(p) {
    loadinglayer.setProgress(p)
  }, function(res) {
    imglist = res;
    backlayer.removeAllChild();
    loadinglayer = null;
    gameInit();
  })

  function gameInit() {
    backlayer.graphics.drawRect(1, '#000000', [0, 0, 320, 480], true, '#000000');
    //显示游戏标题
    var title = new LTextField();
    title.y = 100;
    title.size = 30;
    title.color = "#ffffff";
    title.text = "是男人就下100层";
    title.x = (LGlobal.width - title.getWidth()) / 2;
    backlayer.addChild(title);
    //显示说明文
    backlayer.graphics.drawRect(1, "#ffffff", [50, 240, 220, 40]);
    var txtClick = new LTextField();
    txtClick.size = 18;
    txtClick.color = "#ffffff";
    txtClick.text = "点击页面开始游戏";
    txtClick.x = (LGlobal.width - txtClick.getWidth()) / 2;
    txtClick.y = 245;
    backlayer.addChild(txtClick);
    //添加点击事件，点击画面则游戏开始
    backlayer.addEventListener(LMouseEvent.MOUSE_UP, function(event) {
      gameStart(false);
    });
  }

  function gameStart() {

    backlayer.die();
    backlayer.removeAllChild();
    //背景图片层
    backgroundlayer = new Background();
    backgroundlayer.addEventListener(LEvent.ENTER_FRAME, bgonframe);
    backlayer.addChild(backgroundlayer);
    //障碍层
    obstaclelayer = new LSprite();
    backlayer.addChild(obstaclelayer);
    wallInit();
    //人物层
    manlayer = new Chara();
    backlayer.addChild(manlayer);
    restart = false;
    layersText = new LTextField();
    layersText.x = 10;
    layersText.y = 20;
    layersText.size = 20;
    layersText.weight = "bolder";
    layersText.color = "#ffff00";
    backlayer.addChild(layersText);
    hpText = new LTextField();
    hpText.x = 10;
    hpText.y = 50;
    hpText.size = 20;
    hpText.weight = "bolder";
    hpText.color = "#ffffff";
    backlayer.addChild(hpText);
    if (!LGlobal.canTouch && !restart) {
      LEvent.addEventListener(window, LKeyboardEvent.KEY_DOWN, down);
      LEvent.addEventListener(window, LKeyboardEvent.KEY_UP, up);
    }
  }

  function showView() {
    layersText.text = LAYER;
    hpText.text = manlayer.hp == 3 ? "★★★" : manlayer.hp == 2 ? "★★" : manlayer.hp == 1 ? "★" : "";
  }

  function down(e) {
    // if(manlayer.moveType) return;
    if (e.keyCode == 37) {
      manlayer.moveType = 'left';
    } else if (e.keyCode == 39) {
      manlayer.moveType = 'right';
    }
    manlayer.changeAction();
  }

  function up() {
    manlayer.moveType = null;
    manlayer.changeAction();
  }

  function bgonframe() {
    backgroundlayer.run();
    showView()
    if (stageSpeed-- < 0) {
      stageSpeed = 100;
      addObstacle();
    }
    var key = null,
      found = false;
    // for()
    manlayer.isJump = true;
 for(key in obstaclelayer.childList){
         var _child = obstaclelayer.childList[key];
      if (_child.y < -_child.getHeight()) {
       obstaclelayer.removeChild(_child)
      }
      if (!found && manlayer.x + 35 > _child.x && manlayer.x <= _child.x + 90 &&
        manlayer.y + 55 >= _child.y && manlayer.lastLoc + 45 <= _child.y) {
        manlayer.isJump = false;
        manlayer.changeAction();
        manlayer.speed = 0;
        manlayer.y = _child.y - 50;
        _child.child = manlayer;
        _child.hitRun();
        found = true;
      } else {
        _child.child = null;
      }
      _child.onframe();
 }


    if (manlayer) {
      // manlayer.lastLoc=manlayer.y;
      if (manlayer.hp > 0) {
        manlayer.changeAction();
        manlayer.onframe();
      } else {
        gameOver();
      }
    }

  }

  function wallInit() {
    var bitmapDataUp = new LBitmapData(imglist["floor3"]);
    var bitmapUp;
    bitmapUp = new LBitmap(bitmapDataUp);
    bitmapUp.rotate = 180;
    addChild(bitmapUp);
    bitmapUp = new LBitmap(bitmapDataUp);
    bitmapUp.x = 90;
    bitmapUp.rotate = 180;
    addChild(bitmapUp);
    bitmapUp = new LBitmap(bitmapDataUp);
    bitmapUp.x = 90 * 2;
    bitmapUp.rotate = 180;
    addChild(bitmapUp);
    bitmapUp = new LBitmap(bitmapDataUp);
    bitmapUp.x = 90 * 3;
    bitmapUp.rotate = 180;
    addChild(bitmapUp);

  }

  function gameOver() {
    // alert('x')
    backlayer.die();
    var overLayer = new LSprite();
    backlayer.addChild(overLayer);
    overLayer.graphics.drawRect(4, '#ff8800', [0, 0, 200, 100], true, '#ffffff');
    overLayer.x = (LGlobal.width - overLayer.getWidth()) * 0.5;
    overLayer.y = (LGlobal.height - overLayer.getHeight()) * 0.5;
    var txt;
    txt = new LTextField();
    txt.text = "成绩：" + layersText.text;
    txt.x = 20;
    txt.y = 20;
    overLayer.addChild(txt);
    txt = new LTextField();
    txt.text = "继续加油！！";
    txt.x = 20;
    txt.y = 50;
    overLayer.addChild(txt);
  }

  function addObstacle() {
    // var index = parseInt(Math.random() * 2);
    var index = Math.random() * 6;
    if (index < 1) {
      obs = new Floor06();
    } else if (index < 2) {
      obs = new Floor05();
    } else if (index < 3) {
      obs = new Floor04();
    } else if (index < 4) {
      obs = new Floor03();
    } else if (index < 5) {
      obs = new Floor02();
    } else if (index < 6) {
      obs = new Floor01();
    }

    obs.y = 480;
    obs.x = parseInt(Math.random() * 280);
    obstaclelayer.addChild(obs);
  }


}
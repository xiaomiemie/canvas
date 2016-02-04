$(function() {
  init(50, 'canvas', 320, 480, main);
  var backlayer, loadinglayer, boxMap, nextlayer;
  var map;
  var nodeList;
  var box;
  //得分相关
  var point = 0,
    pointText;
  //消除层数相关
  var del = 0,
    delText;
  //控制相关
  var myKey = {
    keyControl: null,
    step: 1,
    stepindex: 0,
    isTouchDown: false,
    touchX: 0,
    touchY: 0,
    touchMove: false
  };
  //当前方块，预览方块
  var nowBox, nextBox;
  //方块区域起始位置
  var pointBox = {
    x: 0,
    y: 0
  }
  var speed = 15,
    speedMax = 15,
    speedText, speedIndex = 0;
  var START_X1 = 15,
    START_Y1 = 20,
    START_X2 = 228,
    START_Y2 = 65;
  var imglist;
  var showlist = [];
  var imgData = [{
    name: 'background',
    path: 'images/backImage.png'
  }, {
    name: 'r1',
    path: 'images/r1.png'
  }, {
    name: 'r2',
    path: 'images/r2.png'
  }, {
    name: 'r3',
    path: 'images/r3.png'
  }, {
    name: 'r4',
    path: 'images/r4.png'
  }];

  function main() {
    //背景
    map = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    backlayer = new LSprite();
    backlayer.graphics.drawRect(0, '#00000', [0, 0, 320, 480], true, '#000000')
    addChild(backlayer);
    //标题
    var loadinglayer = new LoadingSample2();
    backlayer.addChild(loadinglayer);
    LLoadManage.load(imgData, function(p) {
      loadinglayer.setProgress(p);
    }, function(res) {
      imglist = res;
      backlayer.removeChild(loadinglayer);
      loadinglayer = null;
      gameInit();
    });
    //PC的时候，添加键盘事件 【上 下 左 右】
    LEvent.addEventListener(LGlobal.window, LKeyboardEvent.KEY_DOWN, onkeydown);
    LEvent.addEventListener(LGlobal.window, LKeyboardEvent.KEY_UP, onkeyup);

    function gameInit() {
      showlist.push(new LBitmapData(imglist['r1']))
      showlist.push(new LBitmapData(imglist['r2']))
      showlist.push(new LBitmapData(imglist['r3']))
      showlist.push(new LBitmapData(imglist['r4']))
      showlist.push(new LBitmapData(imglist['background']));
      var title = new LTextField();
      title.x = 50;
      title.y = 100;
      title.size = 30;
      title.color = '#ffffff';
      title.text = "俄罗斯方块";
      backlayer.addChild(title);
      backlayer.graphics.drawRect(1, '#ffffff', [50, 240, 220, 40])
      var txtclick = new LTextField();
      txtclick.size = 18;
      txtclick.color = '#ffffff';
      txtclick.text = '点击页面游戏开始';
      txtclick.x = (LGlobal.width - txtclick.getWidth()) / 2;
      txtclick.y = 245;
      backlayer.addChild(txtclick);
      backlayer.addEventListener(LMouseEvent.MOUSE_UP, gameStart);
    }

    function gameStart() {
      //背景层清空
      backlayer.die();
      backlayer.removeAllChild();
      //背景图片添加
      backlayer.addChild(new LBitmap(showlist[4]))
      clearBox();
      nextlayer = new LSprite();
      backlayer.addChild(nextlayer);
      getNewBox();
      plusBox();
      drawMap();
      //得分表示
      pointText = new LTextField();
      pointText.x = 240;
      pointText.y = 200;
      pointText.size = 20;
      backlayer.addChild(pointText);
      //消除层数表示
      delText = new LTextField();
      delText.x = 240;
      delText.y = 290;
      delText.size = 20;
      backlayer.addChild(delText);
      //速度表示
      speedText = new LTextField();
      speedText.x = 240;
      speedText.y = 385;
      speedText.size = 20;
      backlayer.addChild(speedText);
      //将游戏得分，消除层数以及游戏速度显示到画面上
      showText();
      backlayer.addEventListener(LEvent.ENTER_FRAME, onframe);
    }

    function onframe() {
      minusBox();
      if (myKey.keyControl != null && myKey.stepindex-- < 0) {
        myKey.stepindex = myKey.step;
        switch (myKey.keyControl) {
          case "left":
            if (checkPlus(-1, 0)) {
              pointBox.x -= 1;
              if (LGlobal.canTouch || true) {
                myKey.keyControl = null;
                myKey.touchMove = true;
                myKey.touchX = 0;
              }
            }
            break;
          case "right":
            if (checkPlus(1, 0)) {
              pointBox.x += 1;
              if (LGlobal.canTouch || true) {
                myKey.keyControl = null;
                myKey.touchMove = true;
                myKey.touchX = 0;
              }
            }
            break;
          case "down":
            if (checkPlus(0, 1)) {
              pointBox.y += 1;
              if (LGlobal.canTouch || true) {
                myKey.keyControl = null;
                myKey.touchMove = true;
                myKey.touchY = 0;
              }
            }
            break;
          case "up":
            changeBox();
            if (LGlobal.canTouch || true) {
              myKey.keyControl = null;
              myKey.stepindex = 0;
            }
            break;
        }
      }
      if (speedIndex++ > speed) {
        speedIndex = 0;
        if (checkPlus(0, 1)) {
          pointBox.y++;
        } else {
          plusBox();
          if (pointBox.y < 0) {
            gameOver();
            return;
          }
          removeBox();
          getNewBox();
        }
      }
      plusBox();
      drawMap();
    }
    //方块变形
    function changeBox() {
      var saveBox = nowBox;
      nowBox = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      var i, j;
      for (i = 0; i < saveBox.length; i++) {
        for (j = 0; j < saveBox[1].length; j++) {
          nowBox[i][j] = saveBox[(3 - j)][i];
        }
      }
      if (!checkPlus(0, 0)) {
        nowBox = saveBox;
      }
    }
    //消除指定层的方块
    function moveLine(line) {
      var i;
      for (i = line; i > 1; i--) {
        for (j = 0; j < map[0].length; j++) {
          map[i][j] = map[i - 1][j];
          nodeList[i][j].index = nodeList[i - 1][j].index;
        }
      }
      for (j = 0; j < map[0].length; j++) {
        map[0][j] = 0;
        nodeList[0][j].index = -1;
      }
    }
    //绘制所有方块
    function drawMap() {
      var i, j, boxl = 15;
      for (i = 0; i < map.length; i++) {
        for (j = 0; j < map[0].length; j++) {
          if (nodeList[i][j]["index"] >= 0) {
            nodeList[i][j]["bitmap"].bitmapData = showlist[nodeList[i][j]["index"]];
          } else {
            nodeList[i][j]["bitmap"].bitmapData = null;
          }
        }
      }
    }
    //消除可消除的方块
    function removeBox() {
      var i, j, count = 0;
      for (i = pointBox.y; i < (pointBox.y + 4); i++) {
        if (i < 0 || i >= map.length) continue;
        for (j = 0; j < map[0].length; j++) {
          if (map[i][j] == 0) {
            break;
          }
          if (j == map[0].length - 1) {
            moveLine(i);
            count++;
          }
        }
      }
      if (count == 0) return;
      del += count;
      if (count == 1) {
        point += 1;
      } else if (count == 2) {
        point += 3;
      } else if (count == 3) {
        point += 6;
      } else if (count == 4) {
        point += 10;
      }
      if (speed > 1 && del / 100 >= (speedMax - speed + 1)) {
        speed--;
      }
      showText();
    }
    //键盘按下事件
    function onkeydown(event) {
      if (myKey.keyControl != null) return;
      if (event.keyCode == 37) { //left
        myKey.keyControl = "left";
      } else if (event.keyCode == 38) { //up
        myKey.keyControl = "up";
      } else if (event.keyCode == 39) { //right
        myKey.keyControl = "right";
      } else if (event.keyCode == 40) { //down
        myKey.keyControl = "down";
      }
    }
    //游戏得分，消除层数以及游戏速度显示
    function showText() {
      pointText.text = point;
      delText.text = del;
      speedText.text = speedMax - speed + 1;
    }
    //键盘弹起事件
    function onkeyup(event) {
      myKey.keyControl = null;
      myKey.stepindex = 0;
    }
    //方格数据初始化
    function clearBox() {
      boxMap = new LSprite();
      backlayer.addChild(boxMap)
      nodeList = [];
      var i, j, nArr, bitmap;
      for (i = 0; i < map.length; i++) {
        nArr = [];
        for (j = 0; j < map[0].length; j++) {
          bitmap = new LBitmap(showlist[0]);
          bitmap.x = bitmap.getWidth() * j + START_X1;
          bitmap.y = bitmap.getHeight() * i + START_Y1;
          boxMap.addChild(bitmap);
          nArr[j] = {
            index: -1,
            value: 0,
            bitmap: bitmap
          }
        }
        nodeList[i] = nArr;
      }
    }
    //游戏结束
    function gameOver() {
      backlayer.die();
      var txt = new LTextField();
      txt.color = "#ff0000";
      txt.size = 40;
      txt.text = "游戏结束";
      txt.x = (LGlobal.width - txt.getWidth()) * 0.5;
      txt.y = 200;
      backlayer.addChild(txt);
    }

    function getNewBox() {
      box = new Box();
      pointBox.x = 3;
      pointBox.y = -4;
      if (nextBox == null) {
        nextBox = box.getBox();
      }
      nowBox = nextBox;
      nextBox = box.getBox();
      nextlayer.removeAllChild();
      var i, j, bitmap;
      for (i = 0; i < nextBox.length; i++) {
        for (j = 0; j < nextBox[0].length; j++) {
          if (nextBox[i][j] == 0) {
            continue;
          }
          bitmap = new LBitmap(showlist[nextBox[i][j] - 1]);
          bitmap.x = bitmap.getWidth() * j + START_X2;
          bitmap.y = bitmap.getHeight() * i + START_Y2;
          nextlayer.addChild(bitmap);
        }
      }
    }

    function plusBox() {
      for (var i = 0; i < nowBox.length; i++) {
        for (var j = 0; j < nowBox[0].length; j++) {
          if (i + pointBox.y < 0 || i + pointBox.y >= map.length || j + pointBox.x < 0 || j + pointBox.x >= map[0].length) {
            continue;
          }
          map[i + pointBox.y][j + pointBox.x] = nowBox[i][j] + map[i + pointBox.y][j + pointBox.x];
          nodeList[i + pointBox.y][j + pointBox.x]['index'] = map[i + pointBox.y][j + pointBox.x] - 1;
        }
      }
    }

    //移除方块
    function minusBox() {
      var i, j;
      for (i = 0; i < nowBox.length; i++) {
        for (j = 0; j < nowBox[i].length; j++) {
          if (i + pointBox.y < 0 || i + pointBox.y >= map.length || j + pointBox.x < 0 || j + pointBox.x >= map[0].length) {
            continue;
          }
          map[i + pointBox.y][j + pointBox.x] = map[i + pointBox.y][j + pointBox.x] - nowBox[i][j];
          nodeList[i + pointBox.y][j + pointBox.x]["index"] = map[i + pointBox.y][j + pointBox.x] - 1;
        }
      }
    }

    //判断是否可移动
    function checkPlus(nx, ny) {
      var i, j;
      for (i = 0; i < nowBox.length; i++) {
        for (j = 0; j < nowBox[i].length; j++) {
          if (i + pointBox.y + ny < 0) {
            continue;
          } else if (i + pointBox.y + ny >= map.length || j + pointBox.x + nx < 0 || j + pointBox.x + nx >= map[0].length) {
            if (nowBox[i][j] == 0) {
              continue;
            } else {
              return false;
            }
          }
          if (nowBox[i][j] > 0 && map[i + pointBox.y + ny][j + pointBox.x + nx] > 0) {
            return false;
          }
        }
      }
      return true;
    }
  }



})
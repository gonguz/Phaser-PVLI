(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var numeroGenerado;
var text;
var alternativeMenu = {
  menuMusic: {},
    create: function () {
        this.game.world.setBounds(0,0,800,600);

        this.music = this.game.add.audio('menu');
        this.music.play();

        var alternativeMenu = this.game.add.image(this.game.world.centerX-350,
                                        this.game.world.centerY,
                                        'alternativeMenu');
                                        alternativeMenu.anchor.setTo(0.1, 0.4);

        var buttonStart = this.game.add.button(this.game.world.centerX,
                                               this.game.world.centerY,
                                               'boton',
                                               this.actionOnClick,
                                               this, 2, 1, 0);
        buttonStart.anchor.set(0.5);
        var otherModeButton = this.game.add.button(this.game.world.centerX - 75,
                                               this.game.world.centerY + 150, 'otherModeButton', this.actionOnClick2, this, 2, 1, 0);

        var randomButton = this.game.add.button(this.game.world.centerX + 220,
                                               this.game.world.centerY + 50, 'randomMode', this.chosenModeButton, this, 2, 1, 0);
        var diceText = this.game.add.text(randomButton.x - 40, randomButton.y - 40, "I'M A BUTTON TOO!", {fill: '#ff0000'});
        diceText.font = 'firacode';
        diceText.anchor.set(0.2);

        numeroGenerado = this.aleatorioButton(1, 7);
    },

    actionOnClick: function(){
        this.game.state.start('play');
        this.music.stop();
    },

    actionOnClick2: function(){
        this.game.state.start('play2');
        this.music.stop();
    },

    aleatorioButton: function(inferior, superior){
      var numPosibilidades = superior - inferior;
   	  var aleat = Math.random() * numPosibilidades;
   	  aleat = Math.round(aleat);
   	  return parseInt(inferior) + aleat;
    },

    chosenModeButton: function(){
      if(numeroGenerado >= 1 && numeroGenerado <= 2){
        this.game.state.start('play');
      }
      else if(numeroGenerado > 2 && numeroGenerado <= 4){
        this.game.state.start('play2');
      }
      else if(numeroGenerado > 4 && numeroGenerado <= 7){
        this.game.state.start('noModeScene');
      }
      this.music.stop();
    }
};

module.exports = alternativeMenu;

},{}],2:[function(require,module,exports){
var credits = {
  greetingsMusic: {},
  create: function(){
    this.game.world.setBounds(0,0,800,600);

    this.greetingsMusic = this.game.add.audio('greetingsMusic');
    this.greetingsMusic.play();

    var creditsBackground = this.game.add.sprite(this.game.world.centerX,
                                    this.game.world.centerY,
                                    'credits');
    creditsBackground.anchor.setTo(0.5, 0.5);
    creditsBackground.scale.setTo(1,0.75);

    var menuButton = this.game.add.button(this.game.world.centerX - 70,
                                           this.game.world.centerY * 1.5,
                                           'botonMenu',
                                           this.actionOnClick,
                                           this, 2, 1, 0)
  },

  actionOnClick: function(){
      this.game.state.start('menu');
      this.greetingsMusic.stop();
  }
};

module.exports = credits;

},{}],3:[function(require,module,exports){
var finalScene = {
  endMusic: {},
  create: function(){
    this.game.world.setBounds(0,0,800,600);


    this.endMusic = this.game.add.audio('endSong');
    this.endMusic.play();
    var finalBackground = this.game.add.sprite(this.game.world.centerX,
                                    this.game.world.centerY,
                                    'finalBackground')
    finalBackground.anchor.setTo(0.5, 0.5);

    var finalText = this.game.add.sprite(this.game.world.centerX,
                                    this.game.world.centerY/2,
                                    'finalText');

    finalText.anchor.setTo(0.5,0.5);

    var botonGreetings = this.game.add.button(this.game.world.centerX / 2,
                                           this.game.world.centerY * 1.5,
                                           'botonGreetings',
                                           this.actionOnClick,
                                           this, 2, 1, 0);
    botonGreetings.anchor.set(0.5);

    var buttonMenu = this.game.add.button(this.game.world.centerX*1.5,
    this.game.world.centerY * 1.5, 'botonMenu', this.returnToMenu, this, 2, 1, 0);

    buttonMenu.anchor.set(0.5);
  },

  actionOnClick: function(){
      this.game.state.start('credits');
      this.endMusic.stop();
  },

  returnToMenu: function(){
    this.game.state.start('menu');
    this.endMusic.stop();
  }
};

module.exports = finalScene;

},{}],4:[function(require,module,exports){
var firstScene = {
  create: function(){
  this.game.world.setBounds(0,0,800,600);

  var firstSceneBackground = this.game.add.sprite(this.game.world.centerX-350,
                                  this.game.world.centerY,
                                  'firstSceneBackground');
                                  firstSceneBackground.anchor.setTo(0.1, 0.4);

  var continueButton = this.game.add.button(this.game.world.centerX - 150, this.game.world.centerY + 200,
                                          'continueButton', this.actionContinueButton, this, 2, 1, 0);
      continueButton.anchor.set(0.5);


  var noButton = this.game.add.button(this.game.world.centerX + 150, this.game.world.centerY + 200,
                                          'noButton', this.actionNoButton, this, 2, 1, 0);
      noButton.anchor.set(0.5);
  },

  actionContinueButton: function(){
    this.game.state.start('secondScene');
  },
  actionNoButton: function(){
    this.game.state.start('alternativeMenu');
  }

};

module.exports = firstScene;

},{}],5:[function(require,module,exports){
var GameOver = {
  gameOverAudio: {},
    create: function () {
        this.game.stage.backgroundColor = "#000000";
        this.game.world.setBounds(0,0,800,600);
        this.gameOverAudio = this.game.add.audio("gameOver");
        this.gameOverAudio.play();
        var gameOverImage = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY/3,
        'gameOverImage');
        gameOverImage.anchor.set(0.5);
        var botonMenu = this.game.add.button(this.game.world.centerX,
                                               this.game.world.centerY,
                                               'botonMenu',
                                               this.returnToMenu,
                                               this, 2, 1, 0);

        botonMenu.anchor.set(0.5);

    },

    //TODO 7 declarar el callback del boton.
    returnToMenu: function(){
      this.game.state.start('menu');
      this.gameOverAudio.stop();
    }

};

module.exports = GameOver;

},{}],6:[function(require,module,exports){
'use strict';

//TODO 1.1 Require de las escenas, play_scene, gameover_scene y menu_scene.

var playScene = require('./play_scene.js');
var playScene2 = require('./play_scene2.js');
var gameOver = require('./gameover_scene.js');
var menuScene = require('./menu_scene.js');
var finalScene = require('./final_scene.js');
var noModeScene = require('./noMode_scene.js');
var credits = require('./credits.js');
var firstScene = require('./first_scene.js');
var secondScene = require('./second_scene.js');
var thirdScene = require('./third_scene.js');
var alternativeMenu = require('./alternativeMenu.js');

//  The Google WebFont Loader will look for this object, so create it before loading the script.




var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    this.game.load.spritesheet('boton', 'images/boton.png', 168, 70);
    this.game.load.image('otherModeButton', 'images/otherMode.png');
    this.game.load.image('randomMode', 'images/randomButton.png');
    this.game.load.image('specialModeButton', 'images/specialMode.png');
    this.game.load.image('logo', 'images/phaser.png');
    this.game.load.image('title', 'images/title.png');
    this.game.load.image('starsBackground', 'images/starsBackground.png');
    this.game.load.image('firstSceneBackground', 'images/firstSceneBackground.png');
    this.game.load.image('secondSceneBackground', 'images/secondSceneBackground.png');
    this.game.load.image('terceraEscenaBackground', 'images/terceraEscenaBackground.png');
    this.game.load.image('alternativeMenu', 'images/alternativeMenu.png');
    this.game.load.image('gameOverImage', 'images/gameOverImage.png');
    this.game.load.image('botonRestart', 'images/botonRestart.png');
    this.game.load.image('botonMenu', 'images/botonMenu.png');
    this.game.load.image('botonContinuar', 'images/botonContinuar.png');
    this.game.load.image('botonGreetings', 'images/botonGreetings.png');
    this.game.load.image('continueButton', 'images/continueButton.png');
    this.game.load.image('noButton', 'images/noButton.png');
    this.game.load.image('pauseBackground', 'images/pauseBackground.jpg');
    this.game.load.image('pauseText', 'images/pauseText.png');
    this.game.load.image('pauseIcon', 'images/pauseIcon.png');
    this.game.load.image('finalBackground', 'images/finalBackground.png');
    this.game.load.image('credits', 'images/credits.png');
    this.game.load.image('finalText', 'images/finalText.png');
    this.game.load.image('noMode', 'images/noModeImage.png');
    this.game.load.audio('menu', 'sounds/menu.mp3');
    this.game.load.audio('inGame', 'sounds/inGame.mp3');
    this.game.load.audio('shoot', 'sounds/shoot.mp3');
    this.game.load.audio('teleport', 'sounds/teleport.mp3');
    this.game.load.audio('pausa', 'sounds/pausa.mp3');
    this.game.load.audio('gameOver', 'sounds/gameOver.mp3');
    this.game.load.audio('endSong', 'sounds/endSong.mp3');
    this.game.load.audio('noSceneSound', 'sounds/noSceneSound.mp3');
    this.game.load.audio('greetingsMusic', 'sounds/greetingsMusic.mp3');
    this.game.load.spritesheet('skull', 'images/skullAnimation.png', 99, 152, 5);
    this.game.load.image('trigger', 'images/trigger.png')
    this.game.load.image('tiles', 'images/Sprites2.png');
    this.game.load.image('tiles1', 'images/52088.png');
    this.game.load.image('enemy', 'images/enemy.png');
    this.game.load.image('enemyB', 'images/enemyAl.png');
    this.game.load.image('bullets', 'images/bullet.png');
    this.game.load.image('finalEnemy', 'images/finalEnemy.png');
    this.game.load.tilemap('tilemap', 'images/map.json', null, Phaser.Tilemap.TILED_JSON);
    //this.game.load.spritesheet('pj1', 'images/pj1.png', 37, 45, 4);
    /*this.game.load.atlasJSONHash('rush_idle01', 'images/rush_spritesheet.png',
    'images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);*/
    this.game.load.spritesheet('rush_idle01', 'images/rush_spritesheet.png', 41, 66, 9);
    this.game.load.spritesheet('enemy01', 'images/rush_spritesheet.png', 41, 66, 9);

  },

  create: function () {
      //this.game.state.start('preloader');
      this.game.state.start('firstScene');
  }


};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(100,300, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.game.load.setPreloadSprite(this.loadingBar);
    this.game.stage.backgroundColor = "#000000"



    this.load.onLoadStart.add(this.loadStart, this);

      this.game.load.image('trigger', 'images/trigger.png')
      this.game.load.image('tiles', 'images/Sprites2.png');
      this.game.load.image('tiles1', 'images/52088.png');
      this.game.load.image('enemy', 'images/enemy.png');
      this.game.load.image('enemyB', 'images/enemyAl.png');
      this.game.load.image('bullets', 'images/bullet.png');
      this.game.load.image('finalEnemy', 'images/finalEnemy.png');
      this.game.load.tilemap('tilemap', 'images/map.json', null, Phaser.Tilemap.TILED_JSON);
      //this.game.load.spritesheet('pj1', 'images/pj1.png', 37, 45, 4);
      /*this.game.load.atlasJSONHash('rush_idle01', 'images/rush_spritesheet.png',
      'images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);*/
      this.game.load.spritesheet('rush_idle01', 'images/rush_spritesheet.png', 41, 66, 9);
      this.game.load.spritesheet('enemy01', 'images/rush_spritesheet.png', 41, 66, 9);

    this.load.onLoadComplete.add(this.loadComplete, this);

  },

  loadStart: function () {
    //this.game.state.start('play');
    console.log("Game Assets Loading ...");
  },


   //TODO 2.2b function loadComplete()
   loadComplete: function(){
     this.ready = true;
     this.game.state.start('play');
   },

  update: function(){
      this._loadingBar
  }
};


var wfconfig = {

    active: function() {
        console.log("font loaded");
        init();
    },

    google: {
        families: ['Sniglet']
    }

};

function init(){
  //TODO 3.3 La creación del juego y la asignación de los states se hará en el método init().
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  //TODO 1.2 Añadir los states 'boot' BootScene, 'menu' MenuScene, 'preloader' PreloaderScene, 'play' PlayScene, 'gameOver' GameOver.
  game.state.add('boot', BootScene);
  game.state.add('menu', menuScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', playScene);
  game.state.add('play2', playScene2);
  game.state.add('gameOver', gameOver);
  game.state.add('finalScene', finalScene);
  game.state.add('noModeScene', noModeScene);
  game.state.add('credits', credits);
  game.state.add('firstScene', firstScene);
  game.state.add('secondScene', secondScene);
  game.state.add('thirdScene', thirdScene);
  game.state.add('alternativeMenu', alternativeMenu);

  //TODO 1.3 iniciar el state 'boot'.

  game.state.start('boot');
};

window.onload = function () {
  //TODO 3.2 Cargar Google font cuando la página esté cargada con wfconfig.
  WebFont.load(wfconfig);
};

},{"./alternativeMenu.js":1,"./credits.js":2,"./final_scene.js":3,"./first_scene.js":4,"./gameover_scene.js":5,"./menu_scene.js":7,"./noMode_scene.js":8,"./play_scene.js":9,"./play_scene2.js":10,"./second_scene.js":11,"./third_scene.js":12}],7:[function(require,module,exports){
var numeroGenerado;
var text;
var MenuScene = {
  menuMusic: {},
    create: function () {
        this.game.world.setBounds(0,0,800,600);

        this.music = this.game.add.audio('menu');
        this.music.play();


        var starsBackground = this.game.add.sprite(this.game.world.centerX,
                                        this.game.world.centerY,
                                        'starsBackground')
        starsBackground.anchor.setTo(0.5, 0.5);

        var title = this.game.add.sprite(this.game.world.centerX/7, this.game.world.centerY/5, 'title');
        var buttonStart = this.game.add.button(this.game.world.centerX,
                                               this.game.world.centerY - 50,
                                               'boton',
                                               this.actionOnClick,
                                               this, 2, 1, 0);
        buttonStart.anchor.set(0.5);
        var otherModeButton = this.game.add.button(this.game.world.centerX - 75,
                                               this.game.world.centerY + 50, 'otherModeButton', this.actionOnClick2, this, 2, 1, 0);

        var randomButton = this.game.add.button(this.game.world.centerX + 220,
                                               this.game.world.centerY - 50, 'randomMode', this.chosenModeButton, this, 2, 1, 0);
        var diceText = this.game.add.text(randomButton.x - 40, randomButton.y - 40, "I'M A BUTTON TOO!", {fill: '#ff0000'});
        diceText.font = 'firacode';
        diceText.anchor.set(0.2);

        numeroGenerado = this.aleatorioButton(1, 7);
    },

    actionOnClick: function(){
        this.game.state.start('play');
        this.music.stop();
    },

    actionOnClick2: function(){
        this.game.state.start('play2');
        this.music.stop();
    },

    aleatorioButton: function(inferior, superior){
      var numPosibilidades = superior - inferior;
   	  var aleat = Math.random() * numPosibilidades;
   	  aleat = Math.round(aleat);
   	  return parseInt(inferior) + aleat;
    },

    chosenModeButton: function(){
      if(numeroGenerado >= 1 && numeroGenerado <= 2){
        this.game.state.start('play');
      }
      else if(numeroGenerado > 2 && numeroGenerado <= 4){
        this.game.state.start('play2');
      }
      else if(numeroGenerado > 4 && numeroGenerado <= 7){
        this.game.state.start('noModeScene');
      }
      this.music.stop();
    }
};

module.exports = MenuScene;

},{}],8:[function(require,module,exports){

var noModeScene = {
  skull: {},
  noModeSound: {},
  create: function(){
    this.game.world.setBounds(0,0,800,600);
    this.game.stage.backgroundColor = "#000000";

    this.noSceneSound = this.game.add.audio('noSceneSound');
    this.noSceneSound.play();

    var skull = this.game.add.sprite(this.game.world.centerX - 50,
                                  this.game.world.centerY - 80, 'skull');

    skull.animations.add('loop', [0,1,2,3,4], 20, true);
    skull.animations.play('loop');

    var noModeImage = this.game.add.sprite(this.game.world.centerX - 20,
                                   this.game.world.centerY - 200,
                                  'noMode');

    noModeImage.anchor.setTo(0.5, 0.5);

    var botonMenu = this.game.add.button(this.game.world.centerX - 80,
                                        this.game.world.centerY * 1.5,
                                        'botonMenu', this.returnToMenu, this, 2, 1, 0);
  },

  returnToMenu: function(){
    this.game.state.start('menu');
    this.noSceneSound.stop();
    //this.gameOverAudio.stop();
  }
};
module.exports = noModeScene;

},{}],9:[function(require,module,exports){
'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}



function Enemy(sprite, posX, posY, game){
  Phaser.Sprite.call(this, game, posX, posY, sprite);
  //Phaser.Sprite.call(this, game, posX, posY, 'enemyB');
  game.physics.enable(this, Phaser.Physics.ARCADE, this);
  this.standingPos = this.posX;
  this.body.gravity.y = 30;
  this.scale.setTo(0.25,0.20);
}
  Enemy.prototype = Object.create(Phaser.Sprite.prototype);
	Enemy.prototype.constructor = Enemy;

  Enemy.prototype.setBoundaries = function(leftBound, rightBound){
    this.rightBound = rightBound;
    this.leftBound = leftBound;
  };

  Enemy.prototype.setVelocity = function(velocity){
    this.velocity = velocity;
  };

  Enemy.prototype.setLifes = function(lifes){
    this.lifes = lifes;
  }

  Enemy.prototype.setMovement = function(){
    if(this.body.position.x >= this.rightBound || this.body.velocity.x === 0){
      this.body.velocity.x = -this.velocity;
      if(this.scale.x < 0)
          this.scale.x *= -1;
    }
    if(this.body.position.x <= this.leftBound){
      this.body.velocity.x = this.velocity;
      if(this.scale.x > 0)
          this.scale.x *= -1;
    }
  }

  var bullets;
  var jumping;
  var jumpTime = 0;
  var enemies;
  var cursors;
  var shoot;
  var ammoText;
  var tiempoStop = 0;
  var paused = false;
  var fireRate = 150;
  var nextFire = 0;
  var numBalas = 39;
  var numEnemies = 8;
  //var numBalas = 32;
//Scena de juego.
var PlayScene = {
    _rush: {}, //player
    triggers: {},
    keyPause: {},
    t1: {},
    t2: {},
    t3: {},
    t4: {},
    enemy1: {},
    enemy2: {},
    enemy3: {},
    enemy4: {},
    enemy5: {},
    enemy6: {},
    enemy7: {},
    finalEnemy: {},
    pauseBackground: {},
    pauseText: {},
    buttonMenu: {},
    buttonResume:{},
    pauseIcon:{},
    _speed: 300, //velocidad del player
    _jumpSpeed: 600, //velocidad de salto
    _jumpHight: 150, //altura máxima del salto.
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.

  init: function(){
    this.inGameAudio = this.game.add.audio('inGame');
    this.inGameAudio.play();
  },


  create: function () {


      this.map = this.game.add.tilemap('tilemap');
      this.map.addTilesetImage('patrones', 'tiles');
      this.map.addTilesetImage('patrones1', 'tiles1');

      this.cursors = this.game.input.keyboard.createCursorKeys();
      //this.jumping = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
      //Creacion de las layers
      this.backgroundLayer = this.map.createLayer('BackgroundLayer');
      this.groundLayer = this.map.createLayer('GroundLayer');
      //plano de muerte
      this.death = this.map.createLayer('Death');
      this.teleport = this.map.createLayer('Teleport');
      //this._rush = this.game.add.sprite(100,3000, 'rush_idle01');
      this._rush = this.game.add.sprite(300, 3100, 'rush_idle01');
      //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
      this.map.setCollisionBetween(1, 5000, true, 'Death');
      this.map.setCollisionBetween(1, 5000, true, 'GroundLayer');
      this.death.visible = true;
      //Cambia la escala a x3.
      this.groundLayer.setScale(3,3);
      this.backgroundLayer.setScale(3,3);
      this.death.setScale(3,3);
      this.teleport.setScale(3,3);


      this.inGameAudio.volume = 0.5;
      this.shootAudio = this.game.add.audio('shoot');
      this.shootAudio.volume = 0.3;
      this.teleportAudio = this.game.add.audio('teleport');
      this.pausaAudio = this.game.add.audio('pausa');
      this.gameOverAudio = this.game.add.audio('gameOver');
      //this.endSong = this.game.add.audio('endSong');

      //this.stopMusic(this.endSong);
      //this.stopMusic(this.menuAudio);
      //this.stopMusic(this.endSong);
      //this.stopMusic(this.gameOverAudio);
      //this.shootAudio.loop = true;

      //this.numBalas = 2;

      this._rush.animations.add('run', [0,1,2,3], 7, true);
      this._rush.animations.add('idle', [8], 3, true);
      this._rush.animations.add('shoot', [6, 0, 1, 2, 3], 7, true);
      this._rush.animations.add('jump', [7], 7, false);

      this.groundLayer.resizeWorld(); //resize world and adjust to the screen

      this.textLvl1 = this.game.add.text(300, 3100, "I CAN MOVE WITH W-A-D, "+ "\n"+ " AND SHOOT WITH L!!");

      ammoText = this.game.add.text(100, 1000, 'AMMO = 39', { fontSize: '16px', fill: '#FFFFFF' });
  	  ammoText.fixedToCamera=true;
  	  ammoText.cameraOffset.setTo(10,10);

      //nombre de la animación, frames, framerate, isloop
      /*this._rush.animations.add('run',
                    Phaser.Animation.generateFrameNames('rush_run',1,5,'',2),10,true);
      this._rush.animations.add('stop',
                    Phaser.Animation.generateFrameNames('rush_idle',1,1,'',2),0,false);
      this._rush.animations.add('jump',
                     Phaser.Animation.generateFrameNames('rush_jump',2,2,'',2),0,false);*/
      this.configure();



      this.shoot = this.game.input.keyboard.addKey(Phaser.Keyboard.L);


      this.bullets = this.game.add.group();
      this.bullets.enableBody = true;
      this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
      this.bullets.createMultiple(50, 'bullets');
      this.bullets.setAll('outOfBoundsKill', true);
      this.bullets.setAll('checkWorldBounds', true);


      this.triggers = this.game.add.group();
      this.triggers = this.game.add.physicsGroup();
      this.triggers.enableBody = true;
      this.triggers.physicsBodyType = Phaser.Physics.ARCADE;
      this.t1 = this.triggers.create(5350,3500, 'trigger');//OK
      this.t2 = this.triggers.create(5500, 2300, 'trigger');//OK
      this.t3 = this.triggers.create(500, 1600, 'trigger');
      this.t4 = this.triggers.create(5600, 550, 'trigger');// OK
      this.triggers.setAll('body.immovable', true);
      this.triggers.setAll('alpha', 0);
      this.triggers.setAll('anchor.y', 1);


      this.enemies = this.game.add.group();
      this.enemies = this.game.add.physicsGroup();
      this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
      this.enemies.enableBody = true;

      this.enemy1 = this.createBaseEnemy(850, 3180, 600, 900, 150, 0);
      this.enemy2 = this.createBaseEnemy(2500, 3450, 2300, 2650, 250, 2);
      this.enemy3 = this.createBaseEnemy(4900, 3250, 4600, 5000, 250, 1);
      this.enemy4 = this.createBaseEnemy(3720, 2600, 3550, 3800, 150, 3);
      this.enemy5 = this.createBaseEnemy(5100, 2600, 5000, 5150, 150, 4);
      this.enemy6 = this.createBEnemy(5000, 1350, 4900, 5100, 150, 3);
      this.enemy7 = this.createBEnemy(1000, 1350, 950, 1050, 150, 2);
      this.finalEnemy = this.createFinalEnemy(4100, 300, 3800, 4300, 200, 8);
      this.enemies.add(this.enemy1);
      this.enemies.add(this.enemy2);
      this.enemies.add(this.enemy3);
      this.enemies.add(this.enemy4);
      this.enemies.add(this.enemy5);
      this.enemies.add(this.enemy6);
      this.enemies.add(this.enemy7);
      this.enemies.add(this.finalEnemy);

      /*var numeroGenerado = this.aleatorio(1, 8);
      console.log("GENERO ESTO: ", numeroGenerado);*/
  },

  createBaseEnemy: function(posX, posY, leftBound, rightBound, velocity, lifes){
    var enemy = new Enemy('enemy', posX, posY, this);
    return this.giveAttrToEnemy(enemy, leftBound, rightBound, velocity, lifes);
  },

  createBEnemy: function(posX, posY, leftBound, rightBound, velocity, lifes){
    var enemy = new Enemy('enemyB', posX, posY, this);
    return this.giveAttrToEnemy(enemy, leftBound, rightBound, velocity, lifes);
  },

  createFinalEnemy: function(posX, posY, leftBound, rightBound, velocity, lifes){
    var enemy = new Enemy('finalEnemy', posX, posY, this);
    return this.giveAttrToEnemy(enemy, leftBound, rightBound, velocity, lifes);
  },

  giveAttrToEnemy: function(enemy, leftBound, rightBound, velocity, lifes){
    enemy.setBoundaries(leftBound, rightBound);
    enemy.setVelocity(velocity);
    enemy.setLifes(lifes);
    return enemy;
  },
    //IS called one per frame.
    update: function () {
        var moveDirection = new Phaser.Point(0,0);
        var collisionWithTilemap = this.game.physics.arcade.collide(this._rush, this.groundLayer);
        var enemyWithTilemap = this.game.physics.arcade.collide(this.enemies, this.groundLayer);
        var movement = this.GetMovement();
        var enemyCollision = this.game.physics.arcade.collide(this._rush, this.enemies);
        this.enemyMovement();
        this.playerMovement();
        this.checkPlayerFell();
        this.checkStand();
        this.inGameAudio.loop = true;


        /*if (this.game.input.keyboard.isDown(Phaser.Keyboard.L))
        {
            //this.game.camera.flash(0xEBEBEB, 150);
            this.fire();
        }*/
        /*if(!this.paused){
          if(this.shoot.isDown){
              this.shoot.onDown.add(this.fire, this);
          }
        }*/



        //console.log("Vel: ", this._rush.body.velocity.x, "Tiempo: ", tiempoStop);

        this.shoot.onDown.add(this.fire, this);

        if(numBalas === 0 && numEnemies !== 0){
          this.game.state.start('gameOver');
          numBalas = 39;
          numEnemies = 8;
          this.stopMusic(this.inGameAudio);
          //this.playMusic(this.gameOverAudio);
        }
        //console.log("Balas: ", numBalas, "NumEnemies: ", numEnemies);
        //console.log("VEL: ", this._rush.body.velocity.x);

        if(enemyCollision){
          this.game.state.start('gameOver');
          numBalas = 39;
          numEnemies = 8;
          this.stopMusic(this.inGameAudio);
          //this.playMusic(this.gameOverAudio);
        }

        this.game.physics.arcade.overlap(this.bullets, this.enemies, this.bulletCollision, null, this);



        this.triggerCollision(this.t1, 300, 2500, 400);
        this.triggerCollision(this.t2, 5600, 1500, 400);
        this.triggerCollision(this.t3, 100, 300, 400);


        if(this.game.physics.arcade.collide(this._rush, this.t4)){
          this.game.state.start('finalScene');
          numBalas = 39;
          numEnemies = 8;
          this.stopMusic(this.inGameAudio);
          //this.playMusic(this.endSong);
        }



        /*if(this.game.input.keyboard.isDown(Phaser.Keyboard.P)){
          game.paused = true;
        }*/

        this.keyPause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);

        if(!this.paused){
          if(this.keyPause.isDown){
            this.paused = true;
            this.pausedMenu();
            this.pauseMusic(this.inGameAudio);
            this.pausaAudio.play();
          }
        }
        //this.keyPause.onDown.add(this.pausedMenu,this);
    },

    pausedMenu: function(){

      this.game.world.setBounds(0,0,800,600);

      this.pauseBackground = this.game.add.sprite(this.game.world.centerX,
                                      this.game.world.centerY,
                                      'pauseBackground');
      this.pauseBackground.anchor.setTo(0.5, 0.6);

      this.pauseText = this.game.add.sprite(this.game.world.centerX / 18, this.game.world.centerY/5, 'pauseText');

      this.buttonMenu = this.game.add.button(this.game.world.centerX * 1.4,
                                             this.game.world.centerY * 1.6,
                                             'botonMenu',
                                             this.returnToMenu,
                                             this, 2, 1, 0);

      this.buttonResume = this.game.add.button(this.game.world.centerX * 0.2,
                                             this.game.world.centerY * 1.6,
                                             'botonContinuar',
                                             this.actionOnClickResume,
                                             this, 2, 1, 0);

      this.pauseIcon = this.game.add.sprite(this.game.world.centerX * 0.85,
                                             this.game.world.centerY * 1.35, 'pauseIcon');


      this.game.physics.arcade.isPaused = true;
    },

    bulletCollision: function(bullet, enemy){
      if(enemy.lifes > 0){
        enemy.lifes--;
      }
      else if(enemy.lifes === 0){
        enemy.kill();
        numEnemies--;
        this.game.camera.flash(0xEBEBEB, 150);
      }
      bullet.kill();
    },

    numShoots: function(){
      numBalas--;
      ammoText.text = 'AMMO = ' + numBalas;
    },

    playerMovement: function(){
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
      {
        this._rush.body.velocity.x = -400;
        tiempoStop = 0
          if(this._rush.scale.x > 0){
              this._rush.scale.x *= -1;
            }
            this._rush.animations.play('run');
      }

      else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
      {
        this._rush.body.velocity.x = 400;
        tiempoStop = 0;
          if(this._rush.scale.x < 0){
              this._rush.scale.x *= -1;
            }
          this._rush.animations.play('run');
      }


      if( this.game.input.keyboard.isDown(Phaser.Keyboard.W) && this._rush.body.onFloor() ) {
        this._rush.body.velocity.y = -750;
        this._rush.animations.play('jump');

      }
      else if(this._rush.body.onFloor()){
        this._rush.animations.play('run');
      }
    },

    actionOnClickResume: function(){
        this.game.world.setBounds(this._rush);
        this.pauseBackground.visible = false;
        this.pauseText.visible = false;
        this.buttonMenu.visible = false;
        this.buttonResume.visible = false;
        this.pauseIcon.visible = false;
        this._rush.body.velocity.x = 100;
        this.paused = false;
        this.game.physics.arcade.isPaused = false;
        this.resumeMusic(this.inGameAudio);
        this.stopMusic(this.pausaAudio);
        this.stopMusic(this.menuAudio);

    },

    fire: function() {
      if(!this.paused){
        if(this.shoot.isDown){
          if (this.game.time.now > nextFire && this.bullets.countDead() > 0 && numBalas > 0)
            {
              nextFire = this.game.time.now + fireRate;

              var bullet = this.bullets.getFirstDead();

              if(this._rush.body.velocity.x === 400){
                if(bullet.scale.x < 0){
                    bullet.scale.x *= -1;
                }
                bullet.reset(this._rush.x+35, this._rush.y+10);
                bullet.body.velocity.x = 650;
              } if(this._rush.body.velocity.x === -400){

                  if(bullet.scale.x > 0){
                      bullet.scale.x *= -1;
                  }
                  bullet.reset(this._rush.x-35, this._rush.y+10);
                  bullet.body.velocity.x = -650;
              }
              this.numShoots();

            }

          this.playMusic(this.shootAudio);
          this._rush.animations.play('shoot');


        }
      }
    },

    checkStand: function(){

      if(!this.paused){
        if(this._rush.body.velocity.x === 0){
          tiempoStop++;
          if(tiempoStop === 120){
            this.game.state.start('gameOver');
            numBalas = 39;
            numEnemies = 8;
            this.stopMusic(this.inGameAudio);
            //this.playMusic(this.gameOverAudio);
          }
          this._rush.animations.play('idle');
        }
      }
    },

    enemyMovement: function(){
      this.enemies.children.forEach(function(enemy){
        enemy.setMovement();
      })
    },

    triggerCollision: function(trigger, posX, posY, impulse){
      if(this.game.physics.arcade.collide(this._rush, trigger)){
        this._rush.reset(posX, posY);
        this._rush.body.velocity.x = impulse;
        this.playMusic(this.teleportAudio);
        this._rush.animations.play('run');
      }
    },


    returnToMenu: function(){
      this.game.state.start('menu');
      numBalas = 39;
      numEnemies = 8;
      this.game.world.setBounds(this._rush);
      this.pauseBackground.visible = false;
      this.pauseText.visible = false;
      this.buttonMenu.visible = false;
      this.buttonResume.visible = false;
      this.pauseIcon.visible = false;
      this._rush.body.velocity.x = 100;
      this.paused = false;
      this.game.physics.arcade.isPaused = false;
    },


    /*canJump: function(collisionWithTilemap){
        return this.isStanding() && collisionWithTilemap || this._jamping;
    },*/

    onPlayerFell: function(){
        //TODO 6 Carga de 'gameOver';
        this.game.state.start('gameOver');
        numBalas = 39;
        numEnemies = 8;
        this.stopMusic(this.inGameAudio);
        //this.playMusic(this.gameOverAudio);
    },

    checkPlayerFell: function(){
        if(this.game.physics.arcade.collide(this._rush, this.death))
            this.onPlayerFell();
    },

    playMusic: function(audio){
      if(!audio.isPlaying){
        audio.play();
      }
    },

    stopMusic: function(audio){
      if(audio.isPlaying){
        audio.stop();
      }
    },

    pauseMusic: function(audio){
      if(audio.isPlaying){
        audio.pause();
      }
    },

    resumeMusic: function(audio){
      if(!audio.isPlaying){
        audio.resume();
      }
    },

    /*isStanding: function(){
        return this._rush.body.blocked.down || this._rush.body.touching.down
    },*/

    /*isJumping: function(collisionWithTilemap){
        return this.canJump(collisionWithTilemap) &&
            this.game.input.keyboard.isDown(Phaser.Keyboard.W);
    },*/

    GetMovement: function(){
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
          return Direction.RIGHT;
        }else if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
          return Direction.LEFT;
        }else{
          return Direction.NONE;
        }
    },
    //configure the scene
    configure: function(){
        //Start the Arcade Physics systems
        this.game.world.setBounds(0, 0, 8000, 6000);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#a9f0ff';
        this.game.physics.arcade.enable(this._rush);
        this._rush.body.bounce.y = 0.2;
        this._rush.body.gravity.y = 2000;
        this._rush.body.gravity.x = 0;
        this._rush.body.velocity.x = 400;
        tiempoStop = 0;
        this.game.camera.posX = this._rush.posX;
        this.game.camera.posY = this._rush.posY;
        this.game.camera.follow(this._rush);
        this._rush.animations.play('run');

    },
    //move the player
    movement: function(point, xMin, xMax){
        this._rush.body.velocity = point;// * this.game.time.elapseTime;

        if((this._rush.x < xMin && point.x < 0)|| (this._rush.x > xMax && point.x > 0))
            this._rush.body.velocity.x = 0;

    },

    aleatorio: function(inferior,superior){
   	  var numPosibilidades = superior - inferior;
   	  var aleat = Math.random() * numPosibilidades;
   	  aleat = Math.round(aleat);
   	  return parseInt(inferior) + aleat;
    },

    //TODO 9 destruir los recursos tilemap, tiles y logo.
    onFinishedPlayState: function(){
      this.game.world.setBounds(0,0,800,600);
      this.tilemap.destroy();
      this.tiles.destroy();
      this.bullets.destroy();
      this.enemies.destroy();
    }



};

module.exports = PlayScene;

},{}],10:[function(require,module,exports){
'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}



function Enemy(sprite, posX, posY, game){
  Phaser.Sprite.call(this, game, posX, posY, sprite);
  //Phaser.Sprite.call(this, game, posX, posY, 'enemyB');
  game.physics.enable(this, Phaser.Physics.ARCADE, this);
  this.standingPos = this.posX;
  this.body.gravity.y = 30;
  this.scale.setTo(0.25,0.20);
}
  Enemy.prototype = Object.create(Phaser.Sprite.prototype);
	Enemy.prototype.constructor = Enemy;

  Enemy.prototype.setBoundaries = function(leftBound, rightBound){
    this.rightBound = rightBound;
    this.leftBound = leftBound;
  };

  Enemy.prototype.setVelocity = function(velocity){
    this.velocity = velocity;
  };

  Enemy.prototype.setLifes = function(lifes){
    this.lifes = lifes;
  }

  Enemy.prototype.setMovement = function(){
    if(this.body.position.x >= this.rightBound || this.body.velocity.x === 0){
      this.body.velocity.x = -this.velocity;
      if(this.scale.x < 0)
          this.scale.x *= -1;
    }
    if(this.body.position.x <= this.leftBound){
      this.body.velocity.x = this.velocity;
      if(this.scale.x > 0)
          this.scale.x *= -1;
    }
  }

  var bullets;
  var jumping;
  var jumpTime = 0;
  var enemies;
  var cursors;
  var shoot;
  var ammoText;
  var tiempoStop = 0;
  var paused = false;
  var fireRate = 150;
  var nextFire = 0;
  var numBalas = 42;
  var numEnemies = 8;
  //var numBalas = 32;
//Scena de juego.
var PlayScene = {
    _rush: {}, //player
    triggers: {},
    keyPause: {},
    t1: {},
    t2: {},
    t3: {},
    t4: {},
    enemy1: {},
    enemy2: {},
    enemy3: {},
    enemy4: {},
    enemy5: {},
    enemy6: {},
    enemy7: {},
    finalEnemy: {},
    pauseBackground: {},
    pauseText: {},
    buttonMenu: {},
    buttonResume:{},
    pauseIcon:{},
    _speed: 300, //velocidad del player
    _jumpSpeed: 600, //velocidad de salto
    _jumpHight: 150, //altura máxima del salto.
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.


  create: function () {

      this.game.backgroundColor = "#FFFFFF";

      this.map = this.game.add.tilemap('tilemap');
      this.map.addTilesetImage('patrones', 'tiles');
      this.map.addTilesetImage('patrones1', 'tiles1');

      this.cursors = this.game.input.keyboard.createCursorKeys();
      //this.jumping = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
      //Creacion de las layers
      this.backgroundLayer = this.map.createLayer('BackgroundLayer');
      this.groundLayer = this.map.createLayer('GroundLayer');
      //plano de muerte
      this.death = this.map.createLayer('Death');
      this.teleport = this.map.createLayer('Teleport');
      //this._rush = this.game.add.sprite(100,3000, 'rush_idle01');
      this._rush = this.game.add.sprite(300, 3100, 'rush_idle01');
      //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
      this.map.setCollisionBetween(1, 5000, true, 'Death');
      this.map.setCollisionBetween(1, 5000, true, 'GroundLayer');
      this.death.visible = true;
      //Cambia la escala a x3.
      this.groundLayer.setScale(3,3);
      this.backgroundLayer.setScale(3,3);
      this.death.setScale(3,3);
      this.teleport.setScale(3,3);

      this.inGameAudio = this.game.add.audio('inGame');
      this.inGameAudio.volume = 0.5;
      this.shootAudio = this.game.add.audio('shoot');
      this.shootAudio.volume = 0.3;
      this.teleportAudio = this.game.add.audio('teleport');
      this.pausaAudio = this.game.add.audio('pausa');
      this.gameOverAudio = this.game.add.audio('gameOver');
      //this.endSong = this.game.add.audio('endSong');

      this.inGameAudio.play();
      //this.stopMusic(this.endSong);
      //this.stopMusic(this.menuAudio);
      //this.stopMusic(this.endSong);
      //this.stopMusic(this.gameOverAudio);
      //this.shootAudio.loop = true;

      //this.numBalas = 2;
      this.textLvl2 = this.game.add.text(300, 3100, "You can jump pressing S, "+ "\n"+ " rest of keys have to be guessed :XD");

      this._rush.animations.add('run', [0,1,2,3], 7, true);
      this._rush.animations.add('idle', [8], 3, true);
      this._rush.animations.add('shoot', [6, 0, 1, 2, 3], 7, true);
      this._rush.animations.add('jump', [7], 7, false);

      this.groundLayer.resizeWorld(); //resize world and adjust to the screen

      ammoText = this.game.add.text(100, 1000, 'AMMO = 42', { fontSize: '16px', fill: '#FFFFFF' });
  	  ammoText.fixedToCamera=true;
  	  ammoText.cameraOffset.setTo(10,10);

      //nombre de la animación, frames, framerate, isloop
      /*this._rush.animations.add('run',
                    Phaser.Animation.generateFrameNames('rush_run',1,5,'',2),10,true);
      this._rush.animations.add('stop',
                    Phaser.Animation.generateFrameNames('rush_idle',1,1,'',2),0,false);
      this._rush.animations.add('jump',
                     Phaser.Animation.generateFrameNames('rush_jump',2,2,'',2),0,false);*/
      this.configure();



      this.shoot = this.game.input.keyboard.addKey(Phaser.Keyboard.W);


      this.bullets = this.game.add.group();
      this.bullets.enableBody = true;
      this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
      this.bullets.createMultiple(50, 'bullets');
      this.bullets.setAll('outOfBoundsKill', true);
      this.bullets.setAll('checkWorldBounds', true);


      this.triggers = this.game.add.group();
      this.triggers = this.game.add.physicsGroup();
      this.triggers.enableBody = true;
      this.triggers.physicsBodyType = Phaser.Physics.ARCADE;
      this.t1 = this.triggers.create(5350,3500, 'trigger');//OK
      this.t2 = this.triggers.create(5500, 2300, 'trigger');//OK
      this.t3 = this.triggers.create(500, 1600, 'trigger');
      this.t4 = this.triggers.create(5600, 550, 'trigger');// OK
      this.triggers.setAll('body.immovable', true);
      this.triggers.setAll('alpha', 0);
      this.triggers.setAll('anchor.y', 1);


      this.enemies = this.game.add.group();
      this.enemies = this.game.add.physicsGroup();
      this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
      this.enemies.enableBody = true;

      this.enemy1 = this.createBaseEnemy(900, 3180, 600, 900, 50, 0);
      this.enemy2 = this.createBaseEnemy(2500, 3450, 2300, 2650, 250, 2);
      this.enemy3 = this.createBaseEnemy(4900, 3250, 4600, 5000, 250, 1);
      this.enemy4 = this.createBaseEnemy(3720, 2600, 3550, 3800, 150, 3);
      this.enemy5 = this.createBaseEnemy(5100, 2600, 5000, 5150, 150, 4);
      this.enemy6 = this.createBEnemy(5000, 1350, 4900, 5100, 150, 3);
      this.enemy7 = this.createBEnemy(1000, 1350, 950, 1050, 150, 2);
      this.finalEnemy = this.createFinalEnemy(4100, 300, 3800, 4300, 200, 8);
      this.enemies.add(this.enemy1);
      this.enemies.add(this.enemy2);
      this.enemies.add(this.enemy3);
      this.enemies.add(this.enemy4);
      this.enemies.add(this.enemy5);
      this.enemies.add(this.enemy6);
      this.enemies.add(this.enemy7);
      this.enemies.add(this.finalEnemy);

      /*var numeroGenerado = this.aleatorio(1, 8);
      console.log("GENERO ESTO: ", numeroGenerado);*/
  },

  createBaseEnemy: function(posX, posY, leftBound, rightBound, velocity, lifes){
    var enemy = new Enemy('enemy', posX, posY, this);
    return this.giveAttrToEnemy(enemy, leftBound, rightBound, velocity, lifes);
  },

  createBEnemy: function(posX, posY, leftBound, rightBound, velocity, lifes){
    var enemy = new Enemy('enemyB', posX, posY, this);
    return this.giveAttrToEnemy(enemy, leftBound, rightBound, velocity, lifes);
  },

  createFinalEnemy: function(posX, posY, leftBound, rightBound, velocity, lifes){
    var enemy = new Enemy('finalEnemy', posX, posY, this);
    return this.giveAttrToEnemy(enemy, leftBound, rightBound, velocity, lifes);
  },

  giveAttrToEnemy: function(enemy, leftBound, rightBound, velocity, lifes){
    enemy.setBoundaries(leftBound, rightBound);
    enemy.setVelocity(velocity);
    enemy.setLifes(lifes);
    return enemy;
  },
    //IS called one per frame.
    update: function () {
        var moveDirection = new Phaser.Point(0,0);
        var collisionWithTilemap = this.game.physics.arcade.collide(this._rush, this.groundLayer);
        var enemyWithTilemap = this.game.physics.arcade.collide(this.enemies, this.groundLayer);
        var movement = this.GetMovement();
        var enemyCollision = this.game.physics.arcade.collide(this._rush, this.enemies);
        this.enemyMovement();
        this.playerMovement();
        this.checkPlayerFell();
        this.checkStand();
        this.inGameAudio.loop = true;


        /*if (this.game.input.keyboard.isDown(Phaser.Keyboard.L))
        {
            //this.game.camera.flash(0xEBEBEB, 150);
            this.fire();
        }*/
        /*if(!this.paused){
          if(this.shoot.isDown){
              this.shoot.onDown.add(this.fire, this);
          }
        }*/



        //console.log("Vel: ", this._rush.body.velocity.x, "Tiempo: ", tiempoStop);

        this.shoot.onDown.add(this.fire, this);

        if(numBalas === 0 && numEnemies !== 0){
          this.game.state.start('gameOver');
          numBalas = 42;
          numEnemies = 8;
          this.stopMusic(this.inGameAudio);
          //this.playMusic(this.gameOverAudio);
        }
        //console.log("Balas: ", numBalas, "NumEnemies: ", numEnemies);
        //console.log("VEL: ", this._rush.body.velocity.x);

        if(enemyCollision){
          this.game.state.start('gameOver');
          numBalas = 42;
          numEnemies = 8;
          this.stopMusic(this.inGameAudio);
          //this.playMusic(this.gameOverAudio);
        }

        this.game.physics.arcade.overlap(this.bullets, this.enemies, this.bulletCollision, null, this);



        this.triggerCollision(this.t1, 300, 2500, 400);
        this.triggerCollision(this.t2, 5600, 1500, 400);
        this.triggerCollision(this.t3, 100, 300, 400);


        if(this.game.physics.arcade.collide(this._rush, this.t4)){
          this.game.state.start('finalScene');
          numBalas = 42;
          numEnemies = 8;
          this.stopMusic(this.inGameAudio);
          //this.playMusic(this.endSong);
        }



        /*if(this.game.input.keyboard.isDown(Phaser.Keyboard.P)){
          game.paused = true;
        }*/

        this.keyPause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);

        if(!this.paused){
          if(this.keyPause.isDown){
            this.paused = true;
            this.pausedMenu();
            this.pauseMusic(this.inGameAudio);
            this.pausaAudio.play();
          }
        }
        //this.keyPause.onDown.add(this.pausedMenu,this);
    },

    pausedMenu: function(){

      this.game.world.setBounds(0,0,800,600);

      this.pauseBackground = this.game.add.sprite(this.game.world.centerX,
                                      this.game.world.centerY,
                                      'pauseBackground');
      this.pauseBackground.anchor.setTo(0.5, 0.6);

      this.pauseText = this.game.add.sprite(this.game.world.centerX / 18, this.game.world.centerY/5, 'pauseText');

      this.buttonMenu = this.game.add.button(this.game.world.centerX * 1.4,
                                             this.game.world.centerY * 1.6,
                                             'botonMenu',
                                             this.returnToMenu,
                                             this, 2, 1, 0);

      this.buttonResume = this.game.add.button(this.game.world.centerX * 0.2,
                                             this.game.world.centerY * 1.6,
                                             'botonContinuar',
                                             this.actionOnClickResume,
                                             this, 2, 1, 0);

      this.pauseIcon = this.game.add.sprite(this.game.world.centerX * 0.85,
                                             this.game.world.centerY * 1.35, 'pauseIcon');


      this.game.physics.arcade.isPaused = true;
    },

    bulletCollision: function(bullet, enemy){
      if(enemy.lifes > 0){
        enemy.lifes--;
      }
      else if(enemy.lifes === 0){
        enemy.kill();
        numEnemies--;
        this.game.camera.flash(0xEBEBEB, 150);
      }
      bullet.kill();
    },

    numShoots: function(){
      numBalas--;
      ammoText.text = 'AMMO = ' + numBalas;
    },

    playerMovement: function(){
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
      {
        this._rush.body.velocity.x = -400;
        tiempoStop = 0
          if(this._rush.scale.x > 0){
              this._rush.scale.x *= -1;
            }
            this._rush.animations.play('run');
      }

      else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
      {
        this._rush.body.velocity.x = 400;
        tiempoStop = 0;
          if(this._rush.scale.x < 0){
              this._rush.scale.x *= -1;
            }
          this._rush.animations.play('run');
      }


      if( this.game.input.keyboard.isDown(Phaser.Keyboard.S) && this._rush.body.onFloor() ) {
        this._rush.body.velocity.y = -750;
        this._rush.animations.play('jump');

      }
      else if(this._rush.body.onFloor()){
        this._rush.animations.play('run');
      }
    },

    actionOnClickResume: function(){
        this.game.world.setBounds(this._rush);
        this.pauseBackground.visible = false;
        this.pauseText.visible = false;
        this.buttonMenu.visible = false;
        this.buttonResume.visible = false;
        this.pauseIcon.visible = false;
        this._rush.body.velocity.x = 100;
        this.paused = false;
        this.game.physics.arcade.isPaused = false;
        this.resumeMusic(this.inGameAudio);
        this.stopMusic(this.pausaAudio);
        this.stopMusic(this.menuAudio);

    },

    fire: function() {
      if(!this.paused){
        if(this.shoot.isDown){
          if (this.game.time.now > nextFire && this.bullets.countDead() > 0 && numBalas > 0)
            {
              nextFire = this.game.time.now + fireRate;

              var bullet = this.bullets.getFirstDead();

              if(this._rush.body.velocity.x === 400){
                if(bullet.scale.x < 0){
                    bullet.scale.x *= -1;
                }
                bullet.reset(this._rush.x+35, this._rush.y+10);
                bullet.body.velocity.x = 650;
              } if(this._rush.body.velocity.x === -400){

                  if(bullet.scale.x > 0){
                      bullet.scale.x *= -1;
                  }
                  bullet.reset(this._rush.x-35, this._rush.y+10);
                  bullet.body.velocity.x = -650;
              }
              this.numShoots();

            }

          this.playMusic(this.shootAudio);
          this._rush.animations.play('shoot');


        }
      }
    },

    checkStand: function(){

      if(!this.paused){
        if(this._rush.body.velocity.x === 0){
          tiempoStop++;
          if(tiempoStop === 120){
            this.game.state.start('gameOver');
            numBalas = 42;
            numEnemies = 8;
            this.stopMusic(this.inGameAudio);
            //this.playMusic(this.gameOverAudio);
          }
          this._rush.animations.play('idle');
        }
      }
    },

    enemyMovement: function(){
      this.enemies.children.forEach(function(enemy){
        enemy.setMovement();
      })
    },

    triggerCollision: function(trigger, posX, posY, impulse){
      if(this.game.physics.arcade.collide(this._rush, trigger)){
        this._rush.reset(posX, posY);
        this._rush.body.velocity.x = impulse;
        this.playMusic(this.teleportAudio);
        this._rush.animations.play('run');
      }
    },


    returnToMenu: function(){
      this.game.state.start('menu');
      numBalas = 42;
      numEnemies = 8;
      this.game.world.setBounds(this._rush);
      this.pauseBackground.visible = false;
      this.pauseText.visible = false;
      this.buttonMenu.visible = false;
      this.buttonResume.visible = false;
      this.pauseIcon.visible = false;
      this._rush.body.velocity.x = 100;
      this.paused = false;
      this.game.physics.arcade.isPaused = false;
    },


    /*canJump: function(collisionWithTilemap){
        return this.isStanding() && collisionWithTilemap || this._jamping;
    },*/

    onPlayerFell: function(){
        //TODO 6 Carga de 'gameOver';
        this.game.state.start('gameOver');
        numBalas = 42;
        numEnemies = 8;
        this.stopMusic(this.inGameAudio);
        //this.playMusic(this.gameOverAudio);
    },

    checkPlayerFell: function(){
        if(this.game.physics.arcade.collide(this._rush, this.death))
            this.onPlayerFell();
    },

    playMusic: function(audio){
      if(!audio.isPlaying){
        audio.play();
      }
    },

    stopMusic: function(audio){
      if(audio.isPlaying){
        audio.stop();
      }
    },

    pauseMusic: function(audio){
      if(audio.isPlaying){
        audio.pause();
      }
    },

    resumeMusic: function(audio){
      if(!audio.isPlaying){
        audio.resume();
      }
    },

    /*isStanding: function(){
        return this._rush.body.blocked.down || this._rush.body.touching.down
    },*/

    /*isJumping: function(collisionWithTilemap){
        return this.canJump(collisionWithTilemap) &&
            this.game.input.keyboard.isDown(Phaser.Keyboard.W);
    },*/

    GetMovement: function(){
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
          return Direction.RIGHT;
        }else if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
          return Direction.LEFT;
        }else{
          return Direction.NONE;
        }
    },
    //configure the scene
    configure: function(){
        //Start the Arcade Physics systems
        this.game.world.setBounds(0, 0, 8000, 6000);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#a9f0ff';
        this.game.physics.arcade.enable(this._rush);
        this._rush.body.bounce.y = 0.2;
        this._rush.body.gravity.y = 2000;
        this._rush.body.gravity.x = 0;
        this._rush.body.velocity.x = 400;
        tiempoStop = 0;
        this.game.camera.posX = this._rush.posX;
        this.game.camera.posY = this._rush.posY;
        this.game.camera.follow(this._rush);
        this._rush.animations.play('run');

    },
    //move the player
    movement: function(point, xMin, xMax){
        this._rush.body.velocity = point;// * this.game.time.elapseTime;

        if((this._rush.x < xMin && point.x < 0)|| (this._rush.x > xMax && point.x > 0))
            this._rush.body.velocity.x = 0;

    },

    aleatorio: function(inferior,superior){
   	  var numPosibilidades = superior - inferior;
   	  var aleat = Math.random() * numPosibilidades;
   	  aleat = Math.round(aleat);
   	  return parseInt(inferior) + aleat;
    },

    //TODO 9 destruir los recursos tilemap, tiles y logo.
    onFinishedPlayState: function(){
      this.game.world.setBounds(0,0,800,600);
      this.tilemap.destroy();
      this.tiles.destroy();
      this.bullets.destroy();
      this.enemies.destroy();
    }



};

module.exports = PlayScene;

},{}],11:[function(require,module,exports){
var secondScene = {
  create: function(){
    this.game.world.setBounds(0,0,800,600);

    var secondSceneBackground = this.game.add.sprite(this.game.world.centerX-350,
                                    this.game.world.centerY,
                                    'secondSceneBackground');
                                    secondSceneBackground.anchor.setTo(0.1, 0.4);

    var continueButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200,
                                              'continueButton', this.continueButtonAction, this, 2, 1, 0);
        continueButton.anchor.set(0.5);
  },

  continueButtonAction: function(){
    this.game.state.start('thirdScene');
  }
};
module.exports = secondScene;

},{}],12:[function(require,module,exports){
var thirdScene = {
  create: function(){
    this.game.world.setBounds(0,0,800,600);

    var terceraEscenaBackground = this.game.add.sprite(this.game.world.centerX-350,
                                    this.game.world.centerY,
                                    'terceraEscenaBackground');
                                    terceraEscenaBackground.anchor.setTo(0.1, 0.4);

    var continueButton = this.game.add.button(this.game.world.centerX + 300, this.game.world.centerY + 280,
        'continueButton', this.continueButtonAction, this, 2, 1, 0);
        continueButton.anchor.set(0.5);
  },

  continueButtonAction: function(){
    this.game.state.start('menu');
  }
};
module.exports = thirdScene;

},{}]},{},[6]);

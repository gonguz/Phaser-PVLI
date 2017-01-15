(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var finalScene = {
  create: function(){
    this.game.world.setBounds(0,0,800,600);

    var finalBackground = this.game.add.sprite(this.game.world.centerX,
                                    this.game.world.centerY,
                                    'finalBackground')
    finalBackground.anchor.setTo(0.5, 0.5);

    var finalText = this.game.add.sprite(this.game.world.centerX,
                                    this.game.world.centerY/2,
                                    'finalText');

    finalText.anchor.setTo(0.5,0.5);

    var buttonReply = this.game.add.button(this.game.world.centerX / 2,
                                           this.game.world.centerY * 1.5,
                                           'botonRestart',
                                           this.actionOnClick,
                                           this, 2, 1, 0);
    buttonReply.anchor.set(0.5);

    var buttonMenu = this.game.add.button(this.game.world.centerX*1.5,
    this.game.world.centerY * 1.5, 'botonMenu', this.returnToMenu, this, 2, 1, 0);

    buttonMenu.anchor.set(0.5);
  },

  actionOnClick: function(){
      this.game.state.start('preloader');
  },

  returnToMenu: function(){
    this.game.state.start('menu');
  }
};

module.exports = finalScene;

},{}],2:[function(require,module,exports){
var GameOver = {
    create: function () {

        this.game.stage.backgroundColor = "#000000";
        this.game.world.setBounds(0,0,800,600);
        var gameOverImage = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY/3,
        'gameOverImage');
        gameOverImage.anchor.set(0.5);

        var botonRestart = this.game.add.button(this.game.world.centerX,
                                               this.game.world.centerY,
                                               'botonRestart',
                                               this.actionOnClick,
                                               this, 2, 1, 0);

        botonRestart.anchor.set(0.5);

        var botonMenu = this.game.add.button(this.game.world.centerX,
                                               this.game.world.centerY * 1.3,
                                               'botonMenu',
                                               this.returnToMenu,
                                               this, 2, 1, 0);

        botonMenu.anchor.set(0.5);

    },

    //TODO 7 declarar el callback del boton.

	actionOnClick: function(){
		this.game.state.start('play');
	},
    returnToMenu: function(){
      this.game.state.start('menu');
    }

};

module.exports = GameOver;

},{}],3:[function(require,module,exports){
'use strict';

//TODO 1.1 Require de las escenas, play_scene, gameover_scene y menu_scene.

var playScene = require('./play_scene.js');
var gameOver = require('./gameover_scene.js');
var menuScene = require('./menu_scene.js');
var finalScene = require('./final_scene.js');

//  The Google WebFont Loader will look for this object, so create it before loading the script.




var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    this.game.load.spritesheet('boton', 'images/boton.png', 168, 70);
    this.game.load.image('logo', 'images/phaser.png');
    this.game.load.image('title', 'images/title.png');
    this.game.load.image('starsBackground', 'images/starsBackground.png');
    this.game.load.image('gameOverImage', 'images/gameOverImage.png');
    this.game.load.image('botonRestart', 'images/botonRestart.png');
    this.game.load.image('botonMenu', 'images/botonMenu.png');
    this.game.load.image('botonContinuar', 'images/botonContinuar.png');
    this.game.load.image('pauseBackground', 'images/pauseBackground.jpg');
    this.game.load.image('pauseText', 'images/pauseText.png');
    this.game.load.image('pauseIcon', 'images/pauseIcon.png');
    this.game.load.image('finalBackground', 'images/finalBackground.png');
    this.game.load.image('finalText', 'images/finalText.png');
  },

  create: function () {
      //this.game.state.start('preloader');
      this.game.state.start('menu');
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
      /*this.game.load.atlasJSONHash('rush_idle01', 'images/rush_spritesheet.png',
      'images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);*/
      this.game.load.image('rush_idle01', 'images/rush_spritesheet.png');

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
  game.state.add('gameOver', gameOver);
  game.state.add('finalScene', finalScene);

  //TODO 1.3 iniciar el state 'boot'.

  game.state.start('boot');
};

window.onload = function () {
  //TODO 3.2 Cargar Google font cuando la página esté cargada con wfconfig.
  WebFont.load(wfconfig);
};

},{"./final_scene.js":1,"./gameover_scene.js":2,"./menu_scene.js":4,"./play_scene.js":5}],4:[function(require,module,exports){
var MenuScene = {
    create: function () {

        this.game.world.setBounds(0,0,800,600);

        var starsBackground = this.game.add.sprite(this.game.world.centerX,
                                        this.game.world.centerY,
                                        'starsBackground')
        starsBackground.anchor.setTo(0.5, 0.5);

        var title = this.game.add.sprite(this.game.world.centerX/7, this.game.world.centerY/5, 'title');
        var buttonStart = this.game.add.button(this.game.world.centerX,
                                               this.game.world.centerY,
                                               'boton',
                                               this.actionOnClick,
                                               this, 2, 1, 0);
        buttonStart.anchor.set(0.5);



    },

    actionOnClick: function(){
        this.game.state.start('preloader');
    }
};

module.exports = MenuScene;

},{}],5:[function(require,module,exports){
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
    }
    if(this.body.position.x <= this.leftBound){
      this.body.velocity.x = this.velocity;
    }
  }

  var bullets;
  var loop;
  var enemies;
  var cursors;
  var fireRate = 100;
  var nextFire = 0;
  var numBalas = 20;
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

      this.game.backgroundColor = "#FFFFFF"

      this.map = this.game.add.tilemap('tilemap');
      this.map.addTilesetImage('patrones', 'tiles');
      this.map.addTilesetImage('patrones1', 'tiles1');

      this.cursors = this.game.input.keyboard.createCursorKeys();

      //Creacion de las layers
      this.backgroundLayer = this.map.createLayer('BackgroundLayer');
      this.groundLayer = this.map.createLayer('GroundLayer');
      //plano de muerte
      this.death = this.map.createLayer('Death');
      this.teleport = this.map.createLayer('Teleport');
      //this._rush = this.game.add.sprite(100,3000, 'rush_idle01');
      this._rush = this.game.add.sprite(300,3100, 'rush_idle01');
      //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
      this.map.setCollisionBetween(1, 5000, true, 'Death');
      this.map.setCollisionBetween(1, 5000, true, 'GroundLayer');
      this.death.visible = true;
      //Cambia la escala a x3.
      this.groundLayer.setScale(3,3);
      this.backgroundLayer.setScale(3,3);
      this.death.setScale(3,3);
      this.teleport.setScale(3,3);

      this.groundLayer.resizeWorld(); //resize world and adjust to the screen

      //nombre de la animación, frames, framerate, isloop
      /*this._rush.animations.add('run',
                    Phaser.Animation.generateFrameNames('rush_run',1,5,'',2),10,true);
      this._rush.animations.add('stop',
                    Phaser.Animation.generateFrameNames('rush_idle',1,1,'',2),0,false);
      this._rush.animations.add('jump',
                     Phaser.Animation.generateFrameNames('rush_jump',2,2,'',2),0,false);*/
      this.configure();

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
      this.t3 = this.triggers.create(5400, 1500, 'trigger');
      this.t4 = this.triggers.create(5600, 550, 'trigger');// OK
      this.triggers.setAll('body.immovable', true);
      this.triggers.setAll('alpha', 0);
      this.triggers.setAll('anchor.y', 1);


      this.enemies = this.game.add.group();
      this.enemies = this.game.add.physicsGroup();
      this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
      this.enemies.enableBody = true;

      this.enemy1 = this.createBaseEnemy(850, 3180, 500, 1000, 250, 0);
      this.enemy2 = this.createBaseEnemy(2500, 3450, 2200, 2750, 250, 2);
      this.enemy3 = this.createBaseEnemy(4900, 3250, 4700, 5100, 250, 1);
      this.enemy4 = this.createBaseEnemy(3720, 2600, 3550, 3900, 150, 3);
      this.enemy5 = this.createBaseEnemy(5100, 2600, 5000, 5150, 250, 4);
      this.enemy6 = this.createBEnemy(5000, 1350, 4800, 5200, 150, 5);
      this.enemy7 = this.createBEnemy(900, 1450, 850, 1100, 250, 2);
      this.finalEnemy = this.createFinalEnemy(4100, 375, 3800, 4300, 250, 10);
      this.enemies.add(this.enemy1);
      this.enemies.add(this.enemy2);
      this.enemies.add(this.enemy3);
      this.enemies.add(this.enemy4);
      this.enemies.add(this.enemy5);
      this.enemies.add(this.enemy6);
      this.enemies.add(this.enemy7);
      this.enemies.add(this.finalEnemy);
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
        //var enemyWBullet = this.game.physics.arcade.collide(this.bullets, this.enemies);
        this.enemyMovement();

        if (this.cursors.left.isDown)
        {
          this._rush.body.velocity.x = -250;
            if(this._rush.scale.x > 0)
                this._rush.scale.x *= -1;
        }

        if (this.cursors.right.isDown)
        {
          this._rush.body.velocity.x = 250;
            if(this._rush.scale.x < 0)
                this._rush.scale.x *= -1;
        }

        /*if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
          this._rush.body.velocity.x = 250;
            if(this._rush.scale.x < 0)
                this._rush.scale.x *= -1;
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
          this._rush.body.velocity.x = -250;
            if(this._rush.scale.x > 0)
                this._rush.scale.x *= -1;
        }*/

        /*this.movement(moveDirection,5,
                      this.backgroundLayer.layer.widthInPixels*this.backgroundLayer.scale.x - 10);*/

        //this._rush.body.velocity.x = 0;

        /*if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
          if(this._rush.scale.x < 0){
              this._rush.scale.x *= -1;
            }
          this._rush.body.velocity.x = 500;
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
          if(this._rush.scale.x > 0){
              this._rush.scale.x *= -1;
            }
          this._rush.body.velocity.x = -300;
        }*/

        //this.game.camera.flash(0xEBEBEB, 3000);

        if (this.game.input.activePointer.isDown)
        {
          this.fire();
          numBalas--;
        }
        console.log("Te quedan: ", numBalas);
        if(enemyCollision){
          this.game.state.start('gameOver');
        }

        this.game.physics.arcade.overlap(this.bullets, this.enemies, this.bulletCollision, null, this);



        this.triggerCollision(this.t1, 300, 2500);
        this.triggerCollision(this.t2, 500, 1600);
        this.triggerCollision(this.t3, 200, 400);


        if(this.game.physics.arcade.collide(this._rush, this.t4)){
          this.game.state.start('finalScene');
        }



        if(this.game.input.keyboard.isDown(Phaser.Keyboard.P)){
          game.paused = true;
        }

        this.keyPause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        this.keyPause.onDown.add(this.pausedMenu,this);
        //transitions
        /*switch(this._playerState)
        {
            case PlayerState.STOP:
            case PlayerState.RUN:
                if(this.isJumping(collisionWithTilemap)){
                    this._playerState = PlayerState.JUMP;
                    this._initialJumpHeight = this._rush.y - 40;
                    //this._rush.animations.play('jump');
                }
                else{
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        //this._rush.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        //this._rush.animations.play('stop');
                    }
                }
                break;

            case PlayerState.JUMP:

                var currentJumpHeight = this._rush.y - this._initialJumpHeight;
                this._playerState = (currentJumpHeight*currentJumpHeight < this._jumpHight*this._jumpHight)
                    ? PlayerState.JUMP : PlayerState.FALLING;
                break;

            case PlayerState.FALLING:
                if(this.isStanding()){
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        //this._rush.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        //this._rush.animations.play('stop');
                    }
                }
                break;
        }
        //States
        switch(this._playerState){

            case PlayerState.STOP:
                moveDirection.x = 0;
                break;
            case PlayerState.JUMP:
            case PlayerState.RUN:
            case PlayerState.FALLING:
                if(movement === Direction.RIGHT){
                    moveDirection.x = this._speed;
                    if(this._rush.scale.x < 0)
                        this._rush.scale.x *= -1;
                }
                else{
                    moveDirection.x = -this._speed;
                    if(this._rush.scale.x > 0)
                        this._rush.scale.x *= -1;
                }
                if(this._playerState === PlayerState.JUMP)
                    moveDirection.y = -this._jumpSpeed;
                if(this._playerState === PlayerState.FALLING)
                    moveDirection.y = 0;
                break;
        }
        //movement
        this.movement(moveDirection,5,
                      this.backgroundLayer.layer.widthInPixels*this.backgroundLayer.scale.x - 10);

        this.checkPlayerFell();*/
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


      this.game.physics.arcade.isPaused = (this.game.physics.arcade.isPaused) ? false : true;
    },

    bulletCollision: function(bullet, enemy){
      if(enemy.lifes > 0){
        enemy.lifes--;
      }
      else if(enemy.lifes === 0){
        enemy.kill();
      }
      bullet.kill();
    },

    actionOnClickResume: function(){
        this.game.world.setBounds(this._rush);
        this.pauseBackground.visible = false;
        this.pauseText.visible = false;
        this.buttonMenu.visible = false;
        this.buttonResume.visible = false;
        this.pauseIcon.visible = false;
        this.game.physics.arcade.isPaused = (this.game.physics.arcade.isPaused) ? false : true;

    },

    fire: function() {

      if (this.game.time.now > nextFire && this.bullets.countDead() > 0)
        {
          nextFire = this.game.time.now + fireRate;

          var bullet = this.bullets.getFirstDead();

          if(this._rush.body.velocity.x === 250){
            if(bullet.scale.x < 0){
                bullet.scale.x *= -1;
            }
            bullet.reset(this._rush.x+50, this._rush.y+10);
            bullet.body.velocity.x = 500;
          } if(this._rush.body.velocity.x === -250){

              if(bullet.scale.x > 0){
                  bullet.scale.x *= -1;
              }
              bullet.reset(this._rush.x-50, this._rush.y+10);
              bullet.body.velocity.x = -500;
          }
        }
    },

    enemyMovement: function(){
      this.enemies.children.forEach(function(enemy){
        enemy.setMovement();
      })
    },

    triggerCollision: function(trigger, posX, posY){
      if(this.game.physics.arcade.collide(this._rush, trigger)){
        this._rush.reset(posX, posY);
      }
    },


    returnToMenu: function(){
      this.game.state.start('menu');
    },


    /*canJump: function(collisionWithTilemap){
        return this.isStanding() && collisionWithTilemap || this._jamping;
    },*/

    onPlayerFell: function(){
        //TODO 6 Carga de 'gameOver';
        this.game.state.start('gameOver');
    },

    checkPlayerFell: function(){
        if(this.game.physics.arcade.collide(this._rush, this.death))
            this.onPlayerFell();
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
        this._rush.body.velocity.x = 200;
        this.game.camera.posX = this._rush.posX;
        this.game.camera.posY = this._rush.posY;
        this.game.camera.follow(this._rush);
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
    }



};

module.exports = PlayScene;

},{}]},{},[3]);

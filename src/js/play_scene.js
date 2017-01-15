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
  var jumping;
  var jumpTime = 0;
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
      //this.jumping = this.game.input.keyboard.addKey(Phaser.Keyboard.W);

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
        this.enemyMovement();
        this.playerMovement();
        this.checkPlayerFell();


        if (this.game.input.keyboard.isDown(Phaser.Keyboard.L))
        {
            this.game.camera.flash(0xEBEBEB, 150);
            this.fire();
            console.log("HHH", numBalas);
        }

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

    playerMovement: function(){
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
      {
        this._rush.body.velocity.x = -400;
          if(this._rush.scale.x > 0)
              this._rush.scale.x *= -1;
      }

      else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
      {
        this._rush.body.velocity.x = 400;
          if(this._rush.scale.x < 0)
              this._rush.scale.x *= -1;
      }


      if( this.game.input.keyboard.isDown(Phaser.Keyboard.W) && this._rush.body.onFloor() ) {
        this._rush.body.velocity.y = -850;
      }
    },

    actionOnClickResume: function(){
        this.game.world.setBounds(this._rush);
        this.pauseBackground.visible = false;
        this.pauseText.visible = false;
        this.buttonMenu.visible = false;
        this.buttonResume.visible = false;
        this.pauseIcon.visible = false;
        this._rush.body.velocity.x = 0;
        this.game.physics.arcade.isPaused = (this.game.physics.arcade.isPaused) ? false : true;

    },

    fire: function() {
      if (this.game.time.now > nextFire && this.bullets.countDead() > 0)
        {
          nextFire = this.game.time.now + fireRate;

          var bullet = this.bullets.getFirstDead();

          if(this._rush.body.velocity.x === 400){
            if(bullet.scale.x < 0){
                bullet.scale.x *= -1;
            }
            bullet.reset(this._rush.x+50, this._rush.y+10);
            bullet.body.velocity.x = 650;
          } if(this._rush.body.velocity.x === -400){

              if(bullet.scale.x > 0){
                  bullet.scale.x *= -1;
              }
              bullet.reset(this._rush.x-50, this._rush.y+10);
              bullet.body.velocity.x = -650;
          }

        }
        numBalas--;
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
      this.bullets.destroy();
      this.enemies.destroy();
    }



};

module.exports = PlayScene;

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


  /*Enemy.prototype.move = function(ranMin, ranMax){
    if(this.posX === this.standingPos - ranMin){ //&& this.x < this.initialPos + max)
        this.body.velocity.posX = this.speed;
        if(this.scale.posX > 0)
            this.scale.posX *= -1;
    }
    else if(this.posX === this.standingPos + ranMax){
        this.body.velocity.posX = -this.speed;
        if(this.scale.posX < 0)
            this.scale.posX *= -1;
    }
  }*/

//Scena de juego.
var PlayScene = {
    _rush: {}, //player
    enemies: {}, //enemies group;
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


      this.enemy1 = new Enemy('enemy', 850, 3180, this);
      this.enemies.add(this.enemy1);


      this.enemy2 = new Enemy('enemy', 2500, 3450, this);
      this.enemies.add(this.enemy2);

      this.enemy3 = new Enemy('enemy', 4900, 3250, this);
      this.enemies.add(this.enemy3);

      this.enemy4 = new Enemy('enemy', 3720, 2600, this);
      this.enemies.add(this.enemy4);

      this.enemy5 = new Enemy('enemy', 5100, 2600, this);
      this.enemies.add(this.enemy5);

      this.enemy6 = new Enemy('enemyB', 5000, 1350, this);
      this.enemies.add(this.enemy6);

      this.enemy7 = new Enemy('enemyB', 900, 1450, this);
      this.enemies.add(this.enemy7);

      this.finalEnemy = new Enemy('finalEnemy', 4100, 375, this);
      this.enemies.add(this.finalEnemy);
  },

    //IS called one per frame.
    update: function () {
        var moveDirection = new Phaser.Point(0,0);
        var collisionWithTilemap = this.game.physics.arcade.collide(this._rush, this.groundLayer);
        var enemyWithTilemap = this.game.physics.arcade.collide(this.enemies, this.groundLayer);
        var movement = this.GetMovement();
        var enemyCollision = this.game.physics.arcade.collide(this._rush, this.enemies);

        this.enemyMovement();


        if(enemyCollision){
          this.game.state.start('gameOver');
        }

        if(this.game.physics.arcade.collide(this._rush, this.t1)){
          this._rush.reset(300, 2500);
        }

        if(this.game.physics.arcade.collide(this._rush, this.t2)){
          this._rush.reset(500, 1600);
        }

        if(this.game.physics.arcade.collide(this._rush, this.t3)){
          this._rush.reset(200, 400);
        }

        if(this.game.physics.arcade.collide(this._rush, this.t4)){
          this.game.state.start('finalScene');
        }



        if(this.game.input.keyboard.isDown(Phaser.Keyboard.P)){
          game.paused = true;
        }

        this.keyPause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        this.keyPause.onDown.add(this.pausedMenu,this);
        //transitions
        switch(this._playerState)
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

        this.checkPlayerFell();
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

    actionOnClickResume: function(){
        this.game.world.setBounds(this._rush);
        this.pauseBackground.visible = false;
        this.pauseText.visible = false;
        this.buttonMenu.visible = false;
        this.buttonResume.visible = false;
        this.pauseIcon.visible = false;
        this.game.physics.arcade.isPaused = (this.game.physics.arcade.isPaused) ? false : true;

    },

    enemyMovement: function(){

      if(this.enemy1.body.position.x >= 1000 || this.enemy1.body.velocity.x === 0){
        this.enemy1.body.velocity.x = -250;
      }
      if(this.enemy1.body.position.x <= 500){
        this.enemy1.body.velocity.x = 250;
      }

      if(this.enemy2.body.position.x >= 2750 || this.enemy2.body.velocity.x === 0){
        this.enemy2.body.velocity.x = -250;
      }
      if(this.enemy2.body.position.x <= 2200){
        this.enemy2.body.velocity.x = 250;
      }

      if(this.enemy3.body.position.x >= 5100 || this.enemy3.body.velocity.x === 0){
        this.enemy3.body.velocity.x = -250;
      }
      if(this.enemy3.body.position.x <= 4700){
        this.enemy3.body.velocity.x = 250;
      }


      if(this.enemy4.body.position.x >= 3900 || this.enemy4.body.velocity.x === 0){
        this.enemy4.body.velocity.x = -150;
      }
      if(this.enemy4.body.position.x <= 3550){
        this.enemy4.body.velocity.x = 150;
      }

      if(this.enemy5.body.position.x >= 5150 || this.enemy5.body.velocity.x === 0){
        this.enemy5.body.velocity.x = -250;
      }
      if(this.enemy5.body.position.x <= 5000){
        this.enemy5.body.velocity.x = 250;
      }

      if(this.enemy6.body.position.x >= 5200 || this.enemy6.body.velocity.x === 0){
        this.enemy6.body.velocity.x = -150;
      }
      if(this.enemy6.body.position.x <= 4800){
        this.enemy6.body.velocity.x = 150;
      }

      if(this.enemy7.body.position.x >= 1100 || this.enemy7.body.velocity.x === 0){
        this.enemy7.body.velocity.x = -100;
      }
      if(this.enemy7.body.position.x <= 850){
        this.enemy7.body.velocity.x = 100;
      }

      if(this.finalEnemy.body.position.x >= 4300 || this.finalEnemy.body.velocity.x === 0){
        this.finalEnemy.body.velocity.x = -400;
      }
      if(this.finalEnemy.body.position.x <= 3800){
        this.finalEnemy.body.velocity.x = 400;
      }




    },


    returnToMenu: function(){
      this.game.state.start('menu');
    },


    canJump: function(collisionWithTilemap){
        return this.isStanding() && collisionWithTilemap || this._jamping;
    },

    onPlayerFell: function(){
        //TODO 6 Carga de 'gameOver';
        this.game.state.start('gameOver');
    },

    checkPlayerFell: function(){
        if(this.game.physics.arcade.collide(this._rush, this.death))
            this.onPlayerFell();
    },

    isStanding: function(){
        return this._rush.body.blocked.down || this._rush.body.touching.down
    },

    isJumping: function(collisionWithTilemap){
        return this.canJump(collisionWithTilemap) &&
            this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
    },

    GetMovement: function(){
        var movement = Direction.NONE
        //Move Right
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            movement = Direction.RIGHT;
        }
        //Move Left
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            movement = Direction.LEFT;
        }
        return movement;
    },
    //configure the scene
    configure: function(){
        //Start the Arcade Physics systems
        this.game.world.setBounds(0, 0, 8000, 6000);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#a9f0ff';
        this.game.physics.arcade.enable(this._rush);

        this._rush.body.bounce.y = 0.2;
        this._rush.body.gravity.y = 20000;
        this._rush.body.gravity.x = 0;
        this._rush.body.velocity.x = 0;
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

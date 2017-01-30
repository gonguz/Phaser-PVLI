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

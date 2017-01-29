
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

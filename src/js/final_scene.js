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

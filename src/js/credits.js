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

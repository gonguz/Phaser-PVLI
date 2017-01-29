var credits = {
  create: function(){
    this.game.world.setBounds(0,0,800,600);
    var creditsBackground = this.game.add.sprite(this.game.world.centerX,
                                    this.game.world.centerY,
                                    'credits');
    creditsBackground.anchor.setTo(0.5, 0.5);

    var menuButton = this.game.add.button(this.game.world.centerX - 70,
                                           this.game.world.centerY * 1.5,
                                           'botonMenu',
                                           this.actionOnClick,
                                           this, 2, 1, 0)
  },

  actionOnClick: function(){
      this.game.state.start('menu');
      this.endMusic.stop();
  }
};

module.exports = credits;

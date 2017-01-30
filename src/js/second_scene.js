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

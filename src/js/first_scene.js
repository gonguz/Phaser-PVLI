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

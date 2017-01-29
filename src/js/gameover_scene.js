var GameOver = {
  gameOverAudio: {},
    create: function () {
        this.game.stage.backgroundColor = "#000000";
        this.game.world.setBounds(0,0,800,600);
        this.gameOverAudio = this.game.add.audio("gameOver");
        this.gameOverAudio.play();
        var gameOverImage = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY/3,
        'gameOverImage');
        gameOverImage.anchor.set(0.5);
        var botonMenu = this.game.add.button(this.game.world.centerX,
                                               this.game.world.centerY,
                                               'botonMenu',
                                               this.returnToMenu,
                                               this, 2, 1, 0);

        botonMenu.anchor.set(0.5);

    },

    //TODO 7 declarar el callback del boton.
    returnToMenu: function(){
      this.game.state.start('menu');
      this.gameOverAudio.stop();
    }

};

module.exports = GameOver;

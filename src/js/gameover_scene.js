var GameOver = {
    create: function () {
        console.log("Game Over");
        var button = this.game.add.button(400, 300,
                                          'button',
                                          this.actionOnClick,
                                          this, 2, 1, 0);
        button.anchor.set(0.5);
        var goText = this.game.add.text(400, 100, "GameOver");
        var text = this.game.add.text(0, 0, "Reset Game");
        text.font = 'Sniglet';
        goText.font = 'Sniglet';
        text.anchor.set(0.5);
        goText.anchor.set(0.5);
        button.addChild(text);

        //TODO 8 crear un boton con el texto 'Return Main Menu' que nos devuelva al menu del juego.
        var returnButton = this.game.add.button(400, 300, 'button',
        this.returnToMenu, this, 2, 1, 0);

        returnButton.anchor.set(0.5);
        var returnMenuText = this.game.add.text(0, 0, "Return Menu");
        returnMenuText.font = 'Sniglet';
        returnMenuText.anchor.set(0.5);
        returnButton.addChild(returnMenuText);

    },

    //TODO 7 declarar el callback del boton.

	actionOnClick: function(){
		this.game.state.start('play');
	},
    returnToMenu: function(){
      //Tuve que poner que haga de nuevo play, ya que si iba al menu, al volver
      //a empezar y pulsando una tecla, volvía de nuevo al menu.
      this.game.state.start('play');
    }

};

module.exports = GameOver;

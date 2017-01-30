var numeroGenerado;
var text;
var alternativeMenu = {
  menuMusic: {},
    create: function () {
        this.game.world.setBounds(0,0,800,600);

        this.music = this.game.add.audio('menu');
        this.music.play();

        var alternativeMenu = this.game.add.image(this.game.world.centerX-350,
                                        this.game.world.centerY,
                                        'alternativeMenu');
                                        alternativeMenu.anchor.setTo(0.1, 0.4);

        var buttonStart = this.game.add.button(this.game.world.centerX,
                                               this.game.world.centerY,
                                               'boton',
                                               this.actionOnClick,
                                               this, 2, 1, 0);
        buttonStart.anchor.set(0.5);
        var otherModeButton = this.game.add.button(this.game.world.centerX - 75,
                                               this.game.world.centerY + 150, 'otherModeButton', this.actionOnClick2, this, 2, 1, 0);

        var randomButton = this.game.add.button(this.game.world.centerX + 220,
                                               this.game.world.centerY + 50, 'randomMode', this.chosenModeButton, this, 2, 1, 0);
        var diceText = this.game.add.text(randomButton.x - 40, randomButton.y - 40, "I'M A BUTTON TOO!", {fill: '#ff0000'});
        diceText.font = 'firacode';
        diceText.anchor.set(0.2);

        numeroGenerado = this.aleatorioButton(1, 7);
    },

    actionOnClick: function(){
        this.game.state.start('play');
        this.music.stop();
    },

    actionOnClick2: function(){
        this.game.state.start('play2');
        this.music.stop();
    },

    aleatorioButton: function(inferior, superior){
      var numPosibilidades = superior - inferior;
   	  var aleat = Math.random() * numPosibilidades;
   	  aleat = Math.round(aleat);
   	  return parseInt(inferior) + aleat;
    },

    chosenModeButton: function(){
      if(numeroGenerado >= 1 && numeroGenerado <= 2){
        this.game.state.start('play');
      }
      else if(numeroGenerado > 2 && numeroGenerado <= 4){
        this.game.state.start('play2');
      }
      else if(numeroGenerado > 4 && numeroGenerado <= 7){
        this.game.state.start('noModeScene');
      }
      this.music.stop();
    }
};

module.exports = alternativeMenu;

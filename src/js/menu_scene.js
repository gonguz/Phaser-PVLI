var MenuScene = {
    create: function () {

        this.game.world.setBounds(0,0,800,600);

        var starsBackground = this.game.add.sprite(this.game.world.centerX,
                                        this.game.world.centerY,
                                        'starsBackground')
        starsBackground.anchor.setTo(0.5, 0.5);

        var title = this.game.add.sprite(this.game.world.centerX/7, this.game.world.centerY/5, 'title');
        var buttonStart = this.game.add.button(this.game.world.centerX,
                                               this.game.world.centerY,
                                               'boton',
                                               this.actionOnClick,
                                               this, 2, 1, 0);
        buttonStart.anchor.set(0.5);
    },

    actionOnClick: function(){
        this.game.state.start('preloader');
    }
};

module.exports = MenuScene;

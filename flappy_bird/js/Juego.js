var bg;
var tubos;
var flappy;
var salto;
var timer;
var puntos;
var txtPuntaje;

var Juego = {
    
    preload: function() {
        juego.load.image("bg", "img/bg.jpeg");
        juego.load.spritesheet("pajaros", "img/pajaro.png", 43, 30);
        juego.load.image("tubo", "img/tubo.png");
        
        juego.forceSingleUpdate = true;
    },
    
    create: function() {
        bg = juego.add.tileSprite(0, 0, 370, 550, "bg");
        juego.physics.startSystem(Phaser.Physics.ARCADE);
        
        tubos = juego.add.group();
        tubos.enableBody = true;
        tubos.createMultiple(20, 'tubo');
        
        flappy = juego.add.sprite(100, 245, 'pajaros');
        flappy.frame = 1;
        flappy.animations.add('vuelo', [0, 1, 2], 10, true);
        flappy.anchor.setTo(0, 0.5);
        
        juego.physics.arcade.enable(flappy);
        
        flappy.body.gravity.y = 1200;
        
        salto = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        salto.onDown.add(this.saltar, this);
        
        timer = juego.time.events.loop(1500, this.crearColumna, this);
        
        puntos = -1;
        txtPuntaje = juego.add.text(20, 20, "Puntos: 0", {font: "20px Arial", fill: "#FFF"});
        
    },
    
    update: function() {
        
        if (flappy.inWorld == false)
        {
            this.state.start("Game_Over");
        }
        else if (flappy.position.y > 460)
        {
            flappy.alive = false;
            tubos.forEachAlive(function(tubo){
                tubo.body.velocity.x = 0;
            }, this);
        }
        else
        {
            bg.tilePosition.x -=1;
        }
        
        juego.physics.arcade.overlap(flappy, tubos, this.tocoTubo, null, this);
        
        flappy.animations.play('vuelo');
        
        if (flappy.angle < 20) {
            flappy.angle +=1;
        }
    },
    
    tocoTubo: function() {
        if (flappy.alive == false) {
            return;
        }
        
        flappy.alive = false;
        juego.time.events.remove(timer);

        tubos.forEachAlive(function(tubo){
            tubo.body.velocity.x = 0;
        }, this);
    },
    
    saltar: function() {
        if (flappy.alive) {
            flappy.body.velocity.y -= 350;
            juego.add.tween(flappy).to({angle:-20}, 100).start();
        }
    },
    
    crearColumna: function() {
        var hueco = Math.floor(Math.random() * 5) + 1;
        for (var i = 0; i < 8; i++)
        {
            if (i != hueco && i != hueco + 1)
            {
                this.crearUnTubo(370, i*55+20);
            }
        }
        
        puntos++;
        txtPuntaje.text = "Puntos: " + puntos;
    },
    
    crearUnTubo: function(x, y) {
        var tubo = tubos.getFirstDead();
        tubo.reset(x, y);
        tubo.body.velocity.x = -180;
        tubo.checkWorldBounds = true;
        tubo.outOfBoundsKill = true;
    }
    
};
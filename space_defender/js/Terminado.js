var Terminado = {
    
    preload: function() {

    },
    
    create: function() {
        juego.stage.backgroundColor = "#990000";
        
        if (confirm("Desea reiniciar el Juego??")) {
            juego.state.start("Juego");
        }
    },
    
    update: function() {
        
    }
    
};
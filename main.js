var AM = new AssetManager();


// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.removeFromWorld = false; 
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y,1200,780);
};

Background.prototype.update = function () {
};

//Assets
AM.queueDownload("./assets/desertBackground1.jpg");
AM.queueDownload("./assets/PSNAKE-IDLE2.png");
AM.queueDownload("./assets/PSNAKE-DIE.png"); 
AM.queueDownload("./assets/Archer-Idle.png"); 
AM.queueDownload("./assets/Archer-Shooting.png");  
AM.queueDownload("./assets/Arrow.png"); 


AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start(); 
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./assets/desertBackground1.jpg")));
    var enemy = new Snake(gameEngine, AM); 
    gameEngine.addEntity(enemy); 
    var eminem = new Archer(gameEngine, AM);
    gameEngine.addEntity(eminem);
    console.log("All Done!");
});
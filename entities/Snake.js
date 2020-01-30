var spriteSheets = [];
function loadSnakeSpriteSheets(AM) {
    spriteSheets['idle'] = AM.getAsset("./assets/PSNAKE-IDLE2.png");
    spriteSheets['die'] = AM.getAsset("./assets/PSNAKE-DIE.png");
}

function Snake(game, assetManager) {
    this.AM = assetManager; 
    loadSnakeSpriteSheets(this.AM); 
    this.ctx = game.ctx; 
    this.idle();
    this.x = 600;
    this.width = 70; 
    this.y = 580;
    this.speed = 0;
    this.removeFromWorld = false; 
    this.game = game;
    this.name = "snake"; 
    //this.SnakeControl = new SnakeControl(this); 
}

Snake.prototype = new Entity();
Snake.prototype.constructor = Snake;


Snake.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Snake.prototype.update = function () {
    var that = this; 
    this.x += this.game.clockTick * this.speed; 
    Entity.prototype.update.call(this);
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent.name === "arrow") {
            if (this.collide(ent)) { 
                this.die(); 
                setTimeout(function(){
                    that.removeFromWorld = true;
                    console.log("It works!!!");  
                }, 500); 
                console.log("Snake removed"); 
            }
        }
    }
}

Snake.prototype.collide = function(other) {
    return this.x < other.x + other.width && this.x + this.width > other.x;
}

Snake.prototype.idle = function() {
    this.animation = new Animation(spriteSheets['idle'], 94.8, 85, 12, .1, 12, .5, true, .2);
}

Snake.prototype.die = function() {
    this.animation = new Animation(spriteSheets['die'], 94.8, 114, 7, .1, 7, false, .95); 
}



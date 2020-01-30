var spritesheets = []; 
function loadArrowSpriteSheets(AM) {
	spritesheets['shoot'] = AM.getAsset("./assets/Arrow.png");
	spritesheets['remove'] = AM.getAsset("./assets/blank.png");  
}

function Arrow(game, AssetManager) {
	this.AM = AssetManager; 
	loadArrowSpriteSheets(this.AM);
	this.animation = new Animation(spritesheets['shoot'], 320, 128, 1, .1, 1, true, .2);
	this.ctx = game.ctx; 
	this.x = 280;
	this.y = 615;
	this.width = 64; 
	this.speed = 280; 
	this.game = game; 
	this.name = "arrow";  
}

Arrow.prototype = new Entity();
Arrow.prototype.constructor = Arrow;

Arrow.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Arrow.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    Entity.prototype.update.call(this);
    for (var i = 0; i < this.game.entities.length; i++) {
    	var ent = this.game.entities[i];
    	if (ent.name === "snake") {
    		if (this.collide(ent)) {
    			this.remove(); 
    			this.removeFromWorld = true; 
    			console.log("collided"); 
    		}
	    }
    }	
}

Arrow.prototype.collide = function(other) {
    return this.x < other.x + (other.width - 5) && this.x + (this.width - 5) > other.x; 
}

Arrow.prototype.remove = function() {
	this.animation = new Animation(spritesheets['shoot'], 320, 128, 1 , .25, 1, false, .2); 
}
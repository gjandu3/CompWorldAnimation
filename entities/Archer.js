var spritesheets = []; 
function loadArcherSpriteSheets(AM) {
	spritesheets['idle'] = AM.getAsset("./assets/Archer-Idle.png"); 
	spritesheets['attack'] = AM.getAsset("./assets/Archer-Shooting.png"); 
}

function Archer(game, AssetManager) {
	this.AM = AssetManager; 
	loadArcherSpriteSheets(this.AM);
	this.ctx = game.ctx; 
	this.idle(); 
	this.state = "idle"; 
	this.x = 200;
	this.y = 510;
	this.speed = 0; 
	this.time = 100; 
	this.game = game;  
	this.removeFromWorld = false; 
	this.width = 182; 
	this.name = "archer"; 
	this.PlayingTempAnimation = false; 
	this.ArcherControl = new ArcherControl(this); 
}

Archer.prototype = new Entity();
Archer.prototype.constructor = Archer;

Archer.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Archer.prototype.update = function () {
	var that = this; 
    this.x += this.game.clockTick * this.speed;
    ControlAnimation(this); 
    Entity.prototype.update.call(this);
    this.time++; 
}

Archer.prototype.idle = function() {
	this.animation = new Animation(spritesheets['idle'], 910, 900, 18, .05, 18, true, .2); 
}

Archer.prototype.shooting = function() {
		if (this.time > 100) {
		this.animation = new Animation(spritesheets['attack'], 910, 900, 9, .03, 9, false, .2); 
		var arrow = new Arrow(this.game, this.AM); 
		this.game.addEntity(arrow); 
		this.PlayingTempAnimation = true; 
		this.time = 0; 
	}
}

function ControlAnimation(archer) {
	if(archer.PlayingTempAnimation && archer.animation.isDone()) {
        archer.idle();
    }
}

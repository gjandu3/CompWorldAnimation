function ArcherControl(enemy) {
	var that = this; 
	//var SpaceBarPressed = "false";
	this.Archer = enemy;  

	document.addEventListener("keydown", function (e) {
		console.log(e); 
		//e.preventDefault();
		if (e.code === "Space") {
			console.log("Space Bar Pressed"); 
			that.Archer.shooting(); 
			//SpaceBarPressed = "true"; 
		}

	}, false);

	/*document.addEventListener("keyup", function(e) {
		console.log(e);
		if (e.code === "Space" && SpaceBarPressed === "true") {
			console.log("Space Bar released"); 
			that.Archer.idle(); 
			SpaceBarPressed = "false"; 
		}
	
	}, false);*/
}
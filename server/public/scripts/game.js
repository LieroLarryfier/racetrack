var polygon;

function startGame() {
console.log(parseInt(STAGE_WIDTH) + " x " + parseInt(STAGE_HEIGHT));
var game = new Phaser.Game(STAGE_WIDTH, STAGE_HEIGHT, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('car', 'assets/car.svg', 17, 26 ,2);
	game.load.image('track', 'assets/d1.jpg');
	
}

var CAR_WIDTH = 10;
var CAR_HEIGHT = 20;
var SPEED_STANDARD = 30;
var SPEED_SLOW = 10;
var SPEED_BACKWARDS = 50;
var CLUTCH = 33;
var DAMPING_STANDARD = 0.5;
var DAMPING_OUT = 0.9;

var graphics;
var track;
var car1;
var car2;
var cursors;
//TODO: add racecars, only outline from polygon,
function create() {

	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.startSystem(Phaser.Physics.P2JS);

    graphics = game.add.graphics(0, 0);

	//track
	
    //graphics.beginFill(0xFF00A6);
    //graphics.drawPolygon(polygon.points);
   
	trackSprite = game.add.sprite(0,0, 'track');
	game.physics.arcade.enable(trackSprite, true);
	
	
	//trackSprite.body.clearShapes();
	//trackSprite.body.addPolygon({}, polygon);
	
	//TODO: arcade physics  and check for overlaps in group
	
	track = game.add.group();
    track.enableBody = true;
    track.physicsBodyType = Phaser.Physics.ARCADE;

    
	
	drawTrackWithRectangles(track);
	
	//trackSprite.body.static = true;
	
	//for (shapeNr in trackSprite.body.data.shapes) {
	//		var shape = trackSprite.body.data.shapes[shapeNr];
	//		shape.sensor = true;
			//console.log(shape);
	//}
	
	//trackSprite.body.onBeginContact.add(onTrack, this);
	//trackSprite.body.onEndContact.add(outTrack, this);
	
	//cars
	car1 = new Phaser.Rectangle(polygon[0].x, polygon[0].y-CAR_HEIGHT, CAR_WIDTH, CAR_HEIGHT);
	car2 = new Phaser.Rectangle(polygon[0].x+2*CAR_WIDTH, polygon[0].y-CAR_HEIGHT, CAR_WIDTH, CAR_HEIGHT); 

	vettelSprite = game.add.sprite(car1.x, car1.y, 'car', 0);
	vettelSprite.anchor.setTo(0.5, 0.5);
	kimiSprite = game.add.sprite(car2.x, car2.y, 'car', 1);
	
	game.physics.arcade.enable(vettelSprite, true);
	game.physics.arcade.enable(kimiSprite, true);
	
	//inputs
	cursors = game.input.keyboard.createCursorKeys();
	cursorsLeft = game.input.keyboard.addKeys( { 'up': Phaser.Keyboard.W, 'down': Phaser.Keyboard.S, 'left': Phaser.Keyboard.A, 'right': Phaser.Keyboard.D } );
}

function drawTrackWithRectangles(trackSprite) {
	for (pointNr in polygon) {
		var a = 0;
		var b = 0;
		
		if (pointNr == polygon.length - 1) {
			//console.log("last");
			a = pointNr;
			b = 0;
		} else {
			//console.log("normal");
			a = pointNr;
			b = parseInt(pointNr) + 1;
		}
		//console.log("a: " + a + " b: " + b);
		
		var quadrant = 0;
		
		if (polygon[a].x > polygon[b].x) {
			quadrant |= 1;
			console.log("right");
		} 
		
		if (polygon[a].y > polygon[b].y) {
			quadrant |= 2;
			console.log("bottom");
		} 
		
		console.log(quadrant);
		
		var rectWidth = Math.abs(polygon[b].x - polygon[a].x);
		var rectHeight = Math.abs(polygon[b].y - polygon[a].y);
		
		//TODO: logic for straights
		if (rectWidth < 10) {
			rectWidth+=10;
		}
		
		if (rectHeight < 10) {
			rectHeight+=10;
		}
		
		console.log("x: " + polygon[a].x + " y: " + polygon[a].y + " width: " + rectWidth + " height: " + rectHeight);

		var drawnObject;

var bmd = game.add.bitmapData(rectWidth, rectHeight);
 
bmd.ctx.beginPath();
bmd.ctx.rect(0, 0, rectWidth, rectHeight);
bmd.ctx.fillStyle = '#ffffff';
bmd.ctx.fill();
drawnObject = game.add.sprite(polygon[a].x, polygon[a].y, bmd);
		
        var c = track.create(polygon[a].x, polygon[a].y, bmd);
        c.name = 'rect' + pointNr;
        c.body.immovable = true;
		 
	}
}


var speed = SPEED_SLOW;

function onTrack() {
	//speed = SPEED_STANDARD;
	//console.log(_carBody);
	vettelSprite.body.damping = DAMPING_STANDARD;
	
}


function outTrack() {
	//speed = SPEED_SLOW;
	//console.log("out: " + _carBody);
	vettelSprite.body.damping = DAMPING_OUT;
	
}

function update() {
	speed = SPEED_SLOW;
	vettelSprite.body.angularVelocity = 0;
	game.physics.arcade.overlap(vettelSprite, track, collisionHandler, null, this);
	
	//cars
	//TODO: angular damping
	if (cursors.left.isDown)
    {
        vettelSprite.body.angularVelocity = -CLUTCH;
    }
    else if (cursors.right.isDown)
    {
        vettelSprite.body.angularVelocity = CLUTCH;
    } 
	else 
	{
		//vettelSprite.body.rotateLeft(0);
		//vettelSprite.body.rotateRight(0);
	}
		

    if (cursors.up.isDown)
    {
       game.physics.arcade.velocityFromAngle(vettelSprite.angle, speed, vettelSprite.body.velocity);
    }
    else if (cursors.down.isDown)
    {
		game.physics.arcade.velocityFromAngle(vettelSprite.angle, -SPEED_BACKWARDS, vettelSprite.body.velocity);
    }
	
	if (cursorsLeft.left.isDown)
    {
        //kimiSprite.body.rotateLeft(CLUTCH);
    }
    else if (cursorsLeft.right.isDown)
    {
        //kimiSprite.body.rotateRight(CLUTCH);
    }
	else 
	{
		//kimiSprite.body.rotateLeft(0);
		//kimiSprite.body.rotateRight(0);
	}

    if (cursorsLeft.up.isDown)
    {
        //kimiSprite.body.thrust(speed);
    }
    else if (cursorsLeft.down.isDown)
    {
        //kimiSprite.body.moveBackward(SPEED_BACKWARDS);
    }
	
}

function collisionHandler (vettel, track) {
	//console.log("vettelTrack");
    speed = SPEED_STANDARD;
    
}

function render() {

    game.debug.text(game.input.x + ' x ' + game.input.y, 32, 32);

}

}
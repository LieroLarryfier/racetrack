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

var graphics;
var track;
var car1;
var car2;
var cursors;
//TODO: add racecars, only outline from polygon,
function create() {

	game.physics.startSystem(Phaser.Physics.P2JS);

    graphics = game.add.graphics(0, 0);

	//track
	
    //graphics.beginFill(0xFF00A6);
    //graphics.drawPolygon(polygon.points);
   
	trackSprite = game.add.sprite(0,0, 'track');
	game.physics.p2.enable(trackSprite, true);
	
	
	trackSprite.body.clearShapes();
	trackSprite.body.addPolygon({}, polygon);
	trackSprite.body.static = true;
	
	for (shapeNr in trackSprite.body.data.shapes) {
			var shape = trackSprite.body.data.shapes[shapeNr];
			shape.sensor = true;
			//console.log(shape);
	}
	trackSprite.body.onBeginContact.add(onTrack, this);
	trackSprite.body.onEndContact.add(outTrack, this);
	
	//cars
	car1 = new Phaser.Rectangle(polygon[0], polygon[1]-CAR_HEIGHT, CAR_WIDTH, CAR_HEIGHT);
	car2 = new Phaser.Rectangle(polygon[0]+2*CAR_WIDTH, polygon[1]-CAR_HEIGHT, CAR_WIDTH, CAR_HEIGHT); 

	vettelSprite = game.add.sprite(car1.x, car1.y, 'car', 0);
	kimiSprite = game.add.sprite(car2.x, car2.y, 'car', 1);
	
	game.physics.p2.enable(vettelSprite, true);
	game.physics.p2.enable(kimiSprite, true);
	
	//inputs
	cursors = game.input.keyboard.createCursorKeys();
	cursorsLeft = game.input.keyboard.addKeys( { 'up': Phaser.Keyboard.W, 'down': Phaser.Keyboard.S, 'left': Phaser.Keyboard.A, 'right': Phaser.Keyboard.D } );
}

var speed = 100;

function onTrack() {
	speed = 200;
	console.log("in");
}


function outTrack() {
	speed = 100;
	console.log("out");
}

function update() {
	
	//cars
	
	if (cursors.left.isDown)
    {
        vettelSprite.body.rotateLeft(20);
    }
    else if (cursors.right.isDown)
    {
        vettelSprite.body.rotateRight(20);
    } 
	else 
	{
		vettelSprite.body.rotateLeft(0);
		vettelSprite.body.rotateRight(0);
	}
		

    if (cursors.up.isDown)
    {
       vettelSprite.body.moveForward(speed);
    }
    else if (cursors.down.isDown)
    {
        vettelSprite.body.moveBackward(50);
    }
	
	if (cursorsLeft.left.isDown)
    {
        kimiSprite.body.rotateLeft(20);
    }
    else if (cursorsLeft.right.isDown)
    {
        kimiSprite.body.rotateRight(20);
    }
	else 
	{
		kimiSprite.body.rotateLeft(0);
		kimiSprite.body.rotateRight(0);
	}

    if (cursorsLeft.up.isDown)
    {
        kimiSprite.body.moveForward(speed);
    }
    else if (cursorsLeft.down.isDown)
    {
        kimiSprite.body.moveBackward(100);
    }
	
}

function render() {

    game.debug.text(game.input.x + ' x ' + game.input.y, 32, 32);

}

}
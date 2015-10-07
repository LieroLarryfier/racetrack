var polygon;

function startGame() {
console.log(parseInt(STAGE_WIDTH) + " x " + parseInt(STAGE_HEIGHT));
var game = new Phaser.Game(STAGE_WIDTH, STAGE_HEIGHT, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('car', 'assets/car.svg', 17, 26 ,2);
	
}

var graphics;
var car1;
var car2;
var cursors;
//TODO: add racecars, only outline from polygon,
function create() {

	game.physics.startSystem(Phaser.Physics.P2JS);

    graphics = game.add.graphics(0, 0);

    graphics.beginFill(0xFF00A6);
    graphics.drawPolygon(polygon.points);
   
	car1 = new Phaser.Rectangle(polygon.points[0].x, polygon.points[0].y-20, 10, 20);
	car2 = new Phaser.Rectangle(polygon.points[0].x+20, polygon.points[0].y-20, 10, 20); 

	vettelSprite = game.add.sprite(car1.x, car1.y, 'car', 0);
	kimiSprite = game.add.sprite(car2.x, car2.y, 'car', 1);
	
	game.physics.p2.enable(vettelSprite);
	game.physics.p2.enable(kimiSprite);
	
	cursors = game.input.keyboard.createCursorKeys();
	cursorsLeft = game.input.keyboard.addKeys( { 'up': Phaser.Keyboard.W, 'down': Phaser.Keyboard.S, 'left': Phaser.Keyboard.A, 'right': Phaser.Keyboard.D } );
}

function update() {

    graphics.clear();

	//track
    if (polygon.contains(game.input.x, game.input.y))
    {
        graphics.beginFill(0xB3FF00);
    }
    else
    {
        graphics.beginFill(0xFF00A6);
    }

    graphics.drawPolygon(polygon.points);
	
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
       vettelSprite.body.moveForward(100);
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
        kimiSprite.body.moveForward(100);
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
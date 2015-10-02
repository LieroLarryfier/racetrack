var polygon;

function startGame() {
console.log(parseInt(STAGE_WIDTH) + " x " + parseInt(STAGE_HEIGHT));
var game = new Phaser.Game(STAGE_WIDTH, STAGE_HEIGHT, Phaser.CANVAS, 'phaser-example', { create: create, update: update, render: render });


var graphics;

function create() {

    graphics = game.add.graphics(0, 0);

    graphics.beginFill(0xFF33ff);
    graphics.drawPolygon(polygon.points);
    graphics.endFill();

}

function update() {

    graphics.clear();

    if (polygon.contains(game.input.x, game.input.y))
    {
        graphics.beginFill(0xFF3300);
    }
    else
    {
        graphics.beginFill(0xFF33ff);
    }

    graphics.drawPolygon(polygon.points);
    graphics.endFill();

}

function render() {

    game.debug.text(game.input.x + ' x ' + game.input.y, 32, 32);

}

}
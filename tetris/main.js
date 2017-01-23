const SCALE = 20;
const CODE_LEFT = 37;
const CODE_RIGHT = 39;
const CODE_DOWN = 40;
const KEYCODE_ARROW = [CODE_RIGHT, CODE_LEFT, CODE_DOWN]; // right left down
const mainBoard = document.getElementById('board');
const ctx = mainBoard.getContext('2d');

var TShape = {
    pos: { x: 0, y: 0 },
    fillStyle: 'red',
    matrix: [
        [1, 1, 1],
        [0, 1, 0]
    ]
};

var LShape = {
    pos: { x: 2, y: 0 },
    fillStyle: 'blue',
    matrix: [
        [1, 1, 1],
        [1, 0, 0]
    ]
};
var CubShape = {
    pos: { x: 10, y: 0 },
    fillStyle: 'yellow',
    matrix: [
        [1, 1],
        [1, 1]
    ]
};


var currentShape = CubShape;

init();

function init() {
    initBoard();
    setupEvents();
}

function initBoard() {
    ctx.fillStyle = "rgba(0, 0, 200, 0.3)";
    ctx.fillRect(0, 0, mainBoard.width, mainBoard.height);
    ctx.scale(SCALE, SCALE);
}

function setupEvents() {

    // refresh every 30 mil sec
    window.setInterval(() => window.requestAnimationFrame(update), 30);

    //ove down current shape
    window.setInterval(() => currentShape.pos.y++, 1000);


    window.addEventListener('keydown', function(evt) {
        console.dir(evt.keyCode)
        if (KEYCODE_ARROW.indexOf(evt.keyCode) == -1) {
            return;
        }
        handleKeyUp(evt.keyCode);
    });
}

function update() {
    draw(TShape);
    draw(CubShape);
    draw(LShape);
}

function draw(shape) {
    ctx.fillStyle = shape.fillStyle;
    var pos = shape.pos;
    var matrix = shape.matrix;

    matrix.forEach((row, y) => {
        row.forEach((col, x) => {
            if (col !== 0) {
                ctx.fillRect(x + pos.x, y + pos.y, 1, 1);
            }
        });
    });
}

function handleKeyUp(code) {
    switch (code) {
        case CODE_DOWN:
            currentShape.pos.y++;
            break;

        case CODE_LEFT:
            currentShape.pos.x = currentShape.pos.x < 0 ? 0 : currentShape.pos.x - 1;
            break;

        case CODE_RIGHT:
            currentShape.pos.x++;
            break;

        default:
            break;
    }
}

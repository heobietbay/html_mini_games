const SCALE = 20;
const CODE_LEFT = 37;
const CODE_RIGHT = 39;
const CODE_DOWN = 40;
const KEYCODE_ARROW = [CODE_RIGHT, CODE_LEFT, CODE_DOWN]; // right left down
const mainBoard = document.getElementById('board');
const ctx = mainBoard.getContext('2d');
const defaultPos = function() {
    return { x: 15, y: 0 };
}


var TShape = function() {
    this.pos = defaultPos();
    this.fillStyle = 'red';
    this.strokeStyle = "#000000";
    this.matrix = [
        [1, 1, 1],
        [0, 1, 0]
    ]
};

var LShape = function() {
    this.pos = defaultPos();
    this.fillStyle = 'white';
    this.strokeStyle = "#000000";
    this.matrix = [
        [1, 1, 1],
        [1, 0, 0]
    ]
};
var CubShape = function() {
    this.pos = defaultPos();
    this.fillStyle = 'yellow';
    this.strokeStyle = "#000000";
    this.matrix = [
        [1, 1],
        [1, 1]
    ]
};
var RodShape = function() {
    this.pos = defaultPos();
    this.fillStyle = 'green';
    this.strokeStyle = "#000000";
    this.matrix = [
        [1, 1,1,1]
    ]
};


var currentShape = new CubShape();

init();

function init() {
    ctx.scale(SCALE, SCALE);
    initBoard();
    setupEvents();
}

function initBoard() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, mainBoard.width, mainBoard.height);
}

function newPiece() {
	var collide =  currentShape.pos.y >= (mainBoard.height/SCALE) ;
    if (collide) {
        toogleShape();
    }
}

function setupEvents() {

    // refresh every 30 mil sec
    window.setInterval(() => window.requestAnimationFrame(update), 30);

    //ove down current shape
    window.setInterval(() => {
        currentShape.pos.y++;
        newPiece()
    }, 1000);


    window.addEventListener('keydown', function(evt) {
        console.dir(evt.keyCode)
        if (KEYCODE_ARROW.indexOf(evt.keyCode) == -1) {
            return;
        }
        handleKeyUp(evt.keyCode);
    });
}

function update() {
    initBoard();
    draw(currentShape);
}

function toogleShape() {
    var num = Math.floor(Math.random() * (5 - 1)) + 1;
    switch (num) {
        case 1:
            currentShape = new TShape();
            break;

        case 2:
            currentShape = new CubShape();
            break;

        case 3:
            currentShape = new LShape();
            break;

        case 4:
            currentShape = new RodShape();
            break;

        default:
            currentShape = null;
            break;
    }
}


function draw(shape) {

    if (shape == null)
        return;

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
            newPiece()
            currentShape.pos.y++;
            break;

        case CODE_LEFT:
            currentShape.pos.x = currentShape.pos.x < 0 ? 0 : currentShape.pos.x - 1;
            break;

        case CODE_RIGHT:
            if( (currentShape.pos.x + 1 ) * SCALE + SCALE < mainBoard.width )
            {
               currentShape.pos.x++;
            }
            break;

        default:
            break;
    }
}

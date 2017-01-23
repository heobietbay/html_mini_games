const SCALE = 20;
const mainBoard = document.getElementById('board');
const ctx = mainBoard.getContext('2d');
ctx.scale(SCALE,SCALE);

var TShape = { pos: { x: 0, y : 0} , 
               fillStyle: 'red',
               matrix:[[0,0,0] ,
					   [1,1,1] ,
					   [0,1,0] ] }; 


init();
window.setInterval( () => window.requestAnimationFrame(update), 66);

function update()
{	
    console.log("Calling draw TShape");
    draw(TShape);    
}

function draw(shape)
{
	ctx.fillStyle = shape.fillStyle;	
	var pos = shape.pos;
	var matrix = shape.matrix;

	matrix.forEach((row,y) => {
		row.forEach((col,x) => {
			if(col !== 0 ){	  
               ctx.fillRect(x + pos.x, y + pos.y, 1, 1);
			}
		});
	} );	
}
function initBoard()
{
	ctx.fillStyle = "rgba(0, 0, 200, 0.3)";
    ctx.fillRect (0, 0, 240, 320);
}
function init()
{
    initBoard();
    update();
}
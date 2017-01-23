const mainBoard = document.getElementById('board');
const ctx = mainBoard.getContext('2d');;

init();

function draw()
{
	console.log("Calling draw...");
}
function initBoard()
{
	ctx.fillStyle = "rgba(0, 0, 200, 0.3)";
    ctx.fillRect (0, 0, 480, 640);
}
function init()
{
	initBoard();
	draw();
	requestAnimationFrame(draw);
}
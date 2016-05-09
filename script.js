var grid;
var numCells = 8;
var cellWidth = 600 / numCells;

function setup() {
    createCanvas(800, 600);
    grid = new CellGrid(numCells, numCells, cellWidth);
    grid.spawnMines(10);
}

function draw() {
    background(255);
    for (var i = 0; i < grid.numRows(); i++) {
        for (var j = 0; j < grid.numColumns(); j++) {
            grid.get(i, j).draw();
        }
    }
}

function mouseClicked() {
    var col = floor(mouseX / cellWidth);
    var row = floor(mouseY / cellWidth);
    var cell = grid.get(row, col);
    if (!cell)
        return;
    if (mouseButton === LEFT) {
        cell.visited = true;
    } else if (mouseButton === RIGHT) {
        cell.flagged = !cell.flagged;
    }


}

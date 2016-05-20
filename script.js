var grid;
var numCells = 8;
var cellWidth = 600 / numCells;
var lastPress = false;
var stack;
var gameOver = false;
var won = false;
var timer = false;
var numMines = 10;
var cellsLeft = numCells * numCells;
var flags = numMines;
var start;
var time;
var highScoreTable;
var wasHighScore;


function setup() {
    createCanvas(800, 600);
    grid = new CellGrid(numCells, numCells, cellWidth);
    grid.spawnMines(numMines);
    highScoreTable = new HighScore();
    wasHighScore = false;
    stack = [];
    start = new Date();
}

function draw() {
    if (!gameOver) {
        background(255);
        for (var i = 0; i < grid.numRows(); i++) {
            for (var j = 0; j < grid.numColumns(); j++) {
                grid.get(i, j).draw();
            }
        }
        if (!lastPress && mouseIsPressed)
            onMousePress();
        lastPress = mouseIsPressed;
        if (cellsLeft === 0 && !gameOver) {
            gameOver = true;
            won = true;
        }
        fill(0);
        stroke(0);
        text("Flags left: " + flags, width - 140, height / 2 + 5);
    } else if (won) {
        if (!timer) {
            time = round((new Date() - start) / 1000);
            wasHighScore = highScoreTable.setScore(time);
            setTimeout(function() {
                window.location.reload();
            }, 2000);
            timer = true;
        }
        background(0, 255, 0);
        fill(0);
        stroke(0);
        text("You Won!", width / 2 - 10, height / 2 + 5);
        text(time + " seconds", width / 2 - 15, height / 2 + 25);
        var highScoreText;
        if (wasHighScore) {
            highScoreText = "You got the new highscore!";
        } else {
            highScoreText = "Highscore: " + highScoreTable.getHighScore() + " seconds";
        }
    } else {
        background(255, 0, 0);
        fill(0);
        stroke(0);
        text("Game Over", width / 2 - 10, height / 2 + 5);
        if (!timer) {
            setTimeout(function() {
                window.location.reload();
            }, 2000);
            timer = true;
        }
    }
}

function clearCell(cell) {
    if (!cell.flagged && cell.containsMine()) {
        gameOver = true;
    }
    if (!cell.flagged) {
        if (!cell.visited) {
            cellsLeft--;
        }
        cell.visited = true;

        if (cell.getValue() === 0) {
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    var c = grid.get(cell.getRow() + i, cell.getCol() + j);
                    if (!c)
                        continue;
                    if (c.getValue() === 0 && !c.visited)
                        stack.push(c);
                    if (!c.visited && !c.flagged) {
                        cellsLeft--;
                    }
                    c.visited = !c.flagged;

                }
            }
            if (stack.length > 0) {
                clearCell(stack.pop());
            }
        }
    }
}

document.oncontextmenu = function(event){
  event.preventDefault();
};

function onMousePress() {
    var col = floor(mouseX / cellWidth);
    var row = floor(mouseY / cellWidth);
    var cell = grid.get(row, col);
    if (!cell)
        return;
    if (mouseButton == 'left') {
        clearCell(cell);
    } else if (mouseButton == 'right') {
        if (!cell.visited) {
            if (!cell.flagged && flags === 0) {
                return;
            }
            cell.flagged = !cell.flagged;
            if (cell.flagged) {
                cellsLeft--;
                flags--;
            } else {
                cellsLeft++;
                flags++;
            }
        }
    }


}

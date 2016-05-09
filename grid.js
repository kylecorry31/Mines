function CellGrid(rows, columns, gridWidth) {
    this.grid = [];
    this.columns = columns;
    this.rows = rows;
    this.gridWidth = gridWidth;

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            this.grid.push(new Cell(i, j, gridWidth));
        }
    }
}

CellGrid.prototype.numColumns = function() {
    return this.columns;
};

CellGrid.prototype.numRows = function() {
    return this.rows;
};

CellGrid.prototype.get = function(row, column) {
    if (row < 0 || column < 0 || row > this.numRows() - 1 || column > this.numColumns() - 1) {
        return undefined;
    }
    return this.grid[column + row * this.numRows()];
};

CellGrid.prototype.set = function(row, column, value) {
    this.grid[column + row * this.numColumns()] = value;
};

CellGrid.prototype.getTotalCells = function() {
    return this.numColumns() * this.numRows();
};

CellGrid.prototype.spawnMines = function(mines) {
    for (var i = 0; i < mines; i++) {
        var randMine = floor(random(this.grid.length));
        var invalidPos = true;
        while (invalidPos) {
            if (!this.grid[randMine].containsMine()) {
                this.grid[randMine].setValue(MINE);
                invalidPos = false;
            } else {
                randMine = floor(random(this.grid.length));
            }
        }
    }
    this.fillHints();
};

CellGrid.prototype.fillHints = function() {
    for (var i = 0; i < this.numRows(); i++) {
        for (var j = 0; j < this.numColumns(); j++) {
            var total = 0;
            if (this.get(i, j).containsMine())
                continue;
            for (var row = -1; row <= 1; row++) {
                for (var col = -1; col <= 1; col++) {
                    if (row === 0 && col === 0)
                        continue;
                    var cell = this.get(i + row, j + col);
                    if (cell && cell.containsMine()) {
                        total++;
                    }
                }
            }
            this.get(i, j).setValue(total);
        }
    }
};

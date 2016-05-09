var MINE = -1;

function Cell(row, column, size) {
    this.size = size;
    this.row = row;
    this.column = column;
    this.visited = false;
    this.value = 0;
    this.flagged = false;
}

Cell.prototype.containsMine = function() {
    return this.value === MINE;
};

Cell.prototype.setValue = function(value) {
    this.value = value;
};

Cell.prototype.getValue = function() {
    return this.value;
};

Cell.prototype.getSize = function() {
    return this.size;
};

Cell.prototype.getRow = function() {
    return this.row;
};

Cell.prototype.getCol = function() {
    return this.column;
};

Cell.prototype.getX = function() {
    return this.getSize() * this.getCol();
};

Cell.prototype.getY = function() {
    return this.getSize() * this.getRow();
};

Cell.prototype.draw = function() {
    noFill();
    stroke(0);
    if (this.containsMine()) {
        fill(0);
    } else if (this.getValue() > 0) {
        fill(0);
        text(this.getValue(), this.getX() + this.getSize() / 2, this.getY() + this.getSize() / 2);
        noFill();
    }
    if (!this.visited) {
        fill(127);
    } else if (this.flagged) {
        fill(0, 255, 0);
    }
    rect(this.getX(), this.getY(), this.getSize(), this.getSize());
};

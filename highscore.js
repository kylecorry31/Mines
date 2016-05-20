function HighScore() {
    this.key = 'highscore';
    this.highscore = parseInt(localStorage.getItem(this.key), 10);
    if (this.highscore === null) {
        this.highscore = 0;
        localStorage.setItem(this.key, 0);
    }
}


HighScore.prototype.isHighScore = function(score, greater) {
    return greater === (this.getHighScore() < score);
};

HighScore.prototype.getHighScore = function() {
    return this.highscore;
};

HighScore.prototype.setHighScore = function(score) {
    this.highscore = score;
    localStorage.setItem(this.key, score);
};

HighScore.prototype.setScore = function(score, greater) {
    var highscore = this.isHighScore(score, greater);
    if (highscore) {
        this.setHighScore(score);
    }
    return highscore;
};

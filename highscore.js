function HighScore() {
    this.key = 'highscore';
    this.highscore = localStorage.getItem(this.key);
    if (this.highscore === null) {
        localStorage.setItem(this.key, undefined);
    } else {
        this.highscore = parseInt(this.highscore, 10);
    }
}


HighScore.prototype.isHighScore = function(score, greater) {
    if (this.highscore === null) {
        return true;
    }
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

var electron = require('electron');

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 604,
        useContentSize: true,
        resizable: false
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});


function Repo(location) {
    this.location = location;
}

Repo.prototype.commit = function(message) {

};

Repo.prototype.add = function(files) {

};

Repo.prototype.addAll = function() {

};

Repo.prototype.pull = function() {

};

Repo.prototype.push = function() {

};

Repo.prototype.checkout = function(branch) {

};

Repo.prototype.branch = function(branch) {

};

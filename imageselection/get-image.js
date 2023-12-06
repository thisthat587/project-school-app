const { app, BrowserWindow} = require('electron');


function createWindow() {
    const Window = new BrowserWindow({
        width: 300,
        height:300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        },
    });
    Window.loadFile('get-image.html');
}
app.whenReady().then(createWindow)





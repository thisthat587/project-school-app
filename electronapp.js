const {app, BrowserWindow}=require('electron');

function createWindow(){
    const window= new BrowserWindow({
        width:375,
        height:667,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false,
            webSecurity:false
        },
    });
    window.loadFile("enquiryform.html");
}

app.whenReady().then(()=>{
    createWindow();
});
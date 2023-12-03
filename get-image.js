// const { app, BrowserWindow, screen } = require('electron');


// function createWindow(htmlfile, w, h) {
//     const Window = new BrowserWindow({
//         width: w,
//         heigth: h,
//         webPreferences: {
//             nodeIntegration: true,
//             contextIsolation: false,
//             webSecurity: true
//         },
//     });
//     Window.loadFile(htmlfile)
// }

// app.whenReady().then(() => {
//     createWindow("get-image.html",1000,2160)
// })
 
function getdata(data){
    console.log(data);
}

module.exports=getdata;
// export {getdata};
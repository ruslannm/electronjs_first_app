const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const os = require('os');
const fs = require('fs');
const fileName = "Создано при помощи Electron.txt";
const osName = `${os.platform()} ${os.release()}`;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
  // win.webContents.openDevTools();

  ipcMain.on("html", (event, _) => {
    try    
      {
        fs.writeFileSync(fileName, osName, 'utf-8');
      }
      catch(e) 
      {
          const messageBoxOptions = {
            type: "error",
            title: "Error in Main process",
            message: `Can't write to file "${fileName}"`
        };
        dialog.showMessageBoxSync(messageBoxOptions);
        app.exit(1);
      }
  })
};

app.whenReady().then(createWindow);

const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 50,
    autoHideMenuBar: true
  });
  
  win.loadFile(path.join(__dirname, 'index.html'));

  win.on('close', () => {
    console.log('Trying to kill port 8082');
    exec('kill-port --port 8082');
  });
};

app.whenReady().then(() => {
  createWindow();

  exec('npm run pre-electron');
  exec('lt -p 8082 -s ncex');
});

app.on('window-all-closed', async() => {
  if (process.platform !== 'darwin') app.quit();
});
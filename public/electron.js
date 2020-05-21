const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const contextMenu = require('electron-context-menu');
const ipc = require('electron').ipcMain;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow(
    {
      width: 900, height: 680, 
      frame: false, 
      alwaysOnTop: true, 
      webPreferences: {
        nodeIntegration: true
      }
    });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    // BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    // mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => mainWindow = null);
}

contextMenu({
  prepend: (params, browserWindow) => [
    {
    label: 'Breath-In Duration: 5s',
    click: (menuItem, browserWindow, event) => {
      mainWindow.webContents.send('message', {duration: 5000})
    }
    },
    {
      label: 'Breath-In Duration: 10s',
      click: (menuItem, browserWindow, event) => {
        mainWindow.webContents.send('message', { duration: 10000 })
      }
    },
    {
      label: 'Breath-In Duration: 15s',
      click: (menuItem, browserWindow, event) => {
        console.log('Hell world');
        mainWindow.webContents.send('message', { duration: 15000 })
      }
    },
// ================= Delay =================
    {
      label: 'Breath-In Delay: 0s',
      click: (menuItem, browserWindow, event) => {
        mainWindow.webContents.send('message', { delay: 0 })
      }
    },
    {
      label: 'Breath-In Delay: 5s',
      click: (menuItem, browserWindow, event) => {
        mainWindow.webContents.send('message', { delay: 5000 })
      }
    },
    {
      label: 'Breath-In Delay: 10s',
      click: (menuItem, browserWindow, event) => {
        mainWindow.webContents.send('message', { delay: 10000 })
      }
    },
    {
      label: 'Breath-In Delay: 15s',
      click: (menuItem, browserWindow, event) => {
        mainWindow.webContents.send('message', { delay: 15000 })
      }
    }

  ]
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
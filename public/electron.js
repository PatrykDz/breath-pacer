const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const contextMenu = require('electron-context-menu');

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680, frame: false, alwaysOnTop: true});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    // BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    // mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => mainWindow = null);
}

contextMenu({
	prepend: (params, browserWindow) => [{
    label: 'Breath-In Duration: 10s',
    click: (menuItem, browserWindow, event) => {
      console.log('Hello world');
    }
		// Only show it when right-clicking images
		// visible: params.mediaType === 'image'
	}]
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
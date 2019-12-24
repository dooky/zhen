import fs from 'fs';
import path from 'path';
import { BrowserWindow, ipcMain as ipc } from 'electron';
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';

export default class MainWindow {
  window: BrowserWindow | null;

  constructor() {
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      this.window.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
      if (!process.env.IS_TEST) {
        this.window.webContents.openDevTools()
      }
    } else {
      createProtocol('app')
      this.window.loadURL('app://./index.html')
    }

    this.window.on('closed', () => {
      this.window = null
    });

    ipc.on('load', () => {
      let filename = path.resolve(__dirname, '..', 'public', 'dictionary.json')
      fs.readFile(filename, 'utf-8', (err, data) => {
        let dictionary = JSON.parse(data);
        if (this.window != null) {
          this.window.webContents.send('load', dictionary);
        }
      });
    });
  }
}

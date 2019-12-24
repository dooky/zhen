'use strict'

import MainWindow from './mainwindow';
import { app, protocol } from 'electron';
const isDevelopment = process.env.NODE_ENV !== 'production';

let win: MainWindow | null;

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: { secure: true, standard: true }
  }
])

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    win = new MainWindow();
  }
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {

  }
  win = new MainWindow();
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

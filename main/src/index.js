const { app, BrowserWindow, shell, ipcMain, Menu } = require('electron')
const Triology = require('trilogy')
const { fork } = require('child_process')

const path = require('path')
const isDev = require('electron-is-dev')

console.log(isDev ? 'development env' : 'production env')

const dbProcess = fork('./src/db.js')

const { mpc } = require('./mpc')

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: '#F7F7F7',
    height: 860,
    width: 1280,
    frame: false,
    transparent: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      // <--- (1) Additional preferences
      nodeIntegration: true,
      preload: __dirname + '/preload.js', // <--- (2) Preload script
      webSecurity: !isDev
    }
  })

  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS
    } = require('electron-devtools-installer')

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`)
      })
      .catch(err => {
        console.log('An error occurred: ', err)
      })

    installExtension(REDUX_DEVTOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`)
      })
      .catch(err => {
        console.log('An error occurred: ', err)
      })
  }

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  ) // <--- (3) Loading react

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

const generateMenu = () => {
  const template = [
    {
      label: 'File',
      submenu: [{ role: 'about' }, { role: 'quit' }]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [{ role: 'minimize' }, { role: 'close' }]
    },
    {
      role: 'help',
      submenu: [
        {
          click () {
            require('electron').shell.openExternal('https://getstream.io/winds')
          },
          label: 'Learn More'
        },
        {
          click () {
            require('electron').shell.openExternal(
              'https://github.com/GetStream/Winds/issues'
            )
          },
          label: 'File Issue on GitHub'
        }
      ]
    }
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

app.on('ready', () => {
  createWindow()
  generateMenu()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    db.close().then(() => app.quit())
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('open-child-window', (event, arg) => {
  let child = new BrowserWindow({
    parent: mainWindow,
    modal: false,
    show: false
  })
  child.loadURL(
    isDev
      ? `http://localhost:3000#${arg}`
      : URL.format({
        pathName: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true,
        hash: arg
      })
  )
  child.once('ready-to-show', () => {
    child.show()
  })
})

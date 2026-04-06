const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const http = require('http');
const fs = require('fs');

let server;

function startServer(callback) {
    server = http.createServer((req, res) => {
        let reqPath = req.url === '/' ? 'index.html' : req.url;
        // prevent directory traversal
        reqPath = reqPath.replace(/\.\./g, '');
        let filePath = path.join(__dirname, 'ui', reqPath);
        let extname = path.extname(filePath);
        let contentType = 'text/html';
        switch (extname) {
            case '.js': contentType = 'text/javascript'; break;
            case '.css': contentType = 'text/css'; break;
            case '.png': contentType = 'image/png'; break;
        }

        fs.readFile(filePath, (error, content) => {
            if (error) {
                res.writeHead(404);
                res.end('Not found');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    });

    server.listen(0, '127.0.0.1', () => {
        callback(server.address().port);
    });
}

function createWindow(port) {
    const mainWindow = new BrowserWindow({
        width: 400,
        height: 250,
        frame: false, // Frameless UI
        alwaysOnTop: true, // Float above everything
        transparent: false, // Windows breaks resizing if transparent: true
        backgroundColor: '#0a0a0c', // Matches CSS background
        fullscreen: false, // Explicitly prevent launching in fullscreen
        fullscreenable: false, // Disallow going fullscreen which sometimes triggers automatically
        maximizable: false, // Block Windows from breaking startup!
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true
        }
    });

    // Load our beautiful UI from local server
    mainWindow.loadURL(`http://127.0.0.1:${port}/`);

    // Ensure we don't add multiple listeners
    ipcMain.removeAllListeners('close-app');
    ipcMain.removeAllListeners('minimize-app');
    ipcMain.removeAllListeners('maximize-app');
    ipcMain.removeAllListeners('toggle-float');

    // Listen for window controls from javascript
    ipcMain.on('close-app', () => {
        app.quit();
    });

    ipcMain.on('minimize-app', (event) => {
        const win = BrowserWindow.fromWebContents(event.sender);
        if (win) win.minimize();
    });

    ipcMain.on('maximize-app', (event) => {
        const win = BrowserWindow.fromWebContents(event.sender);
        if (win) {
            const { screen } = require('electron');
            const display = screen.getDisplayNearestPoint(win.getBounds());
            
            if (win.getBounds().width >= display.workArea.width - 20) {
                win.setBounds({ width: 400, height: 250 });
                win.center();
                event.sender.send('window-maximized', false);
            } else {
                win.setBounds(display.workArea);
                event.sender.send('window-maximized', true);
            }
        }
    });

    ipcMain.on('toggle-float', (event) => {
        const win = BrowserWindow.fromWebContents(event.sender);
        if (win) {
            const isAlwaysOnTop = win.isAlwaysOnTop();
            if (isAlwaysOnTop) {
                win.setAlwaysOnTop(false);
                event.sender.send('float-status', false);
            } else {
                win.setAlwaysOnTop(true, 'screen-saver');
                event.sender.send('float-status', true);
            }
        }
    });
}

app.whenReady().then(() => {
    startServer((port) => {
        createWindow(port);

        app.on('activate', function () {
            if (BrowserWindow.getAllWindows().length === 0) createWindow(port);
        });
    });
});

app.on('window-all-closed', function () {
    if (server) server.close();
    if (process.platform !== 'darwin') app.quit();
});

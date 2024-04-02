console.log(__dirname);

const { app, BrowserWindow, globalShortcut, dialog, clipboard, ipcMain } = require('electron');
const { PythonShell } = require('python-shell');
const path = require('path');
const sound = require('sound-play')

let mainWindow;

function runPythonScript(scriptPath) {
    console.log('Running Python script:', scriptPath); 

    PythonShell.run(scriptPath, null, (err, results) => {
        if (err) {
            console.error('Error executing Python script:', err);
            return;
        }
        console.log('Python script finished:', results);
    });
}

function createMenu(mainWindow) {
    const options = [ ...Array.from({ length: 14 }, (_, i) => `op${i + 5}`)];
    dialog.showMessageBox(mainWindow, {
        type: 'info',
        buttons: options,
        message: 'Choose an op version:'
    }).then((result) => {
        if (!result.canceled) {
            const selectedOption = options[result.response];
            mainWindow.loadURL(`https://kour.io/${selectedOption}`);
        }
    }).catch((err) => {
        console.error('Error creating menu:', err);
    });
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        icon: 'icon.ico',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            enableSmoothScrolling: true,
            hardwareAcceleration: true,
            preload: path.join(app.getAppPath(), 'preload.js'),
            additionalArguments: ['--disable-software-rasterizer', '--ignore-gpu-blacklist', '--disable-gpu-vsync', '--enable-gpu-rasterization']
        }
    });

    mainWindow.setTitle("kour.io - electron");
    mainWindow.loadURL('https://kour.io');
    mainWindow.removeMenu();

    mainWindow.once('ready-to-show', () => {    
        const audioFile = path.join(__dirname, '..', 'audio', 'startup.mp3');
        sound.play(audioFile, 0.025)
    });
    
    mainWindow.webContents.on('dom-ready', () => {
        mainWindow.webContents.executeJavaScript(`
            const cmpPersistentLink = document.getElementById('cmpPersistentLink');
            if (cmpPersistentLink) {
                cmpPersistentLink.style.display = 'none';
            }
        `).catch(error => {
            console.error('Error hiding cmpPersistentLink:', error);
        });
    });

    globalShortcut.register('F8', () => {
        createMenu(mainWindow);
    });
    globalShortcut.register('F11', () => {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
    });
    globalShortcut.register('F5', () => {
        mainWindow.reload();
    });
    globalShortcut.register('F6', () => {
        const clipboardText = clipboard.readText();

        if (clipboardText.startsWith('https://kour.io')) {
            mainWindow.loadURL(clipboardText);
        }
    });
    globalShortcut.register('F7', () => {
        mainWindow.loadURL('https://kour.io');
    });
    globalShortcut.register('CommandOrControl+Shift+I', () => {
        mainWindow.webContents.openDevTools();
    });

    mainWindow.on('closed', () => {
        globalShortcut.unregisterAll();
    });
    mainWindow.webContents.on('crashed', () => {
        console.error('The web content has crashed.');
        mainWindow.reload();
    });
    mainWindow.on('unresponsive', () => {
        console.error('The window has become unresponsive.');
    });

mainWindow.webContents.setMaxListeners(500); 

    mainWindow.webContents.session.webRequest.onBeforeRequest((details, callback) => {
        if (details.url.includes('background.webp') || details.url.includes('background2.webp')) {
            callback({ redirectURL: getRandomImageUrl() });
        } else if (details.url === 'https://kour.io/kour-title.webp') {
            callback({ redirectURL: 'https://i.imgur.com/fKt05OY.png' });
        } else {
            callback({});
        }
    });

    const scriptPath = path.join(__dirname, '..', 'scripts', 'yawspeed.py');
    
    runPythonScript(scriptPath);
};

const MAX_HISTORY_LENGTH = 15;
let imageHistory = [];

function getRandomImageUrl() {
    const imageUrls = [
        'https://i.imgur.com/KIq389u.gif',
        'https://i.imgur.com/21Vvlbd.gif',
        'https://i.imgur.com/tZRtrzw.png',
        'https://64.media.tumblr.com/3862509863edc27f50c3d69e0ccd0da2/e913a89c98e2cce2-cf/s540x810/cfc6071743c7c8c9b511e29aa7156bfc260565f7.gif',
        'https://wallpapers.com/images/hd/faze-rug-q99q3iiuunspy2u6.jpg',
        'https://images3.alphacoders.com/124/124987.jpg',
        'https://i.imgur.com/H5q6R8A.gif',
        'https://i.imgur.com/ikteVGO.gif',
        'https://i.imgur.com/nE4ZFYY.jpeg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Blue_Screen_of_Death.png/800px-Blue_Screen_of_Death.png',
        'https://i.imgur.com/cmVNSNN.jpeg',
        'https://i.pinimg.com/600x315/24/47/e2/2447e2760fbe56dc160830aa008511b7.jpg',
        'https://wallpapercave.com/wp/wp5271794.jpg',
        'https://i.imgur.com/yMuB3fl.jpeg',
        'https://i.pinimg.com/564x/da/5d/a2/da5da23677ed14e331ccba375e519eff.jpg',
        'https://i.imgur.com/XyMp9PT.png',
        'https://logodix.com/logo/29740.png',
        'https://wallpapers.com/images/featured/cinnamoroll-laptop-4bjmy64xlmau32vy.webp',
        'https://e0.pxfuel.com/wallpapers/107/989/desktop-wallpaper-laptop-background-ideas-my-melody-sanrio-hello-kitty-cute-hello-kitty-laptop.jpg',
        'https://images3.alphacoders.com/133/1339216.png',
        'https://wallpapers.com/images/featured/kuromi-background-uourpdo4iz8zhtgp.jpg',
        'https://i.imgur.com/Q6feoxy.png',
        'https://64.media.tumblr.com/7367f4dd5eea259c2ca9fd967084a3ea/07bc9edb2ffd54d3-26/s1280x1920/b24ed94143bc58db5d31950dd0d9012876757bca.jpg',
        'https://i.imgur.com/pzaNCK9.png',
        'https://m.ncontentmobile.com/wordpress/wp-content/uploads/2017/08/Monkichi-1068x661.jpg',
        'https://static.wikia.nocookie.net/callofduty/images/4/49/Highrise-promo.jpg',
        'https://static.wikia.nocookie.net/callofduty/images/2/29/Favela_Map_MW2.jpg',
        'https://static.wikia.nocookie.net/callofduty/images/8/88/Carrier_loadscreen_BOII.png',
        'https://i.imgur.com/eYJ0V8B.jpeg',
        'https://i.pinimg.com/originals/53/73/91/537391efba4fef0628870aeb9e30dc62.jpg',
        'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2021/03/pjimage-2021-03-04T165630.934.jpg',
        'https://i.ytimg.com/vi/PIKYirQ1ZGc/maxresdefault.jpg',
        'https://static.wikia.nocookie.net/callofduty/images/1/1e/Studio_loadscreen_BOII.png',
        'https://callofdutymaps.com/wp-content/uploads/nuketown2.jpg',
        'https://www.giantbomb.com/a/uploads/original/0/8272/1776958-scrapyard.jpg',
        'https://static.wikia.nocookie.net/callofduty/images/0/04/Detour_loadscreen_BOII.png',
        'https://static.wikia.nocookie.net/callofduty/images/8/8a/Loadscreen_mp_quarry.jpg',
        'https://static.wikia.nocookie.net/callofduty/images/3/3a/Rundown-prev.jpg',
        'https://static.wikia.nocookie.net/callofduty/images/8/83/Afghan_loading_screen_MW2.png',
        'https://static.wikia.nocookie.net/callofduty/images/9/9f/Karachi-prev.jpg',
        'https://www.csgowallpapers.com/assets/images/original/csgowallpaper_13460935092_1621945725_765508642300.jpg',
        'https://i.imgur.com/I79PHqD.png',
    ];
    const availableImages = imageUrls.filter(url => !imageHistory.includes(url));

    if (availableImages.length === 0) {
        imageHistory = [];
        return getRandomImageUrl(); 
    }

    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImageUrl = availableImages[randomIndex];

    imageHistory.push(selectedImageUrl);

    if (imageHistory.length > MAX_HISTORY_LENGTH) {
        imageHistory.shift(); 
    }
    return selectedImageUrl;
}

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
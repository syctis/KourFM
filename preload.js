const { contextBridge, ipcRenderer } = require('electron');

const yourLoadingTexts = [
    "Joining FaZe Clan",
"Love yourself before Loving others",
"Its okay to try Again tomorrow",
"Great things Take time",
"Remember, Kouring is better than whoring",
"Hello Kitty",
"Bitcoin Miner Loading...",
"hey, you are finally awake",
"FIND JOY WHEREVERYOU ARE",
"Watching Ice Teamtage 14",
"Edging the Bug",
"Bugging the Edge", "Smoothment",
"Climbing Crane on Highrise",
"720 Fakie",
"Make Today a Happy Day",
"360 Temperrrshot",
"1080 Tittynac",
"leanchicken",
"lurk & jerk",
"HOT SINGLES IN YOUR AREA",
"banging the boat on carrier",
"Dont knife the barrel :)",
"Catflip to Glide",
"Clearing out to Last",
"Trickshot Last Nice",
"single and ready to mingle",
"Grandmas looking for new Love",
"1v1ing on Rust Quickscope only",
"No reload, No clip",
"WHERE WAS HE?!",
"Fastoh reacting to FaZe ILLCAMS Episode",
"Over the Shoulder",
"Initiating Shield Bounce",
"Currently Hitting a 2 Piece",
"Stop n Stares are NOT Trickshots",
"Hitting a closer",
"Hitting an opener",
"de_nuke",
"ONLY KOUR FM BANGERS",
"Nuke Radio",
"KourFM",
"abolish the bourgeoisie",
"Please dont add shotgun jumping",
"Drop AWP men",
"downloading dropout-exploits.zip",
"GREEN GREEN WHATS YOUR PROBLEM MAN ME SAID ALONE RAMP",
"asdfghbjnkml,swedrft",
];

contextBridge.exposeInMainWorld('electron', {
    updateLoadingText: () => {
        ipcRenderer.send('updateLoadingText', yourLoadingTexts[Math.floor(Math.random() * yourLoadingTexts.length)]);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const unityLoadingBar = document.getElementById('unity-loading-bar');
    const unityLoadingBarFast = document.getElementById('unity-loading-bar-fast');
    
    if (unityLoadingBar) {
        unityLoadingBar.style.position = 'absolute';
        unityLoadingBar.style.bottom = '5vh';
        unityLoadingBar.style.left = '5vh';
    }
    if (unityLoadingBarFast) {
        unityLoadingBarFast.style.position = 'absolute';
        unityLoadingBarFast.style.bottom = '5vh';
        unityLoadingBarFast.style.left = '5vh';
    }
});   

window.onload = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.cdnfonts.com/css/impact';
    document.head.appendChild(link);

    document.body.style.fontFamily = 'Impact, sans-serif'; 
};

window.addEventListener('DOMContentLoaded', () => {
    const loadingTxtElement = document.getElementById('loadingTxt');
    const loadingTxtMinimalElement = document.getElementById('loadingTxtMinimal');

    if (loadingTxtElement) {
        loadingTxtElement.style.position = 'fixed'; 
        loadingTxtElement.style.bottom = '6vh'; 
        loadingTxtElement.style.left = '25vh'; 
        loadingTxtElement.style.transform = 'unset';
        loadingTxtElement.style.top = 'unset'; 
        loadingTxtElement.style.userSelect = 'none';
        loadingTxtElement.style.textShadow = '-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black';
        loadingTxtElement.style.overflow = 'unset'; 
        loadingTxtElement.style.textOverflow = 'unset'; 
        loadingTxtElement.style.whiteSpace = 'unset'; 
        loadingTxtElement.style.color = 'white'; 
        loadingTxtElement.style.fontFamily = 'Impact, sans-serif'; 
        loadingTxtElement.style.fontSize = '1.5em'; 
    }

    if (loadingTxtMinimalElement) {
        loadingTxtMinimalElement.style.display = 'none';
    }

    const updateInterval = setInterval(() => {
        ipcRenderer.send('updateLoadingText', yourLoadingTexts[Math.floor(Math.random() * yourLoadingTexts.length)]);
    }, 50);
    
    window.addEventListener('unload', () => {
        clearInterval(updateInterval);
    });
});   

window.addEventListener('DOMContentLoaded', () => {
    const kourTitleImg = document.querySelector('img[src="https://kour.io/kour-title.webp"]');
    if (kourTitleImg) {
        kourTitleImg.src = 'https://i.imgur.com/fKt05OY.png';
        kourTitleImg.style.position = 'fixed';
        kourTitleImg.style.top = '-1.5vh';
        kourTitleImg.style.left = '45%';
    }
});
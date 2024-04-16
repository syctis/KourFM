const { contextBridge, ipcRenderer } = require('electron');

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
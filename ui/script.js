// DOM Elements
const inputScreen = document.getElementById('input-screen');
const videoScreen = document.getElementById('video-screen');

const ytPlayer = document.getElementById('yt-player');
const webPlayer = document.getElementById('web-player');
const localPlayer = document.getElementById('local-player');

const backBtn = document.getElementById('back-btn');
const floatBtn = document.getElementById('float-btn');
const minimizeBtn = document.getElementById('minimize-btn');
const maximizeBtn = document.getElementById('maximize-btn');
const closeBtn = document.getElementById('close-btn');

const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.panel');

const youtubeLinkInput = document.getElementById('youtube-link');
const playYtBtn = document.getElementById('play-yt-btn');
const errorMsg = document.getElementById('error-msg');

const fileDropArea = document.getElementById('file-drop-area');
const localFileInput = document.getElementById('local-file-input');

// Electron IPC
const { ipcRenderer } = require('electron');

// Window Controls
closeBtn.addEventListener('click', () => ipcRenderer.send('close-app'));
minimizeBtn.addEventListener('click', () => ipcRenderer.send('minimize-app'));
maximizeBtn.addEventListener('click', () => ipcRenderer.send('maximize-app'));
floatBtn.addEventListener('click', () => ipcRenderer.send('toggle-float'));

ipcRenderer.on('float-status', (event, isFloating) => {
    if (isFloating) {
        floatBtn.innerHTML = '<i class="ph ph-push-pin"></i>';
        floatBtn.classList.add('active-float');
    } else {
        floatBtn.innerHTML = '<i class="ph ph-push-pin-slash"></i>';
        floatBtn.classList.remove('active-float');
    }
});

ipcRenderer.on('window-maximized', (event, isMaximized) => {
    if (isMaximized) {
        maximizeBtn.innerHTML = '<i class="ph ph-copy"></i>';
    } else {
        maximizeBtn.innerHTML = '<i class="ph ph-square"></i>';
    }
});

backBtn.addEventListener('click', () => {
    // Reset players
    ytPlayer.src = '';
    ytPlayer.classList.add('hidden');
    
    if (webPlayer) {
        webPlayer.src = 'about:blank';
        webPlayer.classList.add('hidden');
    }
    
    localPlayer.pause();
    localPlayer.removeAttribute('src'); 
    localPlayer.load();
    localPlayer.classList.add('hidden');
    
    // UI swap
    videoScreen.classList.add('hidden');
    inputScreen.classList.remove('hidden');
    backBtn.classList.add('hidden');
});

// Tab Switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(`${btn.dataset.target}-panel`).classList.add('active');
    });
});

// YouTube Logic
function extractVideoId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    if (url.includes("/shorts/")) return url.split("/shorts/")[1].split(/[#&?]/)[0];
    return (match && match[7].length === 11) ? match[7] : false;
}

function playYouTube() {
    let url = youtubeLinkInput.value.trim();
    if (!url) return;
    
    // Add protocol if missing
    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }
    
    let isEmbed = false;
    let finalUrl = url;
    errorMsg.classList.add('hidden');
    
    const ytVideoId = extractVideoId(url);
    if (ytVideoId) {
        finalUrl = `https://www.youtube-nocookie.com/embed/${ytVideoId}?autoplay=1&rel=0&modestbranding=1`;
        isEmbed = true;
    } else if (url.includes('twitch.tv/')) {
        // extract channel or video
        const match = url.match(/twitch\.tv\/([^/?]+)/);
        if (match) {
            finalUrl = `https://player.twitch.tv/?channel=${match[1]}&parent=127.0.0.1`;
            isEmbed = true;
        }
    } else if (url.includes('vimeo.com/')) {
        const match = url.match(/vimeo\.com\/(\d+)/);
        if (match) {
            finalUrl = `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
            isEmbed = true;
        }
    }

    if (isEmbed) {
        if (webPlayer) {
            webPlayer.src = 'about:blank';
            webPlayer.classList.add('hidden');
        }
        ytPlayer.src = finalUrl;
        ytPlayer.classList.remove('hidden');
    } else {
        ytPlayer.src = '';
        ytPlayer.classList.add('hidden');
        if (webPlayer) {
            webPlayer.src = finalUrl;
            webPlayer.classList.remove('hidden');
        }
    }
    
    inputScreen.classList.add('hidden');
    videoScreen.classList.remove('hidden');
    backBtn.classList.remove('hidden');
}

playYtBtn.addEventListener('click', playYouTube);
youtubeLinkInput.addEventListener('keypress', e => e.key === 'Enter' && playYouTube());

// Local File Logic
fileDropArea.addEventListener('click', () => localFileInput.click());

localFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        localPlayer.src = fileURL;
        localPlayer.classList.remove('hidden');
        
        inputScreen.classList.add('hidden');
        videoScreen.classList.remove('hidden');
        backBtn.classList.remove('hidden');
    }
    // reset input
    e.target.value = '';
});

// Prevent draggable region from hijacking buttons
document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('mousedown', e => e.stopPropagation());
});

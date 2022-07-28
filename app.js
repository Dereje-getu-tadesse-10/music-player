import data from './data.js';

const containerAudio = document.querySelector('.image-container');
const cover = document.querySelector('.cover');
const shuffle = document.querySelector('.shuffle-song');
const previous = document.querySelector('.previous-song');
const play = document.querySelector('.play-song');
const pause = document.querySelector('.fa-play');
const next = document.querySelector('.next-song');
const repeat = document.querySelector('.repeat-song');
const titleSong = document.querySelector('.title-song');
const artistName = document.querySelector('.artist-name');
const progressLine = document.querySelector('.first-line');
const progress = document.querySelector('.second-line');


let currentSong = 0;
let repeatSong = false;
cover.src = getAttribute("src", getSongData()[currentSong].cover);
const audio = document.createElement('audio');
audio.src = getSongData()[currentSong].audio;
containerAudio.appendChild(audio);


function fisrtSong() {
    titleSong.textContent = getSongData()[currentSong].title;
    artistName.textContent = getSongData()[currentSong].artist;
    cover.src = getAttribute("src", getSongData()[currentSong].cover);
    audio.src = getSongData()[currentSong].audio;
}

function playSong(){
    if(audio.paused) {
        audio.play();
        cover.style.scale = "1";
        pause.classList.remove('fa-play');
        pause.classList.add('fa-pause');
    } else {
        audio.pause();
        cover.style.scale = "0.8";
        pause.classList.remove('fa-pause');
        pause.classList.add('fa-play');
    }
}

function nextSong() {
    currentSong++;
    if(currentSong >= getSongData().length) {
        currentSong = 0;
    }
    songContent(); 
}

function previousSong() {
    currentSong--;
    if(currentSong < 0) {
        currentSong = getSongData().length - 1;
    }
    songContent();
}

let timer = setInterval(() => {
    let currentTime = audio.currentTime;
    let totalTime = audio.duration;
    let progressTime = (currentTime / totalTime) * 100;
    progress.style.width = `${progressTime}%`;
    if(currentTime === totalTime) {
        nextSong();
        playSong();
    }
})

progressLine.addEventListener('click', (e) => {
    let width = e.offsetX;
    let totalWidth = progressLine.offsetWidth;
    let progressTime = (width / totalWidth) * 100;
    audio.currentTime = (audio.duration * progressTime) / 100;
})

function shuffleSongI() {
    currentSong = Math.floor(Math.random() * getSongData().length);
    songContent();
}

function restartSong() {
    if(!repeatSong){
        audio.currentTime = 0;
        audio.loop = true;
    } else {
        audio.loop = false;
    }
}

function getSongData() {
    let songData = data.map(item => {
        return {
            title: item.name,
            artist: item.artist,
            audio: item.audio,
            cover: item.cover
        }
    })
    return songData;
}

function getAttribute(attribute, value) {
    return attribute, value;
}

function songContent(){
    titleSong.textContent = getSongData()[currentSong].title;
    artistName.textContent = getSongData()[currentSong].artist;
    cover.src = getAttribute("src", getSongData()[currentSong].cover);
    audio.src = getSongData()[currentSong].audio;
    playSong();
}

play.addEventListener('click', playSong);
next.addEventListener('click', nextSong)
previous.addEventListener('click', previousSong)
repeat.addEventListener('click', restartSong)
shuffle.addEventListener('click', shuffleSongI)
fisrtSong();

// button click animation
const allButtons = Array.from(document.querySelectorAll('.button'));
allButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.classList.contains('clicked')){
            button.classList.remove('clicked');
        } else {
            button.classList.add('clicked');
        }
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 500);
        
    })
})
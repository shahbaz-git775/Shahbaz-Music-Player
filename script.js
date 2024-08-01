const songs = [
    {
        title: "Headlights",
        artist: "Shahbaz Aziz",
        src: "1.unknown",
        cover: "1.jpeg"
    },
    {
        title: "Gigachad",
        artist: "Shahbaz Aziz",
       src: "2.unknown",
        cover: "3.jpg"
    },
    {
        title: "The Avengers",
        artist: "Shahbaz Aziz",
       src: "3.unknown",
        cover: "2.jpeg"
    }
];

let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex].src);
const titleElement = document.getElementById('title');
const artistElement = document.getElementById('artist');
const coverElement = document.getElementById('cover');
const playButton = document.getElementById('play');
const playIcon = document.getElementById('play-icon');
const progressBar = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const trackNumberElement = document.getElementById('track-number');
let isPlaying = false;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsPart = Math.floor(seconds % 60);
    return `${minutes}:${secondsPart < 10 ? '0' : ''}${secondsPart}`;
}

function loadSong(song) {
    titleElement.textContent = song.title;
    artistElement.textContent = `by ${song.artist}`;
    coverElement.src = song.cover;
    audio.src = song.src;
    audio.load();
    trackNumberElement.textContent = `Playing music ${currentSongIndex + 1} of ${songs.length}`;
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playIcon.src = "https://img.icons8.com/ios-filled/50/000000/pause.png";
        isPlaying = true;
    } else {
        audio.pause();
        playIcon.src = "https://img.icons8.com/ios-filled/50/000000/play.png";
        isPlaying = false;
    }
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (isPlaying) {
        audio.play();
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (isPlaying) {
        audio.play();
    }
}

audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeElement.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
    durationElement.textContent = formatTime(audio.duration);
});

loadSong(songs[currentSongIndex]);
Note
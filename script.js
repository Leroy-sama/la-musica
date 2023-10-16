const music = document.querySelector('audio')
const previousBtn = document.querySelector(".fa-backward");
const playBtn = document.querySelector(".fa-play");
const nextBtn = document.querySelector(".fa-forward");

let isPlaying = false

const playSong = () => {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()
}

const pauseSong = () => {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong()
    }   else {
        playSong()
    }
}) 
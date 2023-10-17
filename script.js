const image = document.querySelector('img')
const title = document.querySelector('.song-title')
const artist = document.querySelector('.song-artist')
const music = document.querySelector('audio')
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector('.progress')
const currentTimeElement = document.querySelector(".current-time");
const songDuration = document.querySelector(".duration");
const previousBtn = document.querySelector(".fa-backward");
const playBtn = document.querySelector(".fa-play");
const nextBtn = document.querySelector(".fa-forward");

// Music
const songs = [
    {
        title: 'a lot',
        artist: '21 Savage ft JCole'
    },
    {
        title: 'all my life',
        artist: 'Lil Durk ft JCole'
    },
    {
        title: 'surround sound',
        artist: 'JID ft 21 Savage'
    },
    {
        title: 't-shirt',
        artist: 'Migos'
    }
]

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

//current song
let songIndex = 0

//previous song
const previousSong = () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
};

//next song 
const nextSong = () => {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    console.log(songIndex)
    loadSong(songs[songIndex])
    playSong()
}

// Update DOM
const loadSong = (song) => {
    title.textContent = song.title
    artist.textContent = song.artist
    music.src = `Assets/songs/${song.title}.mp3`
    image.src = `Assets/images/${song.title}.jpg`
}

//onload select first song
loadSong(songs[0])

//update progress bar and time
const updateProgressBar = (e) => {
   if (isPlaying) {
       const { duration, currentTime } = e.srcElement
       console.log(duration, currentTime)
       //update progress bar width
       const progressPercent = (currentTime / duration) * 100
       progress.style.width = `${progressPercent}%`
       //calculate display for duration
       const durationMinutes = Math.floor(duration / 60)
       let durationSeconds = Math.floor(duration % 60)
       if ( durationSeconds < 10 ) {
           durationSeconds = `0${durationSeconds}`
       }
       if (durationSeconds) {
           songDuration.textContent = `${durationMinutes}:${durationSeconds}`;
       }

       // calculate display for current 
       const currentMinutes = Math.floor(currentTime / 60);
       let currentSeconds = Math.floor(currentTime % 60);
       if (currentSeconds < 10) {
         currentSeconds = `0${currentSeconds}`;
       }
       currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
   } 
}

//set progress bar

const setProgressBar = (e) => {
    const width = e.target.clientWidth
    const clickX = e.offsetX
    const { duration } = music
    music.currentTime = (clickX / width) * duration
}

//event listeners
previousBtn.addEventListener('click', previousSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)
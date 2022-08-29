import { playList } from "./PlayList";

let isPlay = false;
let playNumber = 0;
const audio = new Audio();
audio.volume = 0.75;

export const createPlayListElements = () => {
    playList.forEach(elem => {
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent = elem.title;
        document.querySelector('.play-list').append(li);
    })
}

const selectActivElement = (number) => {
    for (let elem of document.querySelector('.play-list').children) {
        elem.classList.remove('item-active');
    }
    document.querySelector('.play-list').children[number].classList.add('item-active');
}

const playAudio = () => {
    audio.src = playList[playNumber].src;
    if (!isPlay) {
        audio.currentTime = 0;
        audio.play();
        isPlay = true;
        setInterval();
        selectActivElement(playNumber);
        document.querySelector('.title').textContent = playList[playNumber].title;
    } else {
        audio.pause();
        isPlay = false;
        document.querySelector('.play-list').children[playNumber].classList.remove('item-active');
    }

    addAudioEndedHandler();
}

const toggleBtn = () => {
    if (isPlay) {
        document.querySelector('.play').classList.add('pause');
    } else {
        document.querySelector('.play').classList.remove('pause');
    }
}

const playNext = () => {
    if (playNumber < (playList.length - 1)) {
        playNumber++;
    } else if (playNumber === (playList.length - 1)) {
        playNumber = 0;
    }
    if (isPlay) {
        isPlay = false; 
    }
    playAudio();
}

const playPrev = () => {
    if (playNumber > 0) {
        playNumber--;
    } else if (playNumber === 0) {
        playNumber = playList.length - 1;
    }
    if (isPlay) {
        isPlay = false;
    }
    playAudio();
}

const addAudioEndedHandler = () => {
    audio.addEventListener('ended', playNext);
}

export const addPlayButtonClickHandler = () => {
    document.querySelector('.play').addEventListener('click', playAudio);
    document.querySelector('.play').addEventListener('click', toggleBtn);
}

export const addPlayNextButtonClickHandler = () => {
    document.querySelector('.play-next').addEventListener('click', playNext);
    document.querySelector('.play-next').addEventListener('click', toggleBtn);
}

export const addPlayPrevButtonClickHandler = () => {
    document.querySelector('.play-prev').addEventListener('click', playPrev);
    document.querySelector('.play-prev').addEventListener('click', toggleBtn);
}

export const addAudioLoadHandler = () => {
    audio.addEventListener('loadeddata', () => {
        addSongLength();
    });
}

export const addSongLength = () => {
    document.querySelector('.length').textContent = playList[playNumber].duration;
}

export const addTimelineClickHandler = () => {
    document.querySelector('.timeline').addEventListener('click', (event) => {
        changePlaybackTimeOfSong(event);
        setInterval();
    });
}

const changePlaybackTimeOfSong = (e) => {
    const timeline = document.querySelector('.timeline');
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}

const getTimeCodeOfSong = (duration) => {
    let seconds = parseInt(duration);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
    if (hours === 0) return `${String(minutes).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${String(minutes).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`;
}

const setInterval = () => {
    const progressBar = document.querySelector('.progress');
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    document.querySelector('.current').textContent = getTimeCodeOfSong(audio.currentTime);
    setTimeout(setInterval, 1000);
}

export const addChangeVolumeClickHandler = () => {
    document.querySelector('.volume-slider').addEventListener('click', (event) => {
        changeVolume(event);
    });
}

const changeVolume = (e) => {
    const volumeSlider = document.querySelector('.volume-slider');
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    document.querySelector(".volume-percentage").style.width = newVolume * 100 + '%';
    if (audio.muted) {
        audio.muted = !audio.muted;
        document.querySelector('.volume').classList.remove('icon-muteSound');
        document.querySelector('.volume').classList.add('icon-loudSound');
    }
}

export const addVolumeButtonClickHandler = () => {
    document.querySelector('.volume').addEventListener('click', toggleVolumeBtn);
}

const toggleVolumeBtn = () => {
    audio.muted = !audio.muted;
    if (audio.muted) {
        document.querySelector('.volume').classList.remove('icon-loudSound');
        document.querySelector('.volume').classList.add('icon-muteSound');
        document.querySelector(".volume-percentage").style.width = 0;
    } else {
        document.querySelector('.volume').classList.remove('icon-muteSound');
        document.querySelector('.volume').classList.add('icon-loudSound');
        document.querySelector(".volume-percentage").style.width = audio.volume * 100 + '%';
    }
}

export const addSmallPlayButtonHadler = () => {
    const myList = document.querySelectorAll('.play-item');
    for (let i = 0; i < myList.length; i++) {
        myList[i].addEventListener('click', (e) => {
            if (e.offsetX <  16) {
                if ((e.target.textContent !== playList[playNumber].title) && (isPlay))  {
                    isPlay = false;
                }
                playNumber = i;
                playAudio();
                toggleBtn();
            }
        })
    }
}
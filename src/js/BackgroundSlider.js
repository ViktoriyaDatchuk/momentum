import { getTimeOfDay } from '../index';

let randomNum; 

const getRandomNum = () => {
    randomNum = Math.floor(Math.random() * 20 + 1);
}

getRandomNum();

const getLinkToImageFromUnsplash = async (tag) => {
    const timeOfDay = getTimeOfDay();
    let tagForImage;
    if (!tag) {
        tagForImage = timeOfDay;
    } else {
        tagForImage = tag;
    }
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tagForImage}&client_id=pF8LTEkvbI9BdZbio14Zkn342Zkz4EvUF-_OJRxCYqc`;
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = `${data.urls.regular}`;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${img.src}')`;
    }
}

const getLinkToImageFromFlickr = async (tag) => {
    const timeOfDay = getTimeOfDay();
    let tagForImage;
    if (!tag) {
        tagForImage = timeOfDay;
    } else {
        tagForImage = tag;
    }
    const bgNum = Math.floor(Math.random() * 100);
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=532b7eb7402dd855491d1a81d926b272&tags=${tagForImage}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = `${data.photos.photo[bgNum].url_l}`;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${img.src}')`;
    }
}

export const setBg = () => {
    const img = new Image();
    const timeOfDay = getTimeOfDay();
    const bgNum = String(randomNum).padStart(2, '0');
    img.src = `https://raw.githubusercontent.com/ViktoriyaDatchuk/imagesForMomentum/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${img.src}')`;
    }
}

export const choiceBackgroundImage = () => {
    if (document.querySelector('.select').value !== '1') {
        document.querySelector('.tags-form').classList.remove('hidden');
        getImageFromAPI();
    } else {
        document.querySelector('.tags-form').classList.add('hidden');
        setBg();
    }
}

export const getImageFromAPI = () => {
    const tagForImage = document.querySelector('.background-tags').value;
    if (document.querySelector('.select').value === '2') {
        getLinkToImageFromUnsplash(tagForImage);
    } else {
        getLinkToImageFromFlickr(tagForImage);
    }
}

export const addNextSlideClickHandler = () => {
    document.querySelector('.slide-next').addEventListener('click', getSlideNext);
}

const getSlideNext = () => {
    if(randomNum < 20) {
        randomNum++;
    } else if(randomNum === 20) {
        randomNum = 1;
    }
    choiceBackgroundImage();
}

export const addPrevSlideClickHandler = () => {
    document.querySelector('.slide-prev').addEventListener('click', getSlidePrev);
}

const getSlidePrev = () => {
    if(randomNum > 1) {
        randomNum--;
    } else if(randomNum === 1) {
        randomNum = 20;
    }
    choiceBackgroundImage();
}


import { choiceBackgroundImage, addNextSlideClickHandler, addPrevSlideClickHandler, getLinkToImage } from './js/BackgroundSlider';
import { WeatherView } from './js/Weather';
import { QuoteOfDayView } from './js/QuoteOfDay';
import { createPlayListElements, addPlayButtonClickHandler, addPlayNextButtonClickHandler, addPlayPrevButtonClickHandler, addSongLength, addAudioLoadHandler, addTimelineClickHandler, addChangeVolumeClickHandler, addVolumeButtonClickHandler, addSmallPlayButtonHadler } from './js/AudioPlayer';
import { addSettingsButtonClickHandler, closeSettingsWindow, addCheckboxChangeHandler, getSettingFromLocalStorage, setSettingToLocalStorage, addSelectChangeHandler, addTagChangeHandler, addLanguageChangeHandler, state, addSettingsName } from './js/Settings';
import { addToDoButtonClickHandler, addToDoClickHandler, createToDo, getToDoFromLocalStorage, setToDoToLocalStorage } from './js/ToDoList';
import "./css/owfont-regular.css";
import "./css/style.css";

document.addEventListener('DOMContentLoaded', () => {
    getSettingFromLocalStorage();
    getToDoFromLocalStorage();
});

window.onload = function() {
    //Clock and Calendar
    showTime();
    
    //Greeting
    getNameFromLocalStorage();
    
    addWindowUnloadHandler();
    
    //Slider
    renderSliderForBackground();

    //Weather
    renderWeatherViewer();

    //Quotes
    renderQuoteOfDayViewer();

    //AudioPlayer
    renderAudioPlayer();

    //Settings
    renderSettingsMenu();

    //To Do List
    renderToDoList();
}

const showTime = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    document.querySelector('.time').textContent = currentTime;
    showDay(state.language);
    showGreeting(state.language);
    setTimeout(showTime, 1000);
}

export const showDay = (lang) => {
    const location = {
        en: 'en-US',
        be: 'be-BY'
    }
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString(location[lang], options);
    document.querySelector('.date').textContent = currentDate;
}

export const showGreeting = (lang) => {
    const timeOfDay = getTimeOfDay();
    const greetingTranslation = {
        en: {
            greeting: `Good ${timeOfDay}`,
            placeholder: 'Enter name'
        },
        be: {
            greeting: getTimeOfDayBe(),
            placeholder: 'Ўвядзіце імя'
        }
    }
    document.querySelector('.greeting').textContent = `${greetingTranslation[lang].greeting}`;
    document.querySelector('.name').placeholder = `[${greetingTranslation[lang].placeholder}]`;
}

export const getTimeOfDay = () => {
    const date =new Date();
    const hours = date.getHours();
    const indexForTimeOfDay = Math.trunc(hours / 6);
    let timeOfDay;
    switch(indexForTimeOfDay) {
        case 0:
            timeOfDay = 'night';
            break;
        case 1:
            timeOfDay = 'morning';
            break;
        case 2:
            timeOfDay = 'afternoon';
            break;
        case 3:
            timeOfDay = 'evening';
            break;
        default:
            timeOfDay = 'Error'; 
    }
    return timeOfDay;
}

const getTimeOfDayBe = () => {
    const date =new Date();
    const hours = date.getHours();
    const indexForTimeOfDay = Math.trunc(hours / 6);
    let timeOfDay;
    switch(indexForTimeOfDay) {
        case 0:
            timeOfDay = 'Дабранач';
            break;
        case 1:
            timeOfDay = 'Добрай раніцы';
            break;
        case 2:
            timeOfDay = 'Добры дзень';
            break;
        case 3:
            timeOfDay = 'Добры вечар';
            break;
        default:
            timeOfDay = 'Памылка'; 
    }
    return timeOfDay;
}

const setNameToLocalStorage = () => {
    localStorage.setItem('name', document.querySelector('.name').value);
}

const getNameFromLocalStorage = () => {
    if(localStorage.getItem('name')) {
        document.querySelector('.name').value = localStorage.getItem('name');
    }
}

const addWindowUnloadHandler = () => {
    window.addEventListener('beforeunload', setNameToLocalStorage);
    window.addEventListener('beforeunload', setSettingToLocalStorage);
    window.addEventListener('beforeunload', setToDoToLocalStorage);
}

const renderSliderForBackground = () => { 
    choiceBackgroundImage();

    addNextSlideClickHandler();

    addPrevSlideClickHandler(); 
}

const renderWeatherViewer = () => {
    const weatherView = new WeatherView();

    weatherView.getCityFromLocalStorage();

    weatherView.getWeather(state.language);

    weatherView.addCityChangeHandler(state.language);

    weatherView.addWindowUnloadWeatherHandler();
} 

const renderQuoteOfDayViewer = () => {
    const quoteView = new QuoteOfDayView();

    quoteView.getQuotes(state.language);

    quoteView.addButtonChangeQuoteHandler(state.language);
}

const renderAudioPlayer = () => {
    createPlayListElements();

    addSongLength();

    addAudioLoadHandler();

    addPlayButtonClickHandler();

    addPlayNextButtonClickHandler();

    addPlayPrevButtonClickHandler();

    addTimelineClickHandler();

    addChangeVolumeClickHandler();

    addVolumeButtonClickHandler();

    addSmallPlayButtonHadler();
}

const renderSettingsMenu = () => {
    addSettingsName(state.language);

    addSettingsButtonClickHandler();

    closeSettingsWindow();

    addCheckboxChangeHandler();

    addSelectChangeHandler();

    addTagChangeHandler();

    addLanguageChangeHandler();
}

const renderToDoList = () => {
    createToDo(state.language);

    addToDoClickHandler();

    addToDoButtonClickHandler();
}
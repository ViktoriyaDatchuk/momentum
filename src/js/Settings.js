import { choiceBackgroundImage, getImageFromAPI } from "./BackgroundSlider";
import { switchLanguage } from './Languages';

export const state = {
    language: 'en',
    photoSource: 'github',
    blocks: ['time', 'date', 'greeting-container', 'quote-wrapper', 'weather', 'audio', 'todolist']
}

export const addSettingsName = (lang) => {
    const nameList = {
        en: {
            '0': 'Language',
            '1': 'Time',
            '2': 'Data',
            '3': 'Greeting',
            '4': 'Quote',
            '5': 'Weather',
            '6': 'Audio player',
            '7': 'ToDo List',
            '8': 'Background',
            '9': 'Enter tags'
        },
        be: {
            '0': 'Мова',
            '1': 'Час',
            '2': 'Дата',
            '3': 'Прывітанне',
            '4': 'Цытаты',
            '5': 'Надворье',
            '6': 'Аўдыяплэер',
            '7': 'Спіс спраў',
            '8': 'Фон',
            '9': 'Ўвядзіце тэгі'
        }
    }
    const elemList = document.querySelectorAll('.set-name');
    for (let i = 0; i < elemList.length; i++) {
        elemList[i].textContent = nameList[lang][i];
    }
}
  
export const addSettingsButtonClickHandler = () => {
    document.querySelector('.setting-icon').addEventListener('click', () => {
        document.querySelector('.settings-window').classList.toggle('settings-window-active');
        document.querySelector('.setting-icon').classList.toggle('rotate');
    })
}

export const closeSettingsWindow = () => {
    window.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.closest('.settings-window') && (!target.closest('.setting-icon'))) {
            document.querySelector('.settings-window').classList.remove('settings-window-active');
            document.querySelector('.setting-icon').classList.remove('rotate');
        } 
    });
}

const checkboxList = document.querySelectorAll('.checkbox');

const getCheckboxStatus = () => {
    let result = [];
    checkboxList.forEach(elem => {
        result.push(elem.checked);
    })
    return result;
}

const getBlocksForSetting = () => {
    let result = [];
    for (let block of state.blocks) {
        const selectorBlock = `.${block}`;
        result.push(document.querySelector(selectorBlock));
    }
    return result;
}

const blocks = getBlocksForSetting();

const getBlocksClassList = () => {
    let result = [];
    for (let block of blocks) {
        result.push(block.classList.value);
    }
    return result;   
}

export const addCheckboxChangeHandler = () => {
    for (let i = 0; i < checkboxList.length; i++) {
        checkboxList[i].addEventListener('change', (e) => {
            changeBlocksVisibility(e.target);
        })
    }
}

const changeBlocksVisibility = (elem) => {
    for (let set of state.blocks) {
        const selectorCheckbox = `.${set}-switch`;
        const selectorBlock = `.${set}`;
        if (elem.closest(selectorCheckbox)) {
            const block = document.querySelector(selectorBlock);
            if (!elem.checked) {
                block.classList.add('visibility');
            } else {
                block.classList.remove('visibility')
            }
        }
    }
}

export const addSelectChangeHandler = () => {
    document.querySelector('.select').addEventListener('change', () => {
        document.querySelector('.background-tags').value = null;
        choiceBackgroundImage();
    })
}

export const addTagChangeHandler = () => {
    document.querySelector('.tags-form').addEventListener('change', getImageFromAPI);
}

export const addLanguageChangeHandler = () => {
    document.querySelector('.language').addEventListener('click', () => {
        switchLanguage();
        changeImageOnButton();
    })
}

const changeImageOnButton = () => {
    if (state.language === 'be') {
        document.querySelector('.language').classList.remove('english');
        document.querySelector('.language').classList.add('belarusian');
    } else {
        document.querySelector('.language').classList.remove('belarusian');
        document.querySelector('.language').classList.add('english');
    }
}

export const setSettingToLocalStorage = () => {
    const checkboxStatus = getCheckboxStatus();
    const blocksClassList = getBlocksClassList();
    localStorage.setItem('checkboxes', JSON.stringify(checkboxStatus));
    localStorage.setItem('blocks', JSON.stringify(blocksClassList));
    localStorage.setItem('imageSource', document.querySelector('.select').value);
    localStorage.setItem('tags', document.querySelector('.background-tags').value);
    localStorage.setItem('languageImage', document.querySelector('.language').classList.value);
    localStorage.setItem('language', state.language);
}

export const getSettingFromLocalStorage = () => {
    if(localStorage.getItem('checkboxes')) {
        const checkboxStatus = JSON.parse(localStorage.getItem('checkboxes'));
        checkboxList.forEach(elem => {
            elem.checked = checkboxStatus.shift();
        })
    }
    if(localStorage.getItem('blocks')) {
        const blocksClassList = JSON.parse(localStorage.getItem('blocks'));
        blocks.forEach(elem => {
            elem.classList.value = blocksClassList.shift();
        })
    }
    if(localStorage.getItem('imageSource')) {
        document.querySelector('.select').value = localStorage.getItem('imageSource');
    }
    if(localStorage.getItem('tags')) {
        document.querySelector('.background-tags').value = localStorage.getItem('tags');
    }
    if(localStorage.getItem('languageImage')) {
        document.querySelector('.language').classList.value = localStorage.getItem('languageImage');
    }
    if(localStorage.getItem('language')) {
        state.language = localStorage.getItem('language');
    }
}

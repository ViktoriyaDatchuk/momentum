let placeholderText;
let buttonChangeText;
let buttonDeleteText;

export const createToDo = (lang) => {
    const name = {
        en: "ToDo",
        be: "Справы"
    };
    const title = {
        en: "ToDo List",
        be: "Спіс спраў"
    };
    const button = {
        en: "New ToDo",
        be: "Новая справа"
    };
    const placeholderLan = {
        en: "New ToDo",
        be: "Новая справа"
    };
    const changeLan = {
        en: "Change",
        be: "Змяніць"
    };
    const deleteLan = {
        en: "Delete",
        be: "Выдаліць"
    };
    document.querySelector('.todolist-name').textContent = name[lang];
    document.querySelector('.todo-title').textContent = title[lang];
    document.querySelector('.todo-button').textContent = button[lang];
    placeholderText = placeholderLan[lang];
    buttonChangeText = changeLan[lang];
    buttonDeleteText = deleteLan[lang];
    if (document.querySelector('.todo-input')) {
        document.querySelector('.todo-input').placeholder = placeholderText;
    }
    if (document.querySelector('.todo-change-button')) {
        const buttonList = document.querySelectorAll('.todo-change-button');
        buttonList.forEach(elem => {
            elem.textContent = buttonChangeText;
        })
    }
    if (document.querySelector('.todo-delete-button')) {
        const buttonList = document.querySelectorAll('.todo-delete-button');
        buttonList.forEach(elem => {
            elem.textContent = buttonDeleteText;
        })
    }
    const inputToDO = document.createElement('input');
    inputToDO.classList.add('todo-input');
    inputToDO.placeholder = placeholderText;
    document.querySelector('.todolist-container').append(inputToDO);
    inputToDO.classList.add('hidden');
}

export const addToDoClickHandler = () => {
    document.querySelector('.todolist').addEventListener('click', (e) => {
        if (e.target.classList.value === 'todolist-name') {
            document.querySelector('.todolist-container').classList.toggle('visibility');
        }
    })
}

export const addToDoButtonClickHandler = () => {
    document.querySelector('.todo-button').addEventListener('click', buttonHidden);
}

const buttonHidden = () => {
    document.querySelector('.todo-input').classList.remove('hidden');
    addNewToDoChangeHandler();
    document.querySelector('.todo-button').classList.add('hidden');
}

const addNewToDoChangeHandler = () => {
    document.querySelector('.todo-input').addEventListener('change', func);
}

const func = () => {
    addToDOToList();
    changeToDo();
    deleteToDo();
}

const addToDOToList = () => {
    const div = document.createElement('div');
    div.classList.add('todo');
    const contain = document.createElement('p');
    contain.classList.add('todo-text');
    const buttonChange = document.createElement('button');
    const buttonDelete = document.createElement('button');
    buttonChange.classList.add('todo-change-button');
    buttonChange.classList.add('create-button');
    buttonDelete.classList.add('todo-delete-button');
    buttonDelete.classList.add('create-button');
    contain.textContent = document.querySelector('.todo-input').value;
    document.querySelector('.todo-input').value = '';
    buttonChange.textContent = buttonChangeText;
    buttonDelete.textContent = buttonDeleteText;
    div.append(contain);
    div.append(buttonChange);
    div.append(buttonDelete);
    document.querySelector('.todolist-list').append(div);
}

const changeToDo = () => {
    let toDoAll = document.querySelectorAll('.todo');
    const toDoList = toDoAll[toDoAll.length - 1]
    toDoList.querySelector('.todo-change-button').addEventListener('click', () => {
        toDoList.querySelector('.todo-text').classList.add('hidden');
            const changeInput = document.createElement('input');
            changeInput.classList.add('change-input');
            changeInput.value = toDoList.querySelector('.todo-text').textContent;
            toDoList.prepend(changeInput);
            toDoList.querySelector('.change-input').addEventListener('change', () => {
                toDoList.querySelector('.todo-text').textContent = changeInput.value;
                toDoList.querySelector('.change-input').remove();
                toDoList.querySelector('.todo-text').classList.remove('hidden');
            })
    })
}

const changeToDoAfterLS = () => {
    const toDoAll = document.querySelectorAll('.todo');
    toDoAll.forEach(elem => {
        elem.querySelector('.todo-change-button').addEventListener('click', () => {
            elem.querySelector('.todo-text').classList.add('hidden');
                const changeInput = document.createElement('input');
                changeInput.classList.add('change-input');
                changeInput.value = elem.querySelector('.todo-text').textContent;
                elem.prepend(changeInput);
                elem.querySelector('.change-input').addEventListener('change', () => {
                    elem.querySelector('.todo-text').textContent = changeInput.value;
                    elem.querySelector('.change-input').remove();
                    elem.querySelector('.todo-text').classList.remove('hidden');
                })
        })
    })
}

const deleteToDo = () => {
    let toDoAll = document.querySelectorAll('.todo');
    const toDoList = toDoAll[toDoAll.length - 1]
    toDoList.querySelector('.todo-delete-button').addEventListener('click', () => {
        toDoList.remove();
        if (document.querySelector('.todolist-list').children.length === 0) {
            document.querySelector('.todo-input').classList.add('hidden');
            document.querySelector('.todo-button').classList.remove('hidden');
        }
    })
}

const deleteToDoAfterLS = () => {
    const toDoAll = document.querySelectorAll('.todo');
    toDoAll.forEach(elem => {
        elem.querySelector('.todo-delete-button').addEventListener('click', () => {
            elem.remove();
            if (document.querySelector('.todolist-list').children.length === 0) {
                document.querySelector('.todo-input').removeEventListener('change', func);
                document.querySelector('.todo-input').classList.add('hidden');
                document.querySelector('.todo-button').classList.remove('hidden');
            }
        })
    })
}

export const setToDoToLocalStorage = () => {
    localStorage.setItem('toDoContainerClass', document.querySelector('.todolist-container').classList.value);
    localStorage.setItem('toDoButton', document.querySelector('.todo-button').classList.value);
    localStorage.setItem('toDoContainer', document.querySelector('.todolist-container').innerHTML);
    localStorage.setItem('toDoInput', document.querySelector('.todo-input').classList.value)
}

export const getToDoFromLocalStorage = () => {
    if(localStorage.getItem('toDoButton')) {
        document.querySelector('.todo-button').classList.value = localStorage.getItem('toDoButton');
    }

    if(localStorage.getItem('toDoContainerClass')) {
        document.querySelector('.todolist-container').classList.value = localStorage.getItem('toDoContainerClass');
    }
    if(localStorage.getItem('toDoContainer')) {
        document.querySelector('.todolist-container').innerHTML = localStorage.getItem('toDoContainer');
        if (document.querySelector('.todo')) {
            changeToDoAfterLS();
            deleteToDoAfterLS();
            addNewToDoChangeHandler();
        }
    }
    if(localStorage.getItem('toDoInput')) {
        document.querySelector('.todo-input').classList.value = localStorage.getItem('toDoInput');
    }
}
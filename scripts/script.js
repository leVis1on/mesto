let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let saveButton = document.querySelector('.popup__save-button');

let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__subtitle'); 

let formName = document.querySelector('#name');
let formInfo = document.querySelector('#info');

let formElement = document.querySelector('#form');

function popitup() {
    formName.value = profileName.textContent; 
    formInfo.value = profileInfo.textContent; 
    popup.classList.add('popup_opened');
}
function popitdown() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = formName.value; 
    profileInfo.textContent = formInfo.value;
    popitdown();
}

editButton.addEventListener('click',popitup);
closeButton.addEventListener('click',popitdown);
formElement.addEventListener('submit', formSubmitHandler);
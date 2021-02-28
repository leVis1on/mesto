let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let saveButton = document.querySelector('.popup__save-button');

let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__subtitle'); 
let nickname = profileName.textContent;
let info = profileInfo.textContent;

let formName = document.querySelector('#name');
let formInfo = document.querySelector('#info');
formName.value = nickname;
formInfo.value = info;

function popitup() {
    popup.classList.add('popup_opened');
}
function popitdown() {
    popup.classList.remove('popup_opened');
}
editButton.addEventListener('click',popitup);
closeButton.addEventListener('click',popitdown);

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInput = formName.value;
    let jobInput = formInfo.value;
    profileName.textContent = nameInput;
    profileInfo.textContent = jobInput;
    popup.classList.remove('popup_opened');
}

saveButton.addEventListener('click', formSubmitHandler);

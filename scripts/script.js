let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelectorAll('.popup__close-icon');
let popup = document.querySelectorAll('.popup');
let saveButton = document.querySelectorAll('.popup__save-button');

const cardsContainer = document.querySelector('.elements');

let addButton = document.querySelector('.profile__add-button');

let picture = document.querySelector('.element__picture');

let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__subtitle'); 

let formName = document.querySelector('#name');
let formInfo = document.querySelector('#info');

let formGeoName = document.querySelector('#geoName');
let formPictureUrl = document.querySelector('#pictureUrl');

let formElement = document.querySelector('#form');
let picFormElement = document.querySelector('#pictureForm');

const cardTemplate = document.querySelector('#card'); 
const cards = document.querySelector('.elements');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

for (let i = 0; i <= 5; i = i + 1) {
    const cardTemplate = document.querySelector('#card').content; 
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__picture').src = initialCards[i].link;
    cardElement.querySelector('.element__title').textContent = initialCards[i].name;
    cardsContainer.append(cardElement);
    cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    }); 
    cardElement.querySelector('.element__trash-button').addEventListener('click', function () {
        const listItem = cardElement.querySelector('.element__trash-button').closest('.element');
        listItem.remove();
      }); 
    cardElement.querySelector('.element__picture').addEventListener('click', function () {
        popup[2].querySelector('.popup__image').src = cardElement.querySelector('.element__picture').src;
        popup[2].querySelector('.popup__pic-subtitle').textContent = cardElement.querySelector('.element__title').textContent;
        popup[2].classList.remove('popup_closed');
        popup[2].classList.add('popup_opened');
    }); 
} 

function popitupInfo() {
    formName.value = profileName.textContent; 
    formInfo.value = profileInfo.textContent; 
    popup[0].classList.remove('popup_closed');
    popup[0].classList.add('popup_opened');
}

function popitupAdd() {
    popup[1].classList.remove('popup_closed');
    popup[1].classList.add('popup_opened');
}

function popitdown() {
    popup[0].classList.add('popup_closed');
    popup[1].classList.add('popup_closed');
    popup[2].classList.add('popup_closed');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = formName.value; 
    profileInfo.textContent = formInfo.value;
    popitdown();
}

function addCard (evt) {
    evt.preventDefault();
    const cardTemplate = document.querySelector('#card').content; 
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__picture').src = formPictureUrl.value;
    cardElement.querySelector('.element__title').textContent = formGeoName.value;
    cardsContainer.prepend(cardElement); 
    cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    }); 
    cardElement.querySelector('.element__trash-button').addEventListener('click', function () {
        const listItem = cardElement.querySelector('.element__trash-button').closest('.element');
        listItem.remove();
    }); 
    cardElement.querySelector('.element__picture').addEventListener('click', function () {
        popup[2].querySelector('.popup__image').src = cardElement.querySelector('.element__picture').src;
        popup[2].querySelector('.popup__pic-subtitle').textContent = cardElement.querySelector('.element__title').textContent;
        popup[2].classList.remove('popup_closed');
        popup[2].classList.add('popup_opened');
    }); 
    popitdown();
}

editButton.addEventListener('click',popitupInfo);
addButton.addEventListener('click',popitupAdd);
closeButton[0].addEventListener('click',popitdown);
closeButton[1].addEventListener('click',popitdown);
closeButton[2].addEventListener('click',popitdown);
formElement.addEventListener('submit', formSubmitHandler);
picFormElement.addEventListener('submit', addCard);


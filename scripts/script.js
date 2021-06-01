import Card from './Card.js';
import FormValidator from './FormValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const editClose = document.querySelector('#editClose');
const addClose = document.querySelector('#addClose');
const editPopup = document.querySelector('#editPopup');
const addPopup = document.querySelector('#addPopup');

const cardsContainer = document.querySelector('.elements');

const addButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__subtitle'); 

const formName = document.querySelector('#name');
const formInfo = document.querySelector('#info');

const formGeoName = document.querySelector('#geoName');
const formPictureUrl = document.querySelector('#pictureUrl');

const formElement = document.querySelector('#form');
const picFormElement = document.querySelector('#pictureForm');

let openedPopup;

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

initialCards.forEach(function (key) {
  const card = new Card(key.link, key.name, '#card');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}); 

function handleOverlay (evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__container') || evt.target.classList.contains('popup__pic-container')) {
    closePopup(openedPopup);
  }
}

function handleEsc (evt) {
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  openedPopup = popup;
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEsc);
  document.addEventListener('click', handleOverlay);
};

function closePopup(popup) {
  popup.classList.add('popup_closed');
  document.removeEventListener('keyup', handleEsc);
  document.removeEventListener('click', handleOverlay);
};

function openPopupEdit() {
    formName.value = profileName.textContent; 
    formInfo.value = profileInfo.textContent; 
    const validate = new FormValidator('#form');
    validate.enableValidation();
    Array.from(formElement.querySelectorAll('.popup__field')).forEach((inputElement) => {validate._checkInputValidity(formElement, inputElement);}); 
    openPopup(editPopup);
};

function openPopupAdd(evt) {
  const addSaveButton = document.querySelector('#addButton');
  addSaveButton.classList.add('popup__save-button_inactive');
  addSaveButton.disabled = true;
  const validate = new FormValidator('#pictureForm');
  validate.enableValidation();
  openPopup(addPopup);
};

function closePopupEdit() {
  closePopup(editPopup);
};

function closePopupAdd() {
  closePopup(addPopup);
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = formName.value; 
    profileInfo.textContent = formInfo.value;
    closePopup(editPopup);
};

function addNewCard (evt) {
  evt.preventDefault();
  const card = new Card(formPictureUrl.value, formGeoName.value, '#card');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  closePopup(addPopup);
  picFormElement.reset(); 
};



editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
editClose.addEventListener('click', closePopupEdit);
addClose.addEventListener('click', closePopupAdd);
formElement.addEventListener('submit', formSubmitHandler);
picFormElement.addEventListener('submit', addNewCard);
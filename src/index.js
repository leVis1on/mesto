import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

import './index.css';

const editButton = document.querySelector('.profile__edit-button');

const editForm = {formSelector: '#form', inputSelector: '.popup__field', submitButtonSelector: '.popup__save-button', inactiveButtonClass: 'popup__save-button_inactive', inputErrorClass: 'popup__field_type_error', errorClass: 'popup__field-error_active'};
const addForm = {formSelector: '#pictureForm', inputSelector: '.popup__field', submitButtonSelector: '.popup__save-button', inactiveButtonClass: 'popup__save-button_inactive', inputErrorClass: 'popup__field_type_error', errorClass: 'popup__field-error_active'};
const cardListSelector = '.elements';

const addButton = document.querySelector('.profile__add-button');



const formName = document.querySelector('#name');
const formInfo = document.querySelector('#info');

const formGeoName = document.querySelector('#geoName');
const formPictureUrl = document.querySelector('#pictureUrl');

const formElement = document.querySelector('#form');

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

const cardList = new Section({
  item: initialCards,
  renderer: (item) => {
    const card = new Card(item.link, item.name, '#card', () => {
      const popupWithImage = new PopupWithImage('#picPopup');
      popupWithImage.open(event);
      popupWithImage.setEventListeners();
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardListSelector);

cardList.renderItems();

function openPopupEdit() {
  const editPopupInfo = new UserInfo({nickname: '.profile__name', info: '.profile__subtitle'});
  formName.value = editPopupInfo.getUserInfo().nickname;
  formInfo.value = editPopupInfo.getUserInfo().info;

  const validate = new FormValidator(editForm);
  validate.enableValidation();
  Array.from(formElement.querySelectorAll('.popup__field')).forEach((inputElement) => {validate._checkInputValidity(formElement, inputElement);}); 

  const popupWithFormAdd = new PopupWithForm((evt) => {
    evt.preventDefault();
    editPopupInfo.setUserInfo();
  }, '#editPopup');
  popupWithFormAdd.open();
  popupWithFormAdd.setEventListeners();
};

function openPopupAdd() {
  const addSaveButton = document.querySelector('#addButton');
  addSaveButton.classList.add('popup__save-button_inactive');
  addSaveButton.disabled = true;
  const validate = new FormValidator(addForm);
  validate.enableValidation();
  const popupWithFormAdd = new PopupWithForm((evt) => {
    evt.preventDefault();
    const card = new Card(formPictureUrl.value, formGeoName.value, '#card', () => {
    const popupWithImage = new PopupWithImage('#picPopup');
    popupWithImage.open(event);
    popupWithImage.setEventListeners();
  });
  const cardElement = card.generateCard();
  document.querySelector(cardListSelector).prepend(cardElement);
  }, '#addPopup');
  popupWithFormAdd.open(event);
  popupWithFormAdd.setEventListeners();
};

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
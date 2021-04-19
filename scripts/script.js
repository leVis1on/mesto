const editButton = document.querySelector('.profile__edit-button');
const editClose = document.querySelector('#editClose');
const addClose = document.querySelector('#addClose');
const picClose = document.querySelector('#picClose');
const editPopup = document.querySelector('#editPopup');
const addPopup = document.querySelector('#addPopup');
const picPopup = document.querySelector('#picPopup');

const cardsContainer = document.querySelector('.elements');

const addButton = document.querySelector('.profile__add-button');

const picture = document.querySelector('.element__picture');

const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__subtitle'); 

const formName = document.querySelector('#name');
const formInfo = document.querySelector('#info');

const formGeoName = document.querySelector('#geoName');
const formPictureUrl = document.querySelector('#pictureUrl');

const formElement = document.querySelector('#form');
const picFormElement = document.querySelector('#pictureForm');

const cardTemplate = document.querySelector('#card').content;

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

function openPopup(popup) {
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.add('popup_closed');
};

initialCards.forEach(function (key) {
  addCard(createCard(key.name, key.link))
});

function openPopupEdit() {
    formName.value = profileName.textContent; 
    formInfo.value = profileInfo.textContent; 
    openPopup(editPopup);
};

function openPopupAdd() {
  openPopup(addPopup);
};

function closePopupEdit() {
  closePopup(editPopup);
};

function closePopupAdd() {
  closePopup(addPopup);
};

function closePopupPic() {
  closePopup(picPopup);
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = formName.value; 
    profileInfo.textContent = formInfo.value;
    closePopup(editPopup);
};

function createCard(cardTitle, cardUrl) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__picture').src = cardUrl;
  cardElement.querySelector('.element__picture').alt = cardTitle;
  cardElement.querySelector('.element__title').textContent = cardTitle;
  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
}); 
cardElement.querySelector('.element__trash-button').addEventListener('click', function () {
    const listItem = cardElement.querySelector('.element__trash-button').closest('.element');
    listItem.remove();
  });
cardElement.querySelector('.element__picture').addEventListener('click', function () {
    picPopup.querySelector('.popup__image').src = cardElement.querySelector('.element__picture').src;
    picPopup.querySelector('.popup__image').alt = cardElement.querySelector('.element__picture').alt;
    picPopup.querySelector('.popup__pic-subtitle').textContent = cardElement.querySelector('.element__title').textContent;
    openPopup(picPopup);
});
  return cardElement
};

function addCard (card) {
  cardsContainer.prepend(card);
  picFormElement.reset();
  if (addPopup.classList.contains('popup_opened')) {
    closePopup(addPopup);
  };
  picFormElement.reset(); 
};

function addNewCard (evt) {
  evt.preventDefault();
  addCard(createCard(formGeoName.value, formPictureUrl.value))
};

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
editClose.addEventListener('click', closePopupEdit);
addClose.addEventListener('click', closePopupAdd);
picClose.addEventListener('click', closePopupPic);
formElement.addEventListener('submit', formSubmitHandler);
picFormElement.addEventListener('submit', addNewCard);
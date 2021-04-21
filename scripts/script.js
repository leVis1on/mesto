const editButton = document.querySelector('.profile__edit-button');
const editClose = document.querySelector('#editClose');
const addClose = document.querySelector('#addClose');
const picClose = document.querySelector('#picClose');
const editPopup = document.querySelector('#editPopup');
const addPopup = document.querySelector('#addPopup');
const picPopup = document.querySelector('#picPopup');
const overlay = document.querySelector('.popup');

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

const picPopupImage = picPopup.querySelector('.popup__image');
const picPopupSubtitle = picPopup.querySelector('.popup__pic-subtitle');

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

initialCards.forEach(function (key) {
  addCard(createCard(key.name, key.link))
});

function openPopupEdit() {
    formName.value = profileName.textContent; 
    formInfo.value = profileInfo.textContent; 
    openPopup(editPopup);
    Array.from(formElement.querySelectorAll('.popup__field')).forEach((inputElement) => {checkInputValidity(formElement, inputElement);});  
};

function openPopupAdd(evt) {
  const addSaveButton = document.querySelector('#addButton');
  addSaveButton.classList.add('popup__save-button_inactive');
  addSaveButton.disabled = true;
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
    picPopupImage.src = cardUrl;
    picPopupImage.alt = cardTitle;
    picPopupSubtitle.textContent = cardTitle; 
    openPopup(picPopup);
});
  return cardElement
};

function addCard (card) {
  cardsContainer.prepend(card);
};

function addNewCard (evt) {
  evt.preventDefault();
  addCard(createCard(formGeoName.value, formPictureUrl.value))
  closePopup(addPopup);
  picFormElement.reset(); 
};



editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
editClose.addEventListener('click', closePopupEdit);
addClose.addEventListener('click', closePopupAdd);
picClose.addEventListener('click', closePopupPic);
formElement.addEventListener('submit', formSubmitHandler);
picFormElement.addEventListener('submit', addNewCard);
export default class Card {
    constructor (url, title, cardSelector) {
      this._url = url;
      this._title = title; 
      this._cardSelector = cardSelector;
    }
    
    _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
      return cardElement; 
    }  

    _handleOpenPopup() {
      document.querySelector('#picPopup').classList.remove('popup_closed');
      document.querySelector('#picPopup').classList.add('popup_opened');
      document.addEventListener('keyup',  (evt) => {
        if (evt.key === "Escape") {
          this._handleClosePopup();
        }
      });
      document.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__container') || evt.target.classList.contains('popup__pic-container')) {
          this._handleClosePopup();
        }
      });
    }
  
    _handleClosePopup() {
      document.querySelector('#picPopup').classList.add('popup_closed');
      document.removeEventListener('keyup',  (evt) => {
        if (evt.key === "Escape") {
          this._handleClosePopup();
        }
      });
      document.removeEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__container') || evt.target.classList.contains('popup__pic-container')) {
          this._handleClosePopup();
        }
      });
    }
  
    _setEventListeners() {
      this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like-button_active');
      }); 
      this._element.querySelector('.element__picture').addEventListener('click', () => {
        document.querySelector('#picPopup').querySelector('.popup__image').src = this._url;
        document.querySelector('#picPopup').querySelector('.popup__image').alt = this._title;
        document.querySelector('#picPopup').querySelector('.popup__pic-subtitle').textContent = this._title; 
        this._handleOpenPopup();
      });
      this._element.querySelector('.element__trash-button').addEventListener('click', () => {
        const listItem = this._element.querySelector('.element__trash-button').closest('.element');
        listItem.remove();
      });
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.element__picture').src = this._url;
      this._element.querySelector('.element__picture').alt = this._title;
      this._element.querySelector('.element__title').textContent = this._title;
      
  
      return this._element; 
    }
  }
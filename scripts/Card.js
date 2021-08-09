import {openPopup} from './script.js';
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

    _like() {
      this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like-button_active');
      }); 
    }
  
    _setEventListeners() {
      this._like();
      this._element.querySelector('.element__picture').addEventListener('click', () => {
        const picPopup = document.querySelector('#picPopup');
        const picPopupImage = picPopup.querySelector('.popup__image');
        picPopupImage.src = this._url;
        picPopupImage.alt = this._title;
        picPopup.querySelector('.popup__pic-subtitle').textContent = this._title; 
        openPopup(picPopup);
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
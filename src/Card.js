export default class Card {
    constructor (url, title, cardSelector, handleCardClick) {
      this._url = url;
      this._title = title; 
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
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
      this._element.querySelector('.element__picture').addEventListener('click', () => this._handleCardClick());
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
export default class Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        document.querySelector(this._popupSelector).classList.add('popup_opened');
        document.addEventListener('keyup', () => this._handleEscClose(event));
        document.addEventListener('click', () => this._handleOverlay(event));
    };
    close() {
        document.querySelector(this._popupSelector).classList.remove('popup_opened');
        document.removeEventListener('keyup', () => this._handleEscClose(event));
        document.removeEventListener('click', () => this._handleOverlay(event));
    };
    
    _handleEscClose(evt)  {
        if (evt.key === "Escape")  {
            this.close();
          }
    };

    _handleOverlay(evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__container') || evt.target.classList.contains('popup__pic-container')) { 
            this.close();
        }
      }

    setEventListeners() {
        const popup = document.querySelector(this._popupSelector);
        popup.querySelector('.popup__close-icon').addEventListener('click', () => this.close());
    };
}
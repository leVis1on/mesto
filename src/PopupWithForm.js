import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(submitCallback, popupSelector) {
        super(popupSelector);
        this._submitCallback = submitCallback;
    }
    _getInputValues() {
        const formPictureUrl = document.querySelector('#pictureUrl').value;
        const formGeoName = document.querySelector('#geoName');
        return {pictureUrl: formPictureUrl, geoName: formGeoName};
    };
    close() {
        const popup = document.querySelector(this._popupSelector);
        popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', () => super._handleEscClose(event));
        document.removeEventListener('click', () => super._handleOverlay(event));
        popup.querySelector('form').reset();
        

    };
    setEventListeners() {
        const popup = document.querySelector(this._popupSelector);
        popup.querySelector('.popup__close-icon').addEventListener('click', () => this.close());
        popup.querySelector('form').addEventListener('submit', () => {
            this._submitCallback(event);
            this.close();
        });
    };
}
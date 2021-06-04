import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(evt) {
        const picPopup = document.querySelector(this._popupSelector);
        const picPopupImage = picPopup.querySelector('.popup__image');
        picPopupImage.src = evt.target.src;
        picPopupImage.alt = evt.target.alt;
        picPopup.querySelector('.popup__pic-subtitle').textContent = evt.target.alt;
        document.querySelector(this._popupSelector).classList.add('popup_opened');
        document.addEventListener('keyup', () => super._handleEscClose(event));
        document.addEventListener('click', () => super._handleOverlay(event));
    };
}
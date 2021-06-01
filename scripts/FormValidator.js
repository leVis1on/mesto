export default class FormValidator {
  constructor (formSelector) {
    this._formSelector = formSelector;
  }

_showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__field_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__field-error_active');
  };
  
 _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__field_type_error');
    errorElement.classList.remove('popup__field-error_active');
    errorElement.textContent = '';
  };
  
 _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };
  
 _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }
  
_toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_inactive');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__save-button_inactive');
    buttonElement.disabled = false;
  } 
  }
  
_setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
    const buttonElement = formElement.querySelector('.popup__save-button');
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };
 enableValidation = () => {
      document.querySelector(this._formSelector).addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(document.querySelector(this._formSelector));
  };
}
export default class FormValidator {
  constructor (formSettings) {
    this._formSelector = formSettings.formSelector;
    this._inputSelector = formSettings.inputSelector;
    this._submitButtonSelector = formSettings.submitButtonSelector;
    this._inactiveButtonClass = formSettings.inactiveButtonClass;
    this._inputErrorClass = formSettings.inputErrorClass;
    this._errorClass = formSettings.errorClass;
  }

_showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  
 _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
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
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  } 
  }
  
_setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
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
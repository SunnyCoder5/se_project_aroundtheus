import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = [
      ...this._popupForm.querySelectorAll(".modal__form-input"),
    ];
    this._handleFormSubmit = handleFormSubmit;

    this._popupButton = this._popupForm.querySelector(".modal__form-button");
    this._submitButtonText = this._popupButton.textContent;
  }

  setLoading(submit, loadingText = "Saving...") {
    if (submit) {
      this._popupButton.textContent = loadingText;
    } else {
      this._popupButton.textContent = this._submitButtonText;
    }
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();

    super.close();
  }
}

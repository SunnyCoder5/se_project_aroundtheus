import Popup from "./Popup.js";

export default class PopupWithImages extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector(
      ".modal__picture-container-image"
    );
    this._popupTitle = this._popupElement.querySelector(
      ".modal__picture-container-title"
    );
  }
  open({ name, link }) {
    this._popupImage.src = link;
    this._popupTitle.textContent = name;
    this._popupImage.alt = name;

    super.open();
  }
}

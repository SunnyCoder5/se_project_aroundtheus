export default class Popup {
  constructor(popupselector) {
    this._popupElement = document.querySelector(popupselector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this.__handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this.__handleEscClose);
  }

  __handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popupElement.querySelector(
      ".modal__container-close"
    );
    closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal")) {
        this.close();
      }
    });
  }
}

export default class Popup {
  constructor(popupselector) {
    this._popupElement = document.querySelector(popupselector);
  }

  open() {
    document.addEventListener("keydown", this.__handleEscClose);
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    document.removeEventListener("keydown", this.__handleEscClose);
    this._popupElement.classList.remove("modal_opened");
  }

  __handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

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

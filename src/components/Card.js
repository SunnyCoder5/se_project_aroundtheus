export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteCardclick,
    handleLikeCard,
    handleUnLikeCard
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCardclick = handleDeleteCardclick;
    this._isLiked = isLiked;
    this._handleLikeCard = handleLikeCard;
    this._handleUnLikeCard = handleUnLikeCard;
  }

  getId() {
    return this.id;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      if (!this._isLiked) {
        return this._handleLikeCard(this);
      }
      return this._handleUnLikeCard(this);
    });

    this._cardElement
      .querySelector("#card-delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCardclick(this);
      });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _setCardLike(isLiked) {
    this._isLiked = !isLiked;
    this._handleLikeIcon();
  }

  _handleLikeIcon() {
    if (!this._isLiked) {
      this._likeButton.classList.remove("card__like-button_active");
    } else {
      this._likeButton.classList.add("card__like-button_active");
    }
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    this._setEventListeners();
    this._handleLikeIcon();
    return this._cardElement;
  }
}

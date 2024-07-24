const initialCards = [
  {
    name: "Antelope Canyon",
    link: "https://images.unsplash.com/photo-1473456229365-7a538630163b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "New York City",
    link: "https://images.unsplash.com/photo-1448317971280-6c74e016e49c?q=80&w=1832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Salt Lake City",
    link: "https://images.unsplash.com/photo-1584255391936-f4d73b095371?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Santa Barbara West Campus",
    link: "https://images.unsplash.com/photo-1590255041502-9a2603c6fd39?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Monument Valley",
    link: "https://images.unsplash.com/photo-1558353016-37b89cf18040?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Lucia Falls",
    link: "https://images.unsplash.com/photo-1709336860701-5ac2d825a170?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#modal-form-input-name");
const profileDescriptionInput = document.querySelector(
  "#modal-form-input-description"
);
const profileFormElement = document.forms["modal-form-element"];
const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector("#card-list");
const cardAddButton = document.querySelector("#card-add-button");
const cardAddModal = document.querySelector("#card-adding-modal");
const cardTitleInput = document.querySelector("#modal-card-input-title");
const cardLinkInput = document.querySelector("#modal-card-input-link");
const cardFormElement = document.forms["modal-card-form-element"];
const picturePopup = document.querySelector("#card-picture-modal");
const popupImage = document.querySelector("#modal-picture-container-image");
const popupTitle = document.querySelector("#modal-picture-container-title");
const modalCloseButtons = document.querySelectorAll(".modal__container-close");
const modalCloseButtonsArray = Array.from(modalCloseButtons);

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});

//Functions

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardlikeButton = cardElement.querySelector("#card-like-button");
  const deleteButton = cardElement.querySelector("#card-delete-button");

  cardTitleElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  cardlikeButton.addEventListener("click", () => {
    cardlikeButton.classList.toggle("card__like-button_clicked");
  });

  deleteButton.addEventListener("click", () => {
    const cardElement = deleteButton.closest(".card");
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", function (evt) {
    popupImage.src = cardImageElement.src;
    popupTitle.textContent = cardTitleElement.textContent;
    popupImage.alt = cardTitleElement.textContent;
    openModal(picturePopup);
  });

  return cardElement;
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardList);
  closeModal(cardAddModal);
  evt.target.reset();
}

function renderCard(data, cardList) {
  const cardElement = getCardElement(data);
  cardList.prepend(cardElement);
}

//Form listeners

cardAddButton.addEventListener("click", function () {
  openModal(cardAddModal);
});

cardFormElement.addEventListener("submit", handleCardFormSubmit);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//Loops

initialCards.forEach((data) => renderCard(data, cardList));

modalCloseButtonsArray.forEach((item) => {
  const modal = item.closest(".modal");
  item.addEventListener("click", () => closeModal(modal));
});

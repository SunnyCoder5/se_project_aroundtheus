import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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
const cardList = document.querySelector("#card-list");
const cardAddButton = document.querySelector("#card-add-button");
const cardAddModal = document.querySelector("#card-adding-modal");
const cardTitleInput = document.querySelector("#modal-card-input-title");
const cardLinkInput = document.querySelector("#modal-card-input-link");
const cardFormElement = document.forms["modal-card-form-element"];
const picturePopup = document.querySelector("#card-picture-modal");

const modalCloseButtons = document.querySelectorAll(".modal__container-close");
const modalCloseButtonsArray = Array.from(modalCloseButtons);
const modals = document.querySelectorAll(".modal");

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});

//Functions

function keyHandler(evt) {
  const key = evt.key;
  if (key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function closeModal(modal) {
  document.removeEventListener("keydown", keyHandler);
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  document.addEventListener("keydown", keyHandler);
  modal.classList.add("modal_opened");
}

function handleImageClick(name, link) {
  const popupImage = document.querySelector("#modal-picture-container-image");
  const popupTitle = document.querySelector("#modal-picture-container-title");
  popupImage.src = link;
  popupTitle.textContent = name;
  popupImage.alt = name;
  openModal(picturePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileDescription.textContent = profileDescriptionInput.value;
  profileTitle.textContent = profileTitleInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardList);
  closeModal(cardAddModal);
  cardAddModal.reset();
  addCardFormValidator.resetValidation();
}

function renderCard(data, cardList) {
  const cardElement = getCardElement(data);
  cardList.prepend(cardElement);
}

function getCardElement(item) {
  const cardElement = new Card(item, "#card-template", handleImageClick);
  return cardElement.getView();
}

//form validation classes

const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  profileFormElement,
  validationSettings
);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  cardFormElement,
  validationSettings
);

addCardFormValidator.enableValidation();

//Form listeners

cardAddButton.addEventListener("click", function () {
  openModal(cardAddModal);
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

cardAddModal.addEventListener("submit", handleAddCardFormSubmit);

//Loops

initialCards.forEach((data) => renderCard(data, cardList));

modalCloseButtonsArray.forEach((item) => {
  const modal = item.closest(".modal");
  item.addEventListener("click", () => closeModal(modal));
});

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

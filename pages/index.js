import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImages from "../components/PopupWithImages.js";
import UserInfo from "../components/UserInfo.js";

const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#modal-form-input-name");
const profileDescriptionInput = document.querySelector(
  "#modal-form-input-description"
);
const profileFormElement = document.forms["modal-form-element"];

const cardAddButton = document.querySelector("#card-add-button");

const cardFormElement = document.forms["modal-card-form-element"];

//class instances

//FormValidator

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

//Section

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  "#card-list"
);

section.renderItems();

const newCardPopup = new PopupWithForm(
  "#card-adding-modal",
  handleAddCardFormSubmit
);
newCardPopup.setEventListeners();

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
profileEditPopup.setEventListeners();

const imagePreviewPopup = new PopupWithImages("#card-picture-modal");
imagePreviewPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  jobSelector: "#profile-description",
});

//Event listeners

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  editFormValidator.resetValidation();
  profileEditPopup.open();
});

cardAddButton.addEventListener("click", function () {
  newCardPopup.open();
});

// Event Handlers

function handleImageClick({ name, link }) {
  imagePreviewPopup.open({ name, link });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userInfo.setUserInfo({ name: data.name, job: data.description });
  imagePreviewPopup.close();
}

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.name;
  const link = inputValues.link;
  const cardData = { name: name, link: link };
  renderCard(cardData);
  newCardPopup.close();
  cardFormElement.reset();
  addCardFormValidator.disableButton();
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

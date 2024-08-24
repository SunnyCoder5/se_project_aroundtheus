import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { validationSettings } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImages from "../components/PopupWithImages.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";

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

//Api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "e5bcded0-3ccc-46ac-b505-89ebe536f2b5",
    "Content-Type": "application/json",
  },
});

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
    items: [],
    renderer: renderCard,
  },
  "#card-list"
);

api.getInitialCards().then((cards) => section.renderItems(cards));

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

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo({ name: userData.name, job: userData.about });
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

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo({ name: data.name, job: data.description });
  imagePreviewPopup.close();
}

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.name;
  const link = inputValues.link;
  // const cardData = { name: name, link: link };
  api.addCard({ name, link }).then((cardData) => {
    renderCard(cardData);
    newCardPopup.close();
    cardFormElement.reset();
    addCardFormValidator.disableButton();
  });
}

function createCard({ name, link }) {
  const card = new Card({ name, link }, "#card-template", handleImageClick);
  return card.getView();
}
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

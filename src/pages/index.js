import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { validationSettings } from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImages from "../components/PopupWithImages.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const profileEditButton = document.querySelector("#profile-edit-button");
//const profileTitle = document.querySelector("#profile-title");
//const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#modal-form-input-name");
const profileDescriptionInput = document.querySelector(
  "#modal-form-input-description"
);
const profileFormElement = document.forms["modal-form-element"];

const cardAddButton = document.querySelector("#card-add-button");

const cardFormElement = document.forms["modal-card-form-element"];

const avatarElement = document.forms["modal-profile-picture-element"];

const avatarEditButton = document.querySelector("#image-edit-icon");

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

const avatarValidator = new FormValidator(avatarElement, validationSettings);

avatarValidator.enableValidation();

//Section

const section = new Section(
  {
    items: [],
    renderer: renderCard,
  },
  "#card-list"
);

api
  .getInitialCards()
  .then((cards) => section.renderItems(cards))
  .catch((err) => {
    console.error(err);
  });

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

const cardDeletePopup = new PopupWithConfirmation("#delete-card-modal");
cardDeletePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  jobSelector: "#profile-description",
  pictureSelector: "#profile-image",
});

//Event listeners

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({ name: userData.name, about: userData.about });
    userInfo.setUserAvatar({ avatar: userData.avatar });
  })
  .catch((err) => {
    console.error(err);
  });

profileEditButton.addEventListener("click", function () {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  profileEditPopup.open();
});

cardAddButton.addEventListener("click", function () {
  newCardPopup.open();
});

// avatarPopup

const avatarPopup = new PopupWithForm(
  "#profile-picture-modal",
  handleAvatarFormSubmit
);
avatarPopup.setEventListeners();

avatarEditButton.addEventListener("click", function () {
  avatarPopup.open();
});

// Event Handlers
function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  popupInstance.setLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch(console.error)
    .finally(() => {
      popupInstance.setLoading(false);
    });
}

function handleImageClick({ name, link }) {
  imagePreviewPopup.open({ name, link });
}

function handleProfileFormSubmit(data) {
  function makeRequest() {
    return api.updateUserInfo(data).then((res) => {
      userInfo.setUserInfo({ name: res.name, about: res.about });
    });
  }
  handleSubmit(makeRequest, profileEditPopup);
}

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.name;
  const link = inputValues.link;
  function makeRequest() {
    return api.addCard({ name, link }).then((cardData) => {
      renderCard(cardData);
      cardFormElement.reset();
      addCardFormValidator.disableButton();
    });
  }
  handleSubmit(makeRequest, newCardPopup);
}

function handleAvatarFormSubmit(userData) {
  function makeRequest() {
    return api.updateUserAvatar(userData).then((res) => {
      userInfo.setUserAvatar({ avatar: res.avatar });
    });
  }
  handleSubmit(makeRequest, avatarPopup);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCardclick,
    handleLikeCard,
    handleUnLikeCard
  );
  return card.getView();
}
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

function handleDeleteCardclick(card) {
  cardDeletePopup.open();
  cardDeletePopup.setSubmitAction(() => {
    function makeRequest() {
      return api.removeCard(card._id).then(() => {
        card.handleDeleteCard();
        cardDeletePopup.close();
      });
    }
    handleSubmit(makeRequest, cardDeletePopup, "Deleting...");
  });
}

function handleLikeCard(card) {
  api
    .likeCard(card._id)
    .then(() => {
      card.setCardLike(true);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleUnLikeCard(card) {
  api
    .unLikeCard(card._id)
    .then(() => {
      card.setCardLike(false);
    })
    .catch((err) => {
      console.error(err);
    });
}

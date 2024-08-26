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
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
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

const cardDeletePopup = new PopupWithConfirmation("#delete-card-modal");
cardDeletePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  jobSelector: "#profile-description",
  pictureSelector: "#profile-image",
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

function handleImageClick({ name, link }) {
  imagePreviewPopup.open({ name, link });
}

function handleProfileFormSubmit(data) {
  profileEditPopup.setLoading(true);
  api
    .updateUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo({ name: res.name, job: res.description });
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileEditPopup.setLoading(false);
    });
}

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.name;
  const link = inputValues.link;
  api.addCard({ name, link }).then((cardData) => {
    renderCard(cardData);
    newCardPopup.close();
    cardFormElement.reset();
    addCardFormValidator.disableButton();
  });
}

function handleAvatarFormSubmit(userData) {
  avatarPopup.setLoading(true);
  api.updateUserAvatar(userData).then(
    ((res) => {
      userInfo.setUserAvatar({ avatar: res.avatar });
    })
      .then(() => {
        avatarPopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        avatarPopup.setLoading(false);
      })
  );
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
    cardDeletePopup.setLoading(true);
    api
      .removeCard(card._id)
      .then(() => {
        card._handleDeleteCard();
        cardDeletePopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        cardDeletePopup.setLoading(false, "Yes");
      });
  });
}

function handleLikeCard(card) {
  if (card.isLiked) {
  }
  api
    .likeCard(card._id)
    .then(() => {
      card._setCardLike(true);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleUnLikeCard(card) {
  api
    .unlikeCard(card._id)
    .then(() => {
      card._setCardLike(false);
    })
    .catch((err) => {
      console.error(err);
    });
}

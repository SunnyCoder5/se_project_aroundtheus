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
const modalCloseButton = document.querySelector("#modal-close-button");
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
const cardModalCloseButton = document.querySelector("#card-modal-close-button");
const cardTitleInput = document.querySelector("#modal-card-input-title");
const cardLinkInput = document.querySelector("#modal-card-input-link");
const cardFormElement = document.forms["modal-card-form-element"];
const picturePopup = document.querySelector("#card-picture-popup");
const popupCloseButton = document.querySelector("#popup-close-button");
const popupImage = document.querySelector("#popup-image");
const popupTitle = document.querySelector("#popup-title");

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  profileEditModal.classList.add("modal_opened");
});

function closeModal() {
  profileEditModal.classList.remove("modal_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal();
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
    picturePopup.classList.add("popup_opened");
  });

  popupCloseButton.addEventListener("click", function (evt) {
    picturePopup.classList.remove("popup_opened");
  });

  return cardElement;
}

function closeCardModal() {
  cardAddModal.classList.remove("modal_opened");
}

cardAddButton.addEventListener("click", function () {
  cardAddModal.classList.add("modal_opened");
});

cardModalCloseButton.addEventListener("click", function () {
  closeCardModal();
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardList);
  closeCardModal();
}

function renderCard(data, cardList) {
  const cardElement = getCardElement(data);
  cardList.prepend(cardElement);
}

cardFormElement.addEventListener("submit", handleCardFormSubmit);

modalCloseButton.addEventListener("click", function () {
  closeModal();
});

profileFormElement.addEventListener("submit", handleFormSubmit);

initialCards.forEach((data) => renderCard(data, cardList));

const initialCards = [
  {
    name: "Antelope Canyon",
    link: "https://unsplash.com/photos/antelope-canyon-arizona-4VeSnxkrNAM",
  },

  {
    name: "New York City",
    link: "https://unsplash.com/photos/photo-of-gray-building-USrZRcRS2Lw",
  },

  {
    name: "Salt Lake City",
    link: "https://unsplash.com/photos/green-trees-near-body-of-water-during-daytime-GBrCu6h8H1Y",
  },

  {
    name: "Santa Barbara West Campus",
    link: "https://unsplash.com/photos/people-walking-on-beach-during-daytime-qN2UhvqAU3Y",
  },

  {
    name: "Monument Valley",
    link: "https://unsplash.com/photos/three-mountains-at-desert-during-daytime-VpmPEs0yNYk",
  },

  {
    name: "Lucia Falls",
    link: "https://unsplash.com/photos/a-river-flowing-through-a-lush-green-forest-KnEXbwSfqRo",
  },
];

const profileEditButton = document.querySelector("#profile-edit-button");

const profileEditModal = document.querySelector("#profile-edit-modal");
const modalCloseButton = document.querySelector("#modal-close-button");

profileEditButton.addEventListener("click", () => {
  console.log("button clicked");
  profileEditModal.classList.add("modal_opened");
});

modalCloseButton.addEventListener("click", function () {
  profileEditModal.classList.remove("modal_opened");
});

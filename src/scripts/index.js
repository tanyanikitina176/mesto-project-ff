import {
  getInitialProfile,
  getInitialCards,
  updateProfileData,
  postCard,
  cardDeleteOnServer,
  putCardLikes,
  deleteCardLikes,
  updateAvatar,
} from "./api.js";
import { createCard } from "./card.js";
import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";
import { clearValidation, enableValidation } from "./validation.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

const placesList = document.querySelector(".places__list");
const profileAddButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const nameImage = popupImage.querySelector(".popup__caption");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupAvatar = document.querySelector(".popup_type_new-avatar");
const imageProfile = document.querySelector(".profile__image");
let currentUserId;

const popups = document.querySelectorAll(".popup"); //Ищем все попапы
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});

function displayCards(cards) {
  placesList.innerHTML = "";
  cards.forEach((card) => {
    const cardElements = createCard(
      card,
      cardDeleteOnServer,
      putCardLikes,
      deleteCardLikes,
      clickCardImage,
      currentUserId
    );
    placesList.appendChild(cardElements);
  });
}

function clickCardImage(link, name) {
  popupImageElement.src = link;
  nameImage.alt = name;
  nameImage.textContent = name;
  openPopup(popupImage);
}

const formAvatar = document.forms.update_avatar;
const formInputAvatar = formAvatar.elements.link;

imageProfile.addEventListener("click", () => {
  openPopup(popupAvatar);
  formAvatar.reset();
  clearValidation(popupAvatar, validationConfig);
});

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  changeSubmitButtonText(evt.target, "Сохранение...");
  const openedPopup = document.querySelector(".popup_is-opened");
  const avatar = formInputAvatar.value;
  updateAvatar(avatar)
    .then((data) => {
      closePopup(openedPopup);
      imageProfile.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
      console.log("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      changeSubmitButtonText(evt.target, "Сохранить");
    });
}

formAvatar.addEventListener("submit", handleFormSubmitAvatar);

editButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEditProfile, validationConfig);
});

profileAddButton.addEventListener("click", () => {
  openPopup(popupNewCard);
  formNewPlace.reset();
  clearValidation(popupNewCard, validationConfig);
});

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileForm = document.forms.edit_profile;
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  changeSubmitButtonText(evt.target, "Сохранение...");
  const name = editProfileForm.elements.name.value;
  const about = editProfileForm.elements.description.value;
  const openedPopup = document.querySelector(".popup_is-opened");
  updateProfileData(name, about)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(openedPopup);
    })
    .catch((error) => {
      console.log("Ошибка при обновлении профиля:", error);
    })
    .finally(() => {
      changeSubmitButtonText(evt.target, "Сохранить");
    });
}

editProfileForm.addEventListener("submit", handleFormSubmitProfile);

const formNewPlace = document.forms.new_place;
function handleformNewPlace(evt) {
  evt.preventDefault();
  changeSubmitButtonText(evt.target, "Сохранение...");
  const inputCardName = formNewPlace.elements.name;
  const inputCardLink = formNewPlace.elements.link;
  postCard(inputCardName.value, inputCardLink.value)
    .then((cardData) => {
      const cardNewElement = createCard(
        cardData,
        cardDeleteOnServer,
        putCardLikes,
        deleteCardLikes,
        clickCardImage,
        currentUserId
      );
      placesList.prepend(cardNewElement);
      formNewPlace.reset();
      const openedPopup = document.querySelector(".popup_is-opened");
      closePopup(openedPopup);
    })
    .catch((err) => {
      console.log("Ошибка при отправке карточки:", err);
    })
    .finally(() => {
      changeSubmitButtonText(evt.target, "Сохранить");
    });
}

formNewPlace.addEventListener("submit", handleformNewPlace);

function changeSubmitButtonText(element, text) {
  const buttonSubmit = element.querySelector(".popup__button");
  buttonSubmit.textContent = text;
}

Promise.all([getInitialProfile(), getInitialCards()])
  .then(([profileData, cardsData]) => {
    profileName.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    currentUserId = profileData._id;
    imageProfile.style.backgroundImage = `url(${profileData.avatar})`;
    displayCards(cardsData);
  })
  .catch((err) => {
    console.log("Ошибка при загрузке данных:", err);
  });

import { initialCards } from "./cards.js";
import { createCard, handleLike, deleteCard } from "./card.js";
import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";

const placesList = document.querySelector(".places__list");
const profileAddButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const nameImage = popupImage.querySelector(".popup__caption");
const popupImageElement = popupImage.querySelector(".popup__image");

const popups = document.querySelectorAll(".popup"); //Ищем все попапы
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    //Благодаря всплытию при клике на крестик мы поймаем событие на элементе попапа.
    //Проверяем что кликнули на оверлей или на крестик.
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      //В currentTarget у нас всегда будет элемент на котором мы поймали событие, т.е. попап.
      closePopup(popup);
    }
  });
});

function displayCards(cards) {
  placesList.innerHTML = "";
  cards.forEach((initialCards) => {
    const cardElements = createCard(
      initialCards,
      deleteCard,
      handleLike,
      clickCardImage
    );
    placesList.appendChild(cardElements);
  });
}

displayCards(initialCards);

function clickCardImage(link, name) {
  popupImageElement.src = link;
  nameImage.alt = name;
  nameImage.textContent = name;
  openPopup(popupImage);
}

editButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

profileAddButton.addEventListener("click", () => {
  openPopup(popupNewCard);
});

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formElement = document.forms.edit_profile;
formElement.elements.name.value = profileName.textContent;
formElement.elements.description.value = profileDescription.textContent;
// Находим поля формы в DOM
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  const openedPopup = document.querySelector(".popup_is-opened");
  closePopup(openedPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

const formNewPlace = document.forms.new_place;

function handleformNewPlace(evt) {
  evt.preventDefault();
  const inputCardName = formNewPlace.elements.name;
  const inputCardLink = formNewPlace.elements.link;
  const cardNewElement = createCard(
    {
      name: inputCardName.value,
      link: inputCardLink.value,
    },
    deleteCard,
    handleLike,
    clickCardImage
  );
  placesList.prepend(cardNewElement);
  formElement.reset();
  const openedPopup = document.querySelector(".popup_is-opened");
  closePopup(openedPopup);
}

formNewPlace.addEventListener("submit", handleformNewPlace);

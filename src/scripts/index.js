import { initialCards } from "./cards.js";
import { createCard, handleLike, deleteCard } from "./card.js";
import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";

const placesList = document.querySelector(".places__list");
const profileAddButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

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
  const popupImage = document.querySelector(".popup_type_image");
  const nameImage = popupImage.querySelector(".popup__caption");
  const openImage = popupImage.querySelector(".popup__image");
  openImage.src = link;
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
  closePopup();
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
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
  placesList.insertBefore(cardNewElement, placesList.firstChild);
  inputCardName.value = "";
  inputCardLink.value = "";
  closePopup();
}

formNewPlace.addEventListener("submit", handleformNewPlace);

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
function deleteCard(cardElement) {
  cardElement.remove();
}

function createCard(cardData, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  //клонируем template
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  //выносим в переменные значения карточек
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  //устанавливаем значения вложенных элементов
  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;
  //создаем обработчик события для вызова функции удаления
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });
  return cardElement;
}

function displayCards(cards) {
  const placesList = document.querySelector(".places__list");
  placesList.innerHTML = "";
  cards.forEach((initialCards) => {
    const cardElements = createCard(initialCards, deleteCard);
    placesList.appendChild(cardElements);
  });
}

displayCards(initialCards);

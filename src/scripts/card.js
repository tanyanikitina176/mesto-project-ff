export function createCard(cardData, deleteCard, handleLike, clickCardImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  //клонируем template
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  //выносим в переменные значения карточек
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  //устанавливаем значения вложенных элементов
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  //создаем обработчик события для вызова функции удаления
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });
  //обработчик события лайка
  likeButton.addEventListener("click", () => {
    handleLike(cardElement);
  });
  //обработчик клика по изображению
  cardImage.addEventListener("click", () => {
    clickCardImage(cardData.link, cardData.name);
  });
  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

//обработка лайка
export function handleLike(cardElement) {
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.classList.toggle("card__like-button_is-active");
}

export function createCard(
  cardData,
  cardDeleteOnServer,
  putCardLikes,
  deleteCardLikes,
  clickCardImage,
  currentUserId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const counterLike = cardElement.querySelector(".card__like-counter");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  counterLike.textContent = cardData.likes.length;
  if (cardData.owner._id === currentUserId) {
    deleteButton.classList.remove("card__delete-button-inactive");
  } else {
    deleteButton.classList.add("card__delete-button-inactive");
  }
  const likesIds = cardData.likes.map((user) => user._id);
  if (likesIds.includes(currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  deleteButton.addEventListener("click", () => {
    cardDeleteOnServer(cardData._id)
      .then(() => {
        deleteCard(cardElement);
      })
      .catch((err) => {
        console.log("Ошибка при удалении карточки:", err);
      });
  });

  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    const actionLike = isLiked ? deleteCardLikes : putCardLikes;
    actionLike(cardData._id)
      .then((cardData) => {
        const likeButton = cardElement.querySelector(".card__like-button");
        handleLike(likeButton);
        counterLike.textContent = cardData.likes.length;
      })
      .catch((err) => {
        console.error(
          isLiked
            ? "Ошибка при удалении лайка:"
            : "Ошибка при добавлении лайка:",
          err
        );
      });
  });
  cardImage.addEventListener("click", () => {
    clickCardImage(cardData.link, cardData.name);
  });
  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

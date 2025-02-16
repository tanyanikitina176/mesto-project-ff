export function openPopup(element) {
  element.classList.add("popup_is-animated");
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", onClickEscape);
  bindClosePopupOnButton(element);
  bindClosePopupOnOverlay(element);
}

export function closePopup() {
  const popupOpen = document.querySelector(".popup_is-opened");
  popupOpen.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", onClickEscape);
  unBindClosePopupOnButton(popupOpen);
  unBindClosePopupOnOverlay(popupOpen);
}

function bindClosePopupOnButton(popup) {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", closePopup); //закрытие попапа при клике на крестик
}

function unBindClosePopupOnButton(popup) {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.removeEventListener("click", closePopup); //закрытие попапа при клике на крестик
}

function onClickEscape(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

function unBindClosePopupOnOverlay(popup) {
  popup.removeEventListener("click", onClickOverlay);
}

function bindClosePopupOnOverlay(popup) {
  popup.addEventListener("click", onClickOverlay);
}

function onClickOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup();
  }
}

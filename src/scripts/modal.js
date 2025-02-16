export function openPopup(element) {
  element.classList.add("popup_is-animated");
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", onClickEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", onClickEscape);
}

function onClickEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

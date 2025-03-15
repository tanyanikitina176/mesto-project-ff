const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-34",
  headers: {
    authorization: "47c28a6f-d43b-4e5e-b2db-1ef18ec5213b",
    "Content-Type": "application/json",
  },
};

export const getInitialProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => onResponse(res, "Ошибка инициализации профиля"));
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => onResponse(res, "Ошибка инициализации карточек"));
};

const onResponse = (res, messageError) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${messageError}: ${res.status}`);
};

export const updateProfileData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => onResponse(res, "Ошибка обновления профиля"));
};

export const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then((res) => onResponse(res, "Ошибка добавления карточки"));
};

export const cardDeleteOnServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => onResponse(res, "Ошибка удаления карточки"));
};

export const putCardLikes = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => onResponse(res, "Ошибка лайка"));
};

export const deleteCardLikes = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => onResponse(res, "Ошибка удаления лайка"));
};

export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  }).then((res) => onResponse(res, "Ошибка обновления аватара"));
};

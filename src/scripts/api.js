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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const updateProfileData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const cardDeleteOnServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    console.log("Статус ответа:", res.status);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка удаления: ${res.status}`);
  });
};

export const putCardLikes = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    console.log("Статус ответа лайка:", res.status);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка лайка: ${res.status}`);
  });
};

export const deleteCardLikes = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    console.log("Статус ответа удаления лайка:", res.status);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка удаления лайка: ${res.status}`);
  });
};

export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  }).then((res) => {
    console.log("Статус ответа обновления аватара:", res.status);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка обновления аватара: ${res.status}`);
  });
};

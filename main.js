(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-34",headers:{authorization:"47c28a6f-d43b-4e5e-b2db-1ef18ec5213b","Content-Type":"application/json"}},t=function(e,t){return e.ok?e.json():Promise.reject("".concat(t,": ").concat(e.status))},n=function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e,"Ошибка удаления карточки")}))},r=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e,"Ошибка лайка")}))},o=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e,"Ошибка удаления лайка")}))};function c(e,t,n,r,o,c){var a=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__image"),u=a.querySelector(".card__title"),l=a.querySelector(".card__delete-button"),s=a.querySelector(".card__like-button"),d=a.querySelector(".card__like-counter");return i.src=e.link,i.alt=e.name,u.textContent=e.name,d.textContent=e.likes.length,e.owner._id===c?l.classList.remove("card__delete-button-inactive"):l.classList.add("card__delete-button-inactive"),e.likes.map((function(e){return e._id})).includes(c)&&s.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(){t(e._id).then((function(){!function(e){e.remove()}(a)})).catch((function(e){console.log("Ошибка при удалении карточки:",e)}))})),s.addEventListener("click",(function(){var t=s.classList.contains("card__like-button_is-active");(t?r:n)(e._id).then((function(e){!function(e){e.classList.toggle("card__like-button_is-active")}(s),d.textContent=e.likes.length})).catch((function(e){console.error(t?"Ошибка при удалении лайка:":"Ошибка при добавлении лайка:",e)}))})),i.addEventListener("click",(function(){o(e.link,e.name)})),a}function a(e){e.classList.add("popup_is-animated"),e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)}function u(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}var l=function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""},s=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))},d=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(e,n,t.inputErrorClass,t.errorClass)})),s(n,r,t.inactiveButtonClass)};function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p,m={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};p=m,Array.from(document.querySelectorAll(p.formSelector)).forEach((function(e){!function(e,t,n,r,o,c){var a=Array.from(e.querySelectorAll(t)),i=e.querySelector(n);s(a,i,c),a.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,n,r):function(e,t,n,r,o){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r),c.textContent=n,c.classList.add(o)}(e,t,t.validationMessage,n,r)}(e,t,r,o),s(a,i,c)}))}))}(e,p.inputSelector,p.submitButtonSelector,p.inputErrorClass,p.errorClass,p.inactiveButtonClass)}));var _,v=document.querySelector(".places__list"),y=document.querySelector(".profile__add-button"),h=document.querySelector(".profile__edit-button"),b=document.querySelector(".popup_type_edit"),S=document.querySelector(".popup_type_new-card"),g=document.querySelector(".popup_type_image"),q=g.querySelector(".popup__caption"),L=g.querySelector(".popup__image"),C=document.querySelector(".popup_type_new-avatar"),E=document.querySelector(".profile__image");function k(e,t){L.src=e,q.alt=t,q.textContent=t,a(g)}document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__close"))&&i(e)}))}));var A=document.forms.update_avatar,x=A.elements.link;E.addEventListener("click",(function(){a(C),A.reset(),d(C,m)})),A.addEventListener("submit",(function(n){n.preventDefault(),P(n.target,"Сохранение...");var r,o=document.querySelector(".popup_is-opened");(r=x.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then((function(e){return t(e,"Ошибка обновления аватара")}))).then((function(e){i(o),E.style.backgroundImage="url(".concat(e.avatar,")")})).catch((function(e){console.log("Ошибка при обновлении аватара:",e)})).finally((function(){P(n.target,"Сохранить")}))})),h.addEventListener("click",(function(){a(b),j.value=U.textContent,O.value=w.textContent,d(b,m)})),y.addEventListener("click",(function(){a(S),B.reset(),d(S,m)}));var U=document.querySelector(".profile__title"),w=document.querySelector(".profile__description"),T=document.forms.edit_profile,j=T.elements.name,O=T.elements.description;T.addEventListener("submit",(function(n){n.preventDefault(),P(n.target,"Сохранение...");var r=T.elements.name.value,o=T.elements.description.value,c=document.querySelector(".popup_is-opened");(function(n,r){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return t(e,"Ошибка обновления профиля")}))})(r,o).then((function(e){U.textContent=e.name,w.textContent=e.about,i(c)})).catch((function(e){console.log("Ошибка при обновлении профиля:",e)})).finally((function(){P(n.target,"Сохранить")}))}));var B=document.forms.new_place;function P(e,t){e.querySelector(".popup__button").textContent=t}B.addEventListener("submit",(function(a){a.preventDefault(),P(a.target,"Сохранение...");var u,l,s=B.elements.name,d=B.elements.link;(u=s.value,l=d.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:u,link:l})}).then((function(e){return t(e,"Ошибка добавления карточки")}))).then((function(e){var t=c(e,n,r,o,k,_);v.prepend(t),B.reset(),i(document.querySelector(".popup_is-opened"))})).catch((function(e){console.log("Ошибка при отправке карточки:",e)})).finally((function(){P(a.target,"Сохранить")}))})),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e,"Ошибка инициализации профиля")})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e,"Ошибка инициализации карточек")}))]).then((function(e){var t,a,i,u=(i=2,function(e){if(Array.isArray(e))return e}(a=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(a,i)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(a,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=u[0],s=u[1];U.textContent=l.name,w.textContent=l.about,_=l._id,E.style.backgroundImage="url(".concat(l.avatar,")"),t=s,v.innerHTML="",t.forEach((function(e){var t=c(e,n,r,o,k,_);v.appendChild(t)}))})).catch((function(e){console.log("Ошибка при загрузке данных:",e)}))})();
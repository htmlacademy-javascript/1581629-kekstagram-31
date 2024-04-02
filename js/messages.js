import { isEscapeKey } from './utils.js';

const ERROR_MESSAGE_SHOW_TIME = 5000;

const showError = (message) => {
  const errorMessageTemplate = document.querySelector('#data-error')
    .content
    .querySelector('.data-error');
  const errorMessageElement = errorMessageTemplate.cloneNode(true);

  errorMessageElement.querySelector('.data-error__title').textContent = message;

  document.body.append(errorMessageElement);

  setTimeout(() => {
    errorMessageElement.remove();
  }, ERROR_MESSAGE_SHOW_TIME);
};

const onBodyKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    const messageElement = document.querySelector('.success');
    messageElement.remove();
  }
};

const onMessageOutsideClick = (evt, messageType) => {
  const messageSelector = `.${messageType}__inner`;
  const messageElement = document.querySelector(messageSelector);

  if (!evt.target.closest(messageSelector)) {
    messageElement.parentNode.remove();
    document.body.removeEventListener('keydown', onBodyKeydown);
  }
};

const showMessagePopup = (messageTemplate, messageType) => {
  const messageElement = messageTemplate.cloneNode(true);
  document.body.append(messageElement);

  messageElement.querySelector('button').addEventListener('click', () => {
    messageElement.remove();
    document.body.removeEventListener('keydown', onBodyKeydown);
  });

  messageElement.addEventListener('click', (evt) => onMessageOutsideClick(evt, messageType));

  if (messageType === 'success') {
    document.body.addEventListener('keydown', onBodyKeydown, { 'once': true });
  }
};

export { showError, showMessagePopup };

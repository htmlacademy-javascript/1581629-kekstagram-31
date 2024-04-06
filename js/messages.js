import { isEscapeKey } from './utils.js';
import { MessageType } from './shared-constants.js';

const ERROR_MESSAGE_SHOW_TIME = 5000;

const showError = (text) => {
  const errorMessageTemplate = document.querySelector('#data-error')
    .content
    .querySelector('.data-error');
  const errorMessage = errorMessageTemplate.cloneNode(true);

  errorMessage.querySelector('.data-error__title').textContent = text;

  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, ERROR_MESSAGE_SHOW_TIME);
};

const onBodyKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    const messagePopup = document.querySelector(`.${MessageType.SUCCESS}`);
    messagePopup.remove();
  }
};

const onMessageOutsideClick = (evt, messageType) => {
  const messageSelector = `.${messageType}__inner`;
  const messagePopup = document.querySelector(messageSelector);

  if (!evt.target.closest(messageSelector)) {
    messagePopup.parentNode.remove();
    document.body.removeEventListener('keydown', onBodyKeydown);
  }
};

const showMessagePopup = (messageTemplate, messageType) => {
  const messagePopup = messageTemplate.cloneNode(true);
  document.body.append(messagePopup);

  messagePopup.querySelector('button').addEventListener('click', () => {
    messagePopup.remove();
    document.body.removeEventListener('keydown', onBodyKeydown);
  });

  messagePopup.addEventListener('click', (evt) => onMessageOutsideClick(evt, messageType));

  if (messageType === MessageType.SUCCESS) {
    document.body.addEventListener('keydown', onBodyKeydown, { 'once': true });
  }
};

export { showError, showMessagePopup };

import { MessageType } from './shared-constants.js';
import { isEscapeKey } from './utils.js';
import { onIncreaseScaleControlClick, onDecreaseScaleControlClick } from './scaling.js';
import {
  changeVisualEffect,
  getDefaultOptions,
  getDefaultEffectName,
  onSliderUpdate,
  onVisualEffectClick
} from './visual-effects.js';
import { createFormValidator, validateForm, resetFormValidator } from './validation.js';
import { sendData } from './api.js';
import { showError, showMessagePopup } from './messages.js';

const FILE_TYPES = [ '.jpg', '.jpeg', '.png', '.gif' ];
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const uploadForm = document.querySelector('.img-upload__form');
const hashtags = uploadForm.querySelector('.text__hashtags');
const description = uploadForm.querySelector('.text__description');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const formCancelButton = uploadForm.querySelector('.img-upload__cancel');
const decreaseScaleControl = uploadForm.querySelector('.scale__control--smaller');
const increaseScaleControl = uploadForm.querySelector('.scale__control--bigger');
const visualEffects = uploadForm.querySelector('.effects__list');
const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const slider = uploadForm.querySelector('.effect-level__slider');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const successMessageTemplate = document.querySelector(`#${MessageType.SUCCESS}`)
  .content
  .querySelector(`.${MessageType.SUCCESS}`);
const errorMessageTemplate = document.querySelector(`#${MessageType.ERROR}`)
  .content
  .querySelector(`.${MessageType.ERROR}`);

const onCancelButtonClick = (evt) => {
  evt.preventDefault();

  closeUploadPopup();
};

const onDocumentKeydown = (evt) => {
  if(!isEscapeKey(evt)) {
    return;
  }

  const errorMessagePopup = document.querySelector(`.${MessageType.ERROR}`);

  if (errorMessagePopup) {
    errorMessagePopup.remove();
  } else {
    closeUploadPopup();
  }
};

const onDescriptionKeydown = (evt) => evt.stopPropagation();

const onHashtagsKeydown = (evt) => evt.stopPropagation();

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = validateForm();
  if (isValid) {
    blockSubmitButton();
    sendData(
      new FormData(evt.target),
      () => {
        closeUploadPopup();
        showMessagePopup(successMessageTemplate, MessageType.SUCCESS);
      },
      () => showMessagePopup(errorMessageTemplate, MessageType.ERROR)
    )
      .finally(unblockSubmitButton);
  }
};

const openFile = (file) => {
  const fileName = file.name.toLowerCase();
  const isValidFileType = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
  if (isValidFileType) {
    const url = URL.createObjectURL(file);
    previewImage.src = url;
    effectsPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${url})`;
    });
  } else {
    throw new Error(`Некорректный тип у файла ${fileName}`);
  }
};

const openUploadPopup = () => {
  try {
    openFile(uploadInput.files[0]);
  } catch (e) {
    showError(e.message);
    return;
  }

  changeVisualEffect(getDefaultEffectName());

  noUiSlider.create(slider, getDefaultOptions());
  slider.noUiSlider.on('update', onSliderUpdate);

  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  formCancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  decreaseScaleControl.addEventListener('click', onDecreaseScaleControlClick);
  increaseScaleControl.addEventListener('click', onIncreaseScaleControlClick);
  visualEffects.addEventListener('click', onVisualEffectClick);
  hashtags.addEventListener('keydown', onHashtagsKeydown);
  description.addEventListener('keydown', onDescriptionKeydown);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
};

const setUploadInputChange = (cb) => {
  uploadInput.addEventListener('change', cb);
};

function closeUploadPopup () {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  uploadForm.reset();
  previewImage.style.transform = 'none';
  slider.noUiSlider.destroy();
  resetFormValidator();

  formCancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  decreaseScaleControl.removeEventListener('click', onDecreaseScaleControlClick);
  increaseScaleControl.removeEventListener('click', onIncreaseScaleControlClick);
  visualEffects.removeEventListener('click', onVisualEffectClick);
  hashtags.removeEventListener('keydown', onHashtagsKeydown);
  description.removeEventListener('keydown', onDescriptionKeydown);
  uploadForm.removeEventListener('submit', onUploadFormSubmit);
}

createFormValidator(uploadForm);

export { setUploadInputChange, openUploadPopup };

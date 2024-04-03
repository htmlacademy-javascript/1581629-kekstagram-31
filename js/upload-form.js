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
import { sendData } from './api.js';
import { showError, showMessagePopup } from './messages.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
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
  if(isEscapeKey(evt)) {
    const errorMessagePopup = document.querySelector(`.${MessageType.ERROR}`);

    if (errorMessagePopup) {
      errorMessagePopup.remove();
    } else {
      closeUploadPopup();
    }
  }
};

const onDescriptionKeydown = (evt) => evt.stopPropagation();

const onHashtagsKeydown = (evt) => evt.stopPropagation();

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateDescription = (text) => text.length <= MAX_DESCRIPTION_LENGTH;

const validateHashtagsFormat = (tags) => tags.length === 0 || tags.replace(/\s+/g, ' ')
  .split(' ')
  .every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag));

const validateHashtagsCount = (tags) => tags.replace(/\s+/g, ' ')
  .split(' ')
  .length <= MAX_HASHTAGS_COUNT;

const validateHashtagsDuplicates = (tags) => tags.replace(/\s+/g, ' ')
  .split(' ')
  .map((value) => value.toLowerCase())
  .filter((value, index, values) => values.indexOf(value) !== index)
  .length === 0;

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

  const isValid = pristine.validate();
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

const openUploadPopup = () => {
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

uploadInput.addEventListener('change', () => {
  openUploadPopup();
});

function closeUploadPopup () {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  uploadForm.reset();
  previewImage.style.transform = 'none';
  slider.noUiSlider.destroy();
  pristine.reset();

  formCancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  decreaseScaleControl.removeEventListener('click', onDecreaseScaleControlClick);
  increaseScaleControl.removeEventListener('click', onIncreaseScaleControlClick);
  visualEffects.removeEventListener('click', onVisualEffectClick);
  hashtags.removeEventListener('keydown', onHashtagsKeydown);
  description.removeEventListener('keydown', onDescriptionKeydown);
  uploadForm.removeEventListener('submit', onUploadFormSubmit);
}

pristine.addValidator(
  description,
  validateDescription,
  'Длина комментария должна быть не более 140 символов'
);

pristine.addValidator(
  hashtags,
  validateHashtagsFormat,
  'Неверный формат хэштегов'
);

pristine.addValidator(
  hashtags,
  validateHashtagsCount,
  `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэштегов`
);

pristine.addValidator(
  hashtags,
  validateHashtagsDuplicates,
  'Один и тот же хэштег не может быть использован дважды'
);

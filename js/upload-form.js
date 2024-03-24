import '/vendor/pristine/pristine.min.js';
import { isEscapeKey } from './utils.js';

const MAX_HASHTAGS_COUNT = 5;

const uploadForm = document.querySelector('.img-upload__form');
const hashtags = uploadForm.querySelector('.text__hashtags');
const description = uploadForm.querySelector('.text__description');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const formCancelButton = uploadForm.querySelector('.img-upload__cancel');

const onCancelButtonClick = (evt) => {
  evt.preventDefault();

  closeUploadPopup();
};

const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    closeUploadPopup();
  }
};

const onDescriptionKeydown = (evt) => evt.stopPropagation();

const onHashtagsKeydown = (evt) => evt.stopPropagation();

function closeUploadPopup () {
  document.body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  uploadForm.reset();

  formCancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  description.removeEventListener('keydown', onDescriptionKeydown);
  hashtags.removeEventListener('keydown', onHashtagsKeydown);
}

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateDescription = (text) => text.length <= 140;

const validateHashtagsFormat = (tags) => tags.length === 0 || tags.split(' ')
  .every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag));

const validateHashtagsCount = (tags) => tags.split(' ')
  .length <= MAX_HASHTAGS_COUNT;

const validateHashtagsDuplicates = (tags) => tags.split(' ')
  .map((value) => value.toLowerCase())
  .filter((value, index, values) => values.indexOf(value) !== index)
  .length === 0;

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

uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

const openUploadPopup = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  formCancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  description.addEventListener('keydown', onDescriptionKeydown);
  hashtags.addEventListener('keydown', onHashtagsKeydown);
};

export { openUploadPopup };

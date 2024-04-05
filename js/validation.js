const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const uploadForm = document.querySelector('.img-upload__form');
const description = uploadForm.querySelector('.text__description');
const hashtags = uploadForm.querySelector('.text__hashtags');

let pristine;

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

const initValidationRules = () => {
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
};

const createFormValidator = (form) => {
  pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  initValidationRules();
};

const validateForm = () => pristine.validate();

const destroyFormValidator = () => pristine.destroy();

export {
  createFormValidator,
  validateForm,
  destroyFormValidator
};

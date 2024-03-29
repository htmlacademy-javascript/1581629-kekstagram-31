const uploadForm = document.querySelector('.img-upload__form');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const slider = uploadForm.querySelector('.effect-level__slider');
const effectLevel = uploadForm.querySelector('.effect-level__value');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');

const DEFAULT_EFFECT_NAME = 'none';
let currentEffect;

const effectsMap = {
  none: {
    filter: 'none',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
      connect: 'lower',
    },
    unit: '',
  },
  chrome: {
    filter: 'grayscale',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
    unit: ''
  },
  marvin: {
    filter: 'invert',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 100,
    },
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
    unit: ''
  },
};

const getDefaultEffectName = () => DEFAULT_EFFECT_NAME;
const getDefaultOptions = () => effectsMap.none.options;

const onSliderUpdate = () => {
  effectLevel.value = slider.noUiSlider.get();
  previewImage.style.filter = `${currentEffect.filter}(${effectLevel.value}${currentEffect.unit})`;
};

const changeVisualEffect = (effectName) => {
  currentEffect = effectsMap[effectName];

  if (effectName === DEFAULT_EFFECT_NAME) {
    sliderContainer.classList.add('hidden');
    previewImage.style.filter = currentEffect.filter;
    effectLevel.value = currentEffect.options.start;
    return;
  }

  previewImage.style.filter = `${currentEffect.filter}(${effectLevel.value}${currentEffect.unit ?? ''})`;
  effectLevel.value = currentEffect.options.start;
  slider.noUiSlider.updateOptions(currentEffect.options);
  sliderContainer.classList.remove('hidden');
};

const onVisualEffectClick = (evt) => {
  const effectLabel = evt.target.closest('.effects__label');
  if (effectLabel) {
    changeVisualEffect(effectLabel.parentNode.firstElementChild.value);
  }
};

export {
  changeVisualEffect,
  getDefaultEffectName,
  onSliderUpdate,
  onVisualEffectClick,
  getDefaultOptions
};

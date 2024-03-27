const uploadForm = document.querySelector('.img-upload__form');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const slider = uploadForm.querySelector('.effect-level__slider');
const effectLevel = uploadForm.querySelector('.effect-level__value');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');

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

const getDefaultEffect = () => effectsMap.none;
const getDefaultOptions = () => effectsMap.none.options;

const onSliderUpdate = () => {
  effectLevel.value = slider.noUiSlider.get();
  currentEffect ??= getDefaultEffect();
  previewImage.style.filter = `${currentEffect.filter}(${effectLevel.value}${currentEffect.unit})`;
};

const initVisualEffect = () => {
  currentEffect = getDefaultEffect();

  effectLevel.value = currentEffect.options.start;
  sliderContainer.classList.add('hidden');

  slider.noUiSlider.updateOptions(currentEffect.options);
};

const changeVisualEffect = (effectName) => {
  currentEffect = effectsMap[effectName];

  if (effectName === 'none') {
    previewImage.style.filter = currentEffect.filter;
    sliderContainer.classList.add('hidden');
    effectLevel.value = currentEffect.options.start;
    return;
  }

  sliderContainer.classList.remove('hidden');

  effectLevel.value = currentEffect.options.start;

  previewImage.style.filter = `${currentEffect.filter}(${effectLevel.value}${currentEffect.unit ?? ''})`;

  slider.noUiSlider.updateOptions(currentEffect.options);
};

const onVisualEffectClick = (evt) => {
  if (evt.target.tagName === 'INPUT') {
    changeVisualEffect(evt.target.value);
  }
};

export {
  initVisualEffect,
  onSliderUpdate,
  onVisualEffectClick,
  getDefaultOptions
};

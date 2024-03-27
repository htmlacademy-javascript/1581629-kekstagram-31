import '/vendor/nouislider/nouislider.js';
import { createPhotos } from './data-generation.js';
import { renderThumbnails } from './thumbnails.js';
import { openUploadPopup } from './upload-form.js';
import { onSliderUpdate, getDefaultOptions } from './visual-effects.js';

const slider = document.querySelector('.effect-level__slider');

renderThumbnails(createPhotos());

document.querySelector('.img-upload__input').addEventListener('change', () => {
  openUploadPopup();
});

noUiSlider.create(slider, getDefaultOptions());
slider.noUiSlider.on('update', onSliderUpdate);

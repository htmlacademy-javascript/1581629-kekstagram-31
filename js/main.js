import { createPhotos } from './data-generation.js';
import { renderThumbnails } from './thumbnails.js';
import { openUploadPopup } from './upload-form.js';

renderThumbnails(createPhotos());

document.querySelector('.img-upload__input').addEventListener('change', () => {
  openUploadPopup();
});

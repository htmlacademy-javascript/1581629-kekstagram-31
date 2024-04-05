import { renderThumbnails } from './thumbnails.js';
import { setUploadInputChange, openUploadPopup } from './upload-form.js';
import { getData } from './api.js';
import { showError } from './messages.js';
import { setFilterClick, applyFilter } from './image-filters.js';

const imageFilters = document.querySelector('.img-filters');

getData(
  (photos) => {
    renderThumbnails(photos);
    imageFilters.classList.remove('img-filters--inactive');
    setFilterClick(() => applyFilter(photos));
  },
  () => showError('Не удалось загрузить данные')
);

setUploadInputChange(() => openUploadPopup());

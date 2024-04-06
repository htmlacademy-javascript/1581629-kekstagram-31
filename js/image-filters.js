import { renderThumbnails } from './thumbnails.js';
import { debounce } from './utils.js';

const MAX_RANDOM_PHOTOS_COUNT = 10;
const ACTIVE_FILTER_BUTTON_CLASS = 'img-filters__button--active';
const RERENDER_DELAY = 500;
const Filter = {
  DEFAILT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const imageFiltersForm = document.querySelector('.img-filters__form');
let selectedFilterName = Filter.DEFAILT;

const setFilterClick = (cb) => {
  const debounceRender = debounce(cb, RERENDER_DELAY);

  imageFiltersForm.addEventListener('click', (evt) => {
    const currentFilter = imageFiltersForm.querySelector(`.${ACTIVE_FILTER_BUTTON_CLASS}`);
    const selectedFilter = evt.target;

    if (selectedFilter === currentFilter) {
      return;
    }

    currentFilter.classList.toggle(ACTIVE_FILTER_BUTTON_CLASS);
    selectedFilter.classList.toggle(ACTIVE_FILTER_BUTTON_CLASS);
    selectedFilterName = selectedFilter.id;

    debounceRender();
  });
};

const applyFilter = (photos) => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());

  let filteredPhotos = photos.slice();
  if (selectedFilterName === Filter.DISCUSSED) {
    filteredPhotos.sort((photo1, photo2) => photo2.comments.length - photo1.comments.length);
  } else if (selectedFilterName === Filter.RANDOM) {
    filteredPhotos = filteredPhotos.sort(() => 0.5 - Math.random()).slice(0, MAX_RANDOM_PHOTOS_COUNT);
  }

  renderThumbnails(filteredPhotos);
};

export { setFilterClick, applyFilter };

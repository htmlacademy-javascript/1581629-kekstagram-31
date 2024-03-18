import { createPhotos } from './data-generation.js';
import { renderThumbnails } from './thumbnails.js';
import { renderBigPhoto } from './big-photo.js';

const photos = createPhotos();

renderThumbnails(photos);

document.querySelector('.pictures').addEventListener('click', (evt) => {
  const thumbnailPicture = evt.target.closest('.picture');

  if (thumbnailPicture) {
    evt.preventDefault();

    const selectedPhotoId = Number(thumbnailPicture.dataset.id);
    const selectedPhoto = photos.find((photo) => photo.id === selectedPhotoId);

    renderBigPhoto(selectedPhoto);
  }
});

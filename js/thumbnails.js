import { renderBigPhoto } from './big-photo.js';

const picturesContainer = document.querySelector('.pictures');
const userImageTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({id, url, description, likes, comments}) => {
  const thumbnail = userImageTemplate.cloneNode(true);
  const pictureImage = thumbnail.querySelector('.picture__img');
  const pictureLikes = thumbnail.querySelector('.picture__likes');
  const pictureComments = thumbnail.querySelector('.picture__comments');

  thumbnail.dataset.id = id;
  pictureImage.src = url;
  pictureImage.alt = description;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (photos) => {
  picturesContainer.addEventListener('click', (evt) => {
    const thumbnailPicture = evt.target.closest('.picture');

    if (thumbnailPicture) {
      evt.preventDefault();

      const selectedPhotoId = Number(thumbnailPicture.dataset.id);
      const selectedPhoto = photos.find((photo) => photo.id === selectedPhotoId);

      renderBigPhoto(selectedPhoto);
    }
  });

  const userPhotoFragment = document.createDocumentFragment();
  userPhotoFragment.append(...photos.map(createThumbnail));
  picturesContainer.append(userPhotoFragment);
};

export { renderThumbnails };

import { isEscapeKey } from './utils.js';
import { renderComments } from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancelButton = bigPicture.querySelector('.big-picture__cancel');

const onCancelButtonClick = (evt) => {
  evt.preventDefault();

  closePopup();
};

const onDocumentKeydown = (evt) => {
  evt.preventDefault();

  if(isEscapeKey(evt)) {
    closePopup();
  }
};

function closePopup () {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  bigPictureCancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const openPopup = () => {
  bigPictureCancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const renderBigPhoto = (photo) => {
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');

  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  renderComments(photo.comments);

  bigPicture.querySelector('.social__comment-shown-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__comment-total-count').textContent = photo.comments.length;

  openPopup();
};

export { renderBigPhoto };

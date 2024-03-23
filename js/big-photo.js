import { isEscapeKey } from './utils.js';
import { renderComments, getCommentTemplate, clearComments } from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const bitPictureCommentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureCancelButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');

const COMMENTS_PAGE_SIZE = 5;
let allComments = [];
let getNextPage;
let commentTemplate;

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

const createPaginator = () => {
  let pageNumber = 0;

  return () => ++pageNumber;
};

const renderNextCommentsPage = () => {
  const pageNumber = getNextPage();

  const minRenderableCommentIndex = (pageNumber - 1) * COMMENTS_PAGE_SIZE;
  const maxRenderableCommentIndex = Math.min(allComments.length, pageNumber * COMMENTS_PAGE_SIZE) - 1;

  renderComments(commentTemplate, allComments.slice(minRenderableCommentIndex, maxRenderableCommentIndex + 1));

  if (maxRenderableCommentIndex + 1 === allComments.length) {
    commentsLoaderButton.classList.add('hidden');
  }
  bitPictureCommentsShownCount.textContent = maxRenderableCommentIndex + 1;
};

const onCommentsLoaderClick = () => {
  renderNextCommentsPage();
};

function closePopup () {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  bigPictureCancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderButton.removeEventListener('click', onCommentsLoaderClick);
}

const openPopup = () => {
  bigPictureCancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderButton.addEventListener('click', onCommentsLoaderClick);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const renderBigPhoto = (photo) => {
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  commentTemplate = getCommentTemplate();
  clearComments();

  allComments = photo.comments;
  getNextPage = createPaginator();
  commentsLoaderButton.classList.remove('hidden');

  renderNextCommentsPage();

  bigPicture.querySelector('.social__comment-total-count').textContent = allComments.length;

  openPopup();
};

export { renderBigPhoto };

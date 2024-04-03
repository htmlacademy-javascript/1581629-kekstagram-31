const bigPictureComments = document.querySelector('.social__comments');
let commentTemplate;

const createComment = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);

  const commentAvatar = comment.querySelector('.social__picture');
  const commentText = comment.querySelector('.social__text');

  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  commentText.textContent = message;

  return comment;
};

const renderComments = (elementTemplate, comments) => {
  commentTemplate = elementTemplate;
  const commentsFragment = document.createDocumentFragment();
  commentsFragment.append(...comments.map(createComment));
  bigPictureComments.append(commentsFragment);
};

const getCommentTemplate = () => bigPictureComments
  .querySelector('.social__comment')
  .cloneNode(true);

const clearComments = () => {
  bigPictureComments.innerHTML = '';
};

export { renderComments, getCommentTemplate, clearComments };

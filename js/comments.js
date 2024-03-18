const bigPictureComments = document.querySelector('.social__comments');
const commentTemplate = bigPictureComments.querySelector('.social__comment');

const createComment = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);

  const commentAvatar = comment.querySelector('.social__picture');
  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  commentsFragment.append(...comments.map(createComment));
  bigPictureComments.innerHTML = '';
  bigPictureComments.append(commentsFragment);
};

export { renderComments };

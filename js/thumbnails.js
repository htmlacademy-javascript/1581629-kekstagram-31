const userImageTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({id, url, description, likes, comments}) => {
  const thumbnail = userImageTemplate.cloneNode(true);

  thumbnail.dataset.id = id;
  const pictureImage = thumbnail.querySelector('.picture__img');
  pictureImage.src = url;
  pictureImage.alt = description;

  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const userPhotoFragment = document.createDocumentFragment();
  userPhotoFragment.append(...photos.map(createThumbnail));
  document.querySelector('.pictures').append(userPhotoFragment);
};

export { renderThumbnails };

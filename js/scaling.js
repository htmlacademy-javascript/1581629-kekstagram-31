const scaleControl = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

const onDecreaseScaleControlClick = () => {
  const percent = Math.max(parseInt(scaleControl.value, 10) - 25, 25);
  scaleControl.value = `${percent}%`;
  previewImage.style.transform = `scale(${percent / 100})`;
};

const onIncreaseScaleControlClick = () => {
  const percent = Math.min(parseInt(scaleControl.value, 10) + 25, 100);
  scaleControl.value = `${percent}%`;
  previewImage.style.transform = `scale(${percent / 100})`;
};

export {
  onDecreaseScaleControlClick,
  onIncreaseScaleControlClick
};

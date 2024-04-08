const MIN_SCALE_PERCENT = 25;
const MAX_SCALE_PERCENT = 100;
const SCALE_STEP = 25;

const scaleControl = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

const onDecreaseScaleControlClick = () => {
  const percent = Math.max(parseInt(scaleControl.value, 10) - SCALE_STEP, MIN_SCALE_PERCENT);
  scaleControl.value = `${percent}%`;
  previewImage.style.transform = `scale(${percent / 100})`;
};

const onIncreaseScaleControlClick = () => {
  const percent = Math.min(parseInt(scaleControl.value, 10) + SCALE_STEP, MAX_SCALE_PERCENT);
  scaleControl.value = `${percent}%`;
  previewImage.style.transform = `scale(${percent / 100})`;
};

export {
  onDecreaseScaleControlClick,
  onIncreaseScaleControlClick
};

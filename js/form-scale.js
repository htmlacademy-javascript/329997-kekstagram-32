import { imgUploadPreview } from './form-filters.js';

const SCALE_MAX = 100;
const SCALE_MIN = 25;
const SCALE_STEP = 25;

const imgScaleForm = document.querySelector('.img-upload__scale');
const imgScaleSmaller = imgScaleForm.querySelector('.scale__control--smaller');
const imgScaleBigger = imgScaleForm.querySelector('.scale__control--bigger');
const imgScaleValue = imgScaleForm.querySelector('.scale__control--value');

const setDefaultScaleValue = () => imgUploadPreview.removeAttribute('style');

const getCurrentScaleValue = () => parseInt(imgScaleValue.value, 10);

const onSmallerScaleClick = () => {
  let currentScale = getCurrentScaleValue();
  if (currentScale > SCALE_MIN) {
    currentScale -= SCALE_STEP;
    imgUploadPreview.setAttribute('style', `transform: scale(${currentScale / 100})`);
    imgScaleValue.value = `${currentScale}%`;
  }
};

const onBiggerScaleClick = () => {
  let currentScale = getCurrentScaleValue();
  if (currentScale < SCALE_MAX) {
    currentScale += SCALE_STEP;
    imgUploadPreview.setAttribute('style', `transform: scale(${currentScale / 100})`);
    imgScaleValue.value = `${currentScale}%`;
  }
};

imgScaleSmaller.addEventListener('click', onSmallerScaleClick);

imgScaleBigger.addEventListener('click', onBiggerScaleClick);

export { setDefaultScaleValue };

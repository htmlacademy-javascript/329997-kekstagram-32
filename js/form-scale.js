import { imgUploadPreview } from './form-filters.js';
import { getValueInRange } from './utils.js';

const Scale = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};

const imgScaleForm = document.querySelector('.img-upload__scale');
const imgScaleSmaller = imgScaleForm.querySelector('.scale__control--smaller');
const imgScaleBigger = imgScaleForm.querySelector('.scale__control--bigger');
const imgScaleValue = imgScaleForm.querySelector('.scale__control--value');

const getCurrentScaleValue = () => parseInt(imgScaleValue.value, 10);

const changeScale = (step) => {
  const currentScale = getCurrentScaleValue();
  const newScale = getValueInRange(currentScale + step, Scale.MIN, Scale.MAX);
  imgUploadPreview.style.transform = `scale(${newScale / 100})`;
  imgScaleValue.value = `${newScale}%`;
};

const onSmallerScaleClick = () => changeScale(-Scale.STEP);
const onBiggerScaleClick = () => changeScale(Scale.STEP);

imgScaleSmaller.addEventListener('click', onSmallerScaleClick);
imgScaleBigger.addEventListener('click', onBiggerScaleClick);

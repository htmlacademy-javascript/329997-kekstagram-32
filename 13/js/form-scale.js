import { imageUploadPreview } from './form-filters.js';
import { getValueInRange } from './utils.js';

const Scale = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};

const imageScaleForm = document.querySelector('.img-upload__scale');
const imageScaleSmaller = imageScaleForm.querySelector('.scale__control--smaller');
const imageScaleBigger = imageScaleForm.querySelector('.scale__control--bigger');
const imageScaleValue = imageScaleForm.querySelector('.scale__control--value');

const getCurrentScaleValue = () => parseInt(imageScaleValue.value, 10);

const changeScale = (step) => {
  const currentScale = getCurrentScaleValue();
  const newScale = getValueInRange(currentScale + step, Scale.MIN, Scale.MAX);
  imageUploadPreview.style.transform = `scale(${newScale / 100})`;
  imageScaleValue.value = `${newScale}%`;
};

const onSmallerScaleClick = () => changeScale(-Scale.STEP);
const onBiggerScaleClick = () => changeScale(Scale.STEP);

imageScaleSmaller.addEventListener('click', onSmallerScaleClick);
imageScaleBigger.addEventListener('click', onBiggerScaleClick);

import { isEscapeKey } from './utils.js';
import { pristine } from './form-validator.js';
import { setDefaultFormStyles } from './form-filters.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancelButton = imgUploadForm.querySelector('.img-upload__cancel');
const inputHashtags = imgUploadForm.querySelector('.text__hashtags');
const inputComment = imgUploadForm.querySelector('.text__description');

const hideForm = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const showForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const resetForm = () => {
  imgUploadForm.reset();
  pristine.reset();
  setDefaultFormStyles();
};

const onDocumentKeydown = (evt) => {
  if (document.activeElement === inputHashtags || document.activeElement === inputComment) {
    evt.stopPropagation();
    return;
  }
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.removeEventListener('keydown', onDocumentKeydown);
    hideForm();
    resetForm();
  }
};

const onCloseButtonClick = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  hideForm();
  resetForm();
};

const onUploadClick = () => {
  showForm();
  imgUploadCancelButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  setDefaultFormStyles();
};

imgUploadInput.addEventListener('change', onUploadClick);


import { isEscapeKey } from './utils';
import { pristine } from './form-validator';
import { setDefaultScaleValue } from './form-scale';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancelButton = imgUploadForm.querySelector('.img-upload__cancel');
const inputHashtags = imgUploadForm.querySelector('.text__hashtags');
const inputComment = imgUploadForm.querySelector('.text__description');

function onCloseButtonClick () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadCancelButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadForm.reset();
  pristine.reset();
  setDefaultScaleValue();
}

function onDocumentKeydown (evt) {
  if (document.activeElement === inputHashtags || document.activeElement === inputComment) {
    evt.stopPropagation();
    return;
  }
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    imgUploadCancelButton.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    imgUploadForm.reset();
    pristine.reset();
    setDefaultScaleValue();
  }
}

const onUploadClick = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgUploadCancelButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

imgUploadInput.addEventListener('change', onUploadClick);


import { isEscapeKey } from './utils.js';
import { pristine } from './form-validator.js';
import { setDefaultFormStyles } from './form-filters.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_PREVIEW_FILE = 'img/upload-default-image.jpg';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancelButton = imageUploadForm.querySelector('.img-upload__cancel');
const inputHashtags = imageUploadForm.querySelector('.text__hashtags');
const inputComment = imageUploadForm.querySelector('.text__description');
const imageUploadPreview = imageUploadForm.querySelector('.img-upload__preview > img');
const filtersPreview = document.querySelectorAll('.effects__preview');

const hideForm = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showForm = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const resetForm = () => {
  imageUploadForm.reset();
  pristine.reset();
  setDefaultFormStyles();
};

function onDocumentKeydown (evt) {
  if (document.activeElement === inputHashtags || document.activeElement === inputComment) {
    evt.stopPropagation();
    return;
  }
  if (!document.body.contains(document.querySelector('.error')) && isEscapeKey(evt)) {
    evt.preventDefault();
    hideForm();
    resetForm();
  }
}

const onCloseButtonClick = () => {
  hideForm();
  resetForm();
};

const onUploadClick = () => {
  showForm();
  imageUploadCancelButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  setDefaultFormStyles();
};

const setFilterPreview = (src) => {
  filtersPreview.forEach((element) => {
    element.style.backgroundImage = `url('${src}')`;
  });
};

imageUploadInput.addEventListener('change', onUploadClick);

imageUploadInput.addEventListener('change', () => {
  const file = imageUploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  if (matches) {
    imageUploadPreview.src = URL.createObjectURL(file);
  } else {
    imageUploadPreview.src = DEFAULT_PREVIEW_FILE;
  }
  setFilterPreview(imageUploadPreview.src);
});

export { hideForm, resetForm };

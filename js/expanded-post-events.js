import { isEscapeKey, scrollTop } from './utils.js';
import { fillPopupWindow, getThumbnailId, renderComments } from './expanded-post-data.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const bigPictureCommentsLoader = bigPictureContainer.querySelector('.social__comments-loader');
const userPicturesThumbnails = document.querySelector('.pictures');

let currentThumbnaillId;

const onLoadButtonClick = () => {
  renderComments(currentThumbnaillId, true);
};

const hideBigPicture = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const showBigPicture = () => {
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.removeEventListener('keydown', onDocumentKeydown);
    hideBigPicture();
  }
};

const onCloseButtonClick = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  hideBigPicture();
};

const openPopupWindow = () => {
  showBigPicture();
  bigPictureCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

userPicturesThumbnails.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    const thumbnail = evt.target.closest('.picture');
    const thumbnailImage = thumbnail.querySelector('.picture__img');
    evt.preventDefault();
    openPopupWindow();
    currentThumbnaillId = getThumbnailId(thumbnailImage.getAttribute('src'));
    fillPopupWindow(currentThumbnaillId);
    scrollTop(bigPictureContainer);
    bigPictureCommentsLoader.addEventListener('click', onLoadButtonClick);
  }
});

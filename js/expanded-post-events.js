import { isEscapeKey, scrollTop } from './utils';
import { fillPopupWindow, getThumbnailId, renderComments } from './expanded-post-data.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const bigPictureCommentsLoader = bigPictureContainer.querySelector('.social__comments-loader');
const userPicturesThumbnails = document.querySelector('.pictures');

let currentThumbnaillId;

function onCloseButtonClick () {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCloseButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCommentsLoader.removeEventListener('click', onLoadButtonClick);
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPictureCloseButton.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    bigPictureCommentsLoader.removeEventListener('click', onLoadButtonClick);
  }
}

const onLoadButtonClick = () => {
  renderComments(currentThumbnaillId, true);

}

const openPopupWindow = () => {
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const onThumbnailClick = (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    evt.preventDefault();
    openPopupWindow();
    currentThumbnaillId = getThumbnailId(evt.target.getAttribute('src'));
    fillPopupWindow(currentThumbnaillId);
    scrollTop(bigPictureContainer);
    bigPictureCommentsLoader.addEventListener('click', onLoadButtonClick);
  }
};

userPicturesThumbnails.addEventListener('click', onThumbnailClick);

import { isEscapeKey, scrollTop } from './utils';
import { fillPopupWindow, getThumbnailId } from './expanded-post-data.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const bigPictureCommentCount = bigPictureContainer.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPictureContainer.querySelector('.social__comments-loader');
const userPicturesThumbnails = document.querySelector('.pictures');

function onCloseButtonClick () {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCloseButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPictureCloseButton.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
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
    const thumbnailId = getThumbnailId(evt.target.getAttribute('src'));
    fillPopupWindow(thumbnailId);
    bigPictureCommentCount.classList.add('hidden');
    bigPictureCommentsLoader.classList.add('hidden');
    scrollTop(bigPictureContainer);
  }
};

userPicturesThumbnails.addEventListener('click', onThumbnailClick);

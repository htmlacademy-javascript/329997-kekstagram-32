import { isEscapeKey, scrollTop } from './utils';
import { usersPosts } from './thumbnails';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const bigPictureDiv = bigPictureContainer.querySelector('.big-picture__img');
const bigPictureImg = bigPictureDiv.querySelector('img');
const bigPictureLikesCount = bigPictureContainer.querySelector('.likes-count');
const bigPictureCaption = bigPictureContainer.querySelector('.social__caption');
const bigPictureCommentCount = bigPictureContainer.querySelector('.social__comment-count');
const bigPictureCommentShownCount = bigPictureContainer.querySelector('.social__comment-shown-count');
const bigPictureCommentTotalCount = bigPictureContainer.querySelector('.social__comment-total-count');
const bigPictureComments = bigPictureContainer.querySelector('.social__comments');
const bigPictureCommentsLoader = bigPictureContainer.querySelector('.social__comments-loader');

const userPicturesThumbnails = document.querySelector('.pictures');

const getThumbnailId = (src) => {
  for (let i = 0; i < usersPosts.length; i++) {
    for (const property in usersPosts[i]) {
      if (usersPosts[i][property] === src) {
        return i;
      }
    }
  }
};

const closePopupByClick = () => {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCloseButton.removeEventListener('click', closePopupByClick);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', closePopupByKeydown);
};

const closePopupByKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureContainer.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closePopupByKeydown);
    bigPictureCloseButton.removeEventListener('click', closePopupByClick);
  }
};

const openPopupWindow = () => {
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCloseButton.addEventListener('click', closePopupByClick);
  document.addEventListener('keydown', closePopupByKeydown);
};

const getCommentsList = (id) => {
  usersPosts[id].comments.forEach(({avatar, message, name}) => {
    bigPictureComments.insertAdjacentHTML('beforeend',
      `<li class="social__comment">
        <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
        <p class="social__text">${message}</p>
      </li>`
    );
  });
};

const fillPopupWindow = (id) => {
  bigPictureImg.src = usersPosts[id].url;
  bigPictureImg.atl = usersPosts[id].description;
  bigPictureLikesCount.textContent = usersPosts[id].likes;
  bigPictureCaption.textContent = usersPosts[id].description;
  bigPictureCommentShownCount.textContent = usersPosts[id].comments.length;
  bigPictureCommentTotalCount.textContent = usersPosts[id].comments.length;
  getCommentsList(id);
};

const onThumbnailClick = (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    evt.preventDefault();
    openPopupWindow();
    fillPopupWindow(getThumbnailId(evt.target.getAttribute('src')));
    bigPictureCommentCount.classList.add('hidden');
    bigPictureCommentsLoader.classList.add('hidden');
    scrollTop(bigPictureContainer);
  }
};

userPicturesThumbnails.addEventListener('click', onThumbnailClick);

import { usersPosts } from './thumbnails';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureDiv = bigPictureContainer.querySelector('.big-picture__img');
const bigPictureImg = bigPictureDiv.querySelector('img');
const bigPictureLikesCount = bigPictureContainer.querySelector('.likes-count');
const bigPictureCaption = bigPictureContainer.querySelector('.social__caption');
const bigPictureCommentShownCount = bigPictureContainer.querySelector('.social__comment-shown-count');
const bigPictureCommentTotalCount = bigPictureContainer.querySelector('.social__comment-total-count');
const bigPictureComments = bigPictureContainer.querySelector('.social__comments');

const getThumbnailId = (src) => usersPosts.findIndex(({url}) => url === src);

const renderComments = (id) => {
  const comments = usersPosts[id].comments.map(({avatar, message, name}) => `<li class="social__comment"><img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35"><p class="social__text">${message}</p></li>`);
  return comments.join('');
};

const fillPopupWindow = (id) => {
  bigPictureImg.src = usersPosts[id].url;
  bigPictureImg.alt = usersPosts[id].description;
  bigPictureLikesCount.textContent = usersPosts[id].likes;
  bigPictureCaption.textContent = usersPosts[id].description;
  bigPictureCommentShownCount.textContent = usersPosts[id].comments.length;
  bigPictureCommentTotalCount.textContent = usersPosts[id].comments.length;
  bigPictureComments.insertAdjacentHTML('beforeend', renderComments(id));
};

export { fillPopupWindow, getThumbnailId };

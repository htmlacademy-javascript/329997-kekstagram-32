import { usersPosts } from './thumbnails';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureDiv = bigPictureContainer.querySelector('.big-picture__img');
const bigPictureImg = bigPictureDiv.querySelector('img');
const bigPictureLikesCount = bigPictureContainer.querySelector('.likes-count');
const bigPictureCaption = bigPictureContainer.querySelector('.social__caption');
const bigPictureCommentShownCount = bigPictureContainer.querySelector('.social__comment-shown-count');
const bigPictureCommentTotalCount = bigPictureContainer.querySelector('.social__comment-total-count');
const bigPictureComments = bigPictureContainer.querySelector('.social__comments');
const bigPictureCommentsLoader = bigPictureContainer.querySelector('.social__comments-loader');

const COMMENTS_SHOWN = 5;
const COMMENTS_LOAD = 5;

const getThumbnailId = (src) => usersPosts.findIndex(({url}) => url === src);
const getCommentsList = (id) => {
  const comments = usersPosts[id].comments.map(({avatar, message, name}) => `<li class="social__comment"><img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35"><p class="social__text">${message}</p></li>`);
  return comments;
};

const getRenderedCommentsCount = (element) => element.children.length;

const renderComments = (id, load) => {
  const commentsList = getCommentsList(id);
  if (!load) {
    if (commentsList.length <= COMMENTS_SHOWN) {
      bigPictureComments.insertAdjacentHTML('beforeend', commentsList.join(''));
      isCommentsListFull(id);
      return commentsList.length;
    }
    else {
     const startedCommentsList = commentsList.slice(0, COMMENTS_SHOWN);
      bigPictureComments.insertAdjacentHTML('beforeend', startedCommentsList.join(''));
      isCommentsListFull(id);
      return startedCommentsList.length;
    }
  }
  else {
    const renderedCommentsCount = getRenderedCommentsCount(bigPictureComments);
    const renderCount = renderedCommentsCount + COMMENTS_LOAD;
    if (renderedCommentsCount <= renderCount) {
      const additionalRenderedComments = commentsList.slice(renderedCommentsCount, renderCount);
      bigPictureComments.insertAdjacentHTML('beforeend', additionalRenderedComments.join(''));
      bigPictureCommentShownCount.textContent = getRenderedCommentsCount(bigPictureComments);
      isCommentsListFull(id);
    }
  }
};

const isCommentsListFull = (id) => {
  const commentsList = getCommentsList(id);
  const renderedCommentsCount = getRenderedCommentsCount(bigPictureComments);
  if (renderedCommentsCount === commentsList.length) {
    bigPictureCommentsLoader.classList.add('hidden');
  }
  else {
    bigPictureCommentsLoader.classList.remove('hidden');
  }
};

const fillPopupWindow = (id) => {
  bigPictureImg.src = usersPosts[id].url;
  bigPictureImg.alt = usersPosts[id].description;
  bigPictureLikesCount.textContent = usersPosts[id].likes;
  bigPictureCaption.textContent = usersPosts[id].description;
  bigPictureCommentShownCount.textContent = renderComments(id, false);
  bigPictureCommentTotalCount.textContent = usersPosts[id].comments.length;
  bigPictureComments.innerHTML = '';
  renderComments(id, false);
};

export { fillPopupWindow, getThumbnailId, renderComments };

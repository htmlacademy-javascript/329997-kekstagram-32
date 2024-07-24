import { usersPosts } from './thumbnails';

const COMMENTS_SHOWN = 5;
const COMMENTS_LOAD = 5;

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureDiv = bigPictureContainer.querySelector('.big-picture__img');
const bigPictureImg = bigPictureDiv.querySelector('img');
const bigPictureLikesCount = bigPictureContainer.querySelector('.likes-count');
const bigPictureCaption = bigPictureContainer.querySelector('.social__caption');
const bigPictureCommentShownCount = bigPictureContainer.querySelector('.social__comment-shown-count');
const bigPictureCommentTotalCount = bigPictureContainer.querySelector('.social__comment-total-count');
const bigPictureComments = bigPictureContainer.querySelector('.social__comments');
const bigPictureCommentsLoader = bigPictureContainer.querySelector('.social__comments-loader');

const getThumbnailId = (src) => usersPosts.findIndex(({url}) => url === src);
const getCommentsList = (id) => {
  const comments = usersPosts[id].comments.map(({avatar, message, name}) => `<li class="social__comment"><img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35"><p class="social__text">${message}</p></li>`);
  return comments;
};

const getRenderedCommentsCount = (element) => element.children.length;

const toggleLoadButton = (id) => {
  const commentsList = getCommentsList(id);
  const renderedCommentsCount = getRenderedCommentsCount(bigPictureComments);
  bigPictureCommentsLoader.classList.toggle('hidden', (renderedCommentsCount === commentsList.length));
};

const renderComments = (id, load) => {
  const commentsList = getCommentsList(id);
  if (load) {
    const renderedCommentsCount = getRenderedCommentsCount(bigPictureComments);
    const renderCount = renderedCommentsCount + COMMENTS_LOAD;
    if (renderedCommentsCount <= renderCount) {
      const additionalRenderedComments = commentsList.slice(renderedCommentsCount, renderCount);
      bigPictureComments.insertAdjacentHTML('beforeend', additionalRenderedComments.join(''));
      bigPictureCommentShownCount.textContent = getRenderedCommentsCount(bigPictureComments);
      toggleLoadButton(id);
    }
  } else {
    const startedCommentsList = commentsList.slice(0, COMMENTS_SHOWN);
    bigPictureComments.insertAdjacentHTML('beforeend', startedCommentsList.join(''));
    toggleLoadButton(id);
    return startedCommentsList.length;
  }
};

const fillPopupWindow = (id) => {
  const currentPost = usersPosts[id];
  bigPictureImg.src = currentPost.url;
  bigPictureImg.alt = currentPost.description;
  bigPictureLikesCount.textContent = currentPost.likes;
  bigPictureCaption.textContent = currentPost.description;
  bigPictureComments.innerHTML = '';
  bigPictureCommentShownCount.textContent = renderComments(id, false);
  bigPictureCommentTotalCount.textContent = currentPost.comments.length;
};

export { fillPopupWindow, getThumbnailId, renderComments };

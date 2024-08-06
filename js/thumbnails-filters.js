import { renderPosts } from './thumbnails.js';
import { shuffle } from './utils.js';

const RANDOM_POST_COUNT = 10;

const imageFiltersContainer = document.querySelector('.img-filters');
const imageFiltersForm = document.querySelector('.img-filters__form');
const userPicturesContainer = document.querySelector('.pictures');

const FilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let usersPosts = [];

const setUserPostsToThumbnailsFilters = (data) => {
  usersPosts = data;
};

const renderFilters = () => {
  imageFiltersContainer.classList.remove('img-filters--inactive');
};

const toggleFilterButtonClass = (id) => {
  const previousActiveButton = imageFiltersForm.querySelector('.img-filters__button--active');
  const currentActiveButton = imageFiltersForm.querySelector(`#${id}`);
  previousActiveButton.classList.remove('img-filters__button--active');
  currentActiveButton.classList.add('img-filters__button--active');
};

const clearPosts = () => {
  const renderedUserPosts = userPicturesContainer.querySelectorAll('.picture');
  renderedUserPosts.forEach((element) => element.remove());
};

const sortPosts = (postA, postB) => {
  const postCommentsA = postA.comments.length;
  const postCommentsB = postB.comments.length;
  return postCommentsB - postCommentsA;
};

const renderFilteredPosts = (id) => {
  let filteredPosts = [];
  const posts = usersPosts.slice();
  if (id === FilterId.RANDOM) {
    const shuffledPosts = shuffle(posts);
    filteredPosts = shuffledPosts.slice(0, RANDOM_POST_COUNT);
  } else if (id === FilterId.DISCUSSED) {
    const sortedPosts = posts.sort(sortPosts);
    filteredPosts = sortedPosts;
  } else {
    filteredPosts = posts;
  }
  clearPosts();
  renderPosts(filteredPosts);
};
const setRenderFilteredPostsClick = (callback) => {
  imageFiltersForm.addEventListener('click', (evt) => {
    const currentFilterId = evt.target.id;
    if (currentFilterId === '') {
      return;
    }
    const filter = Object.values(FilterId).find((element) => element === currentFilterId);
    toggleFilterButtonClass(filter);
    callback(filter);
  });
};

export { setUserPostsToThumbnailsFilters, renderFilters, setRenderFilteredPostsClick, renderFilteredPosts };

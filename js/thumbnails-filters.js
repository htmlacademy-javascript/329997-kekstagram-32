import { renderPosts } from './thumbnails.js';
import { shuffle } from './utils.js';

const RANDOM_POST_COUNT = 10;

const imageFiltersContainer = document.querySelector('.img-filters');
const imageFiltersForm = document.querySelector('.img-filters__form');

const FilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let usersPosts = [];

const getUserPostsToThumbnailsFilters = (data) => {
  usersPosts = data;
};

const renderFilters = () => {
  imageFiltersContainer.classList.remove('img-filters--inactive');
};

const toggleFilerButtonClass = (id) => {
  const previousActiveButton = imageFiltersForm.querySelector('.img-filters__button--active');
  const currentActiveButton = imageFiltersForm.querySelector(`#${id}`);
  previousActiveButton.classList.toggle('img-filters__button--active', false);
  currentActiveButton.classList.toggle('img-filters__button--active', true);
};

const clearPosts = () => {
  const userPicturesContainer = document.querySelector('.pictures');
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
  }
  else if (id === FilterId.DISCUSSED) {
    const sortedPosts = posts.sort(sortPosts);
    filteredPosts = sortedPosts;
  } else {
    filteredPosts = posts;
  }
  toggleFilerButtonClass(id);
  clearPosts();
  renderPosts(filteredPosts);
};

const onFiltersButtonsClick = (evt) => {
  evt.preventDefault();
  const currentFilterId = evt.target.id;
  if (currentFilterId === '') {
    return;
  }
  const filter = Object.values(FilterId).find((element) => element === currentFilterId);
  renderFilteredPosts(filter);
};
const setRenderFilteredPostsClick = (cb) => {
  imageFiltersForm.addEventListener('click', (evt) => cb);
};

export { getUserPostsToThumbnailsFilters, renderFilters, onFiltersButtonsClick, setRenderFilteredPostsClick };

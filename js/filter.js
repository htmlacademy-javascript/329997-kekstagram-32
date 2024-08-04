import { setUsersPosts } from './expanded-post-data';

const RANDOM_POST_COUNT = 10;

const imageFiltersContainer = document.querySelector('.img-filters');
const imageFiltersForm = imageFiltersContainer.querySelector('.img-filters__form');

const FilterId = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let usersPosts = [];

const renderFilters = (data) => {
  usersPosts = data;
  imageFiltersContainer.classList.remove('img-filters--inactive');
};

const getDefaultFilteredPosts = () => {
  const defaultButton = document.querySelector(`'.${FilterId.DEFAULT}'`);

};

const getRandomFilteredPosts = () => {};

const getDiscussedFilteredPosts = () => {};

const setFilter = (id) => {
  let filteredPosts = usersPosts.slice();

};


const onFiltersButtonsClick = (evt) => {
  evt.preventDefault();
  const currentFilterId = evt.target.id;
  const filter = Object.values(FilterId).find((element) => element === currentFilterId);

}

imageFiltersContainer.addEventListener('click', onFiltersButtonsClick);

//видимо все придется переносить в thumbnails так как отрисовка постов происходит там, здесь может только оставить формирование сортировки массивов для фильтра












export { renderFilters };

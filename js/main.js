import './expanded-post-events.js';
import './form-events.js';
import './form-scale.js';
import { getData } from './api.js';
import { renderPosts } from './thumbnails.js';
import { setUsersPostsToExpanded } from './expanded-post-data.js';
import { renderDataAlert } from './alerts-renders.js';
import { setUserFormSubmit } from './form-validator.js';
import { renderFilters, setUserPostsToThumbnailsFilters, setRenderFilteredPostsClick, renderFilteredPosts } from './thumbnails-filters.js';
import { debounce } from './utils.js';

const RENDER_DELAY = 500;

getData()
  .then(
    (posts) => {
      renderPosts(posts);
      setUsersPostsToExpanded(posts);
      setUserPostsToThumbnailsFilters(posts);
      renderFilters();
      setRenderFilteredPostsClick(debounce(renderFilteredPosts, RENDER_DELAY));
    })
  .catch(() => {
    renderDataAlert();
  });

setUserFormSubmit();

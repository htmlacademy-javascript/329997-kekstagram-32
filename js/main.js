import './expanded-post-events.js';
import './form-events.js';
import './form-scale.js';
import { getData } from './api.js';
import { renderPosts } from './thumbnails.js';
import { setUsersPosts } from './expanded-post-data.js';
import { renderDataAlert } from './alerts-renders.js';
import { setUserFormSubmit } from './form-validator.js';
import { renderFilters } from './filter.js';

getData()
  .then(
    (posts) => {
      renderPosts(posts);
      setUsersPosts(posts);
      renderFilters(posts);
    })
  .catch(() => {
    renderDataAlert();
  });

setUserFormSubmit();

import './form-events.js';
import './form-validator.js';
import './form-scale.js';
import { getData } from './api.js';
import { renderPosts } from './thumbnails.js';
import { setUsersPosts } from './expanded-post-data.js';

getData()
  .then(
    (posts) => {
      renderPosts(posts);
      setUsersPosts(posts);
    })
  .catch(() => {
    showAlert();
  });



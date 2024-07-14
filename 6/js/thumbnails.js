//Модуль отображения миниатюр
import {createPosts} from './data.js';

const usersPosts = createPosts();

const userPicturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const userPictureFragment = document.createDocumentFragment();

usersPosts.forEach(({url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = url;
  pictureElement.querySelector('img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  userPictureFragment.append(pictureElement);
});

userPicturesContainer.append(userPictureFragment);

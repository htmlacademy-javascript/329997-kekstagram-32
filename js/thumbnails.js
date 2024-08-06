const userPicturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderPosts = (data) => {
  const userPictureFragment = document.createDocumentFragment();

  data.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const pictureElementImage = pictureElement.querySelector('.picture__img');
    pictureElementImage.src = url;
    pictureElementImage.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    userPictureFragment.append(pictureElement);
  });
  userPicturesContainer.append(userPictureFragment);
};

export { renderPosts };

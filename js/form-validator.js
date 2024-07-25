const COMMENT_LENGTH = 140;
const HASHTAGS_LENGTH = 5;

const HashtagError = {
  INVALID: 'Хэштег не соответсвует требованиям!',
  QUANTITY: 'Превышено количество хэштегов!',
  REPEATING: 'Хэштеги не должны повторяться!',
};

const CommentError = {
  LENGTH: 'Длина комментария не должна быть больше 140 символов!',
};

const imgUploadForm = document.querySelector('.img-upload__form');
const inputHashtags = imgUploadForm.querySelector('.text__hashtags');
const inputComment = imgUploadForm.querySelector('.text__description');

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
};

const pattern = /^#[a-zа-яё0-9]{1,19}$|^$/i;

const pristine = new Pristine(imgUploadForm, pristineConfig);

const getHashtags = (value) => {
  const hashtags = value.trim().toLowerCase().split(' ');
  const filteredHashtags = hashtags.filter((hashtag) => hashtag !== '');
  return filteredHashtags;
};

const validateHashtag = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.every((hashtag) => pattern.test(hashtag));
};

const validateHashtagRepeating = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length === new Set(hashtags).size;
};

const validateHashtagLength = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length <= HASHTAGS_LENGTH;
};

const validateCommentLength = (value) => value.length <= COMMENT_LENGTH;

pristine.addValidator(inputHashtags, validateHashtag, HashtagError.INVALID);
pristine.addValidator(inputHashtags, validateHashtagRepeating, HashtagError.REPEATING);
pristine.addValidator(inputHashtags, validateHashtagLength, HashtagError.QUANTITY);
pristine.addValidator(inputComment, validateCommentLength, CommentError.LENGTH);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    inputHashtags.value = getHashtags(inputHashtags.value).join(' ');
    imgUploadForm.submit();
  }
});

export { pristine };

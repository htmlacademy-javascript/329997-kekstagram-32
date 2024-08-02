import { isEscapeKey } from './utils.js';

function onSuccessButtonClick () {
  const sumbitSuccessElement = document.querySelector('.success');
  sumbitSuccessElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentMouseClick);
}

function onErrorButtonClick () {
  const sumbitErrorElement = document.querySelector('.error');
  sumbitErrorElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentMouseClick);
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.querySelector('.success')) {
      onSuccessButtonClick();
    }
    if (document.querySelector('.error')) {
      onErrorButtonClick();
    }
  }
}

function onDocumentMouseClick (evt) {
  evt.preventDefault();
  if (evt.target === document.querySelector('.success')) {
    onSuccessButtonClick();
  }
  if (evt.target === document.querySelector('.error')) {
    onErrorButtonClick();
  }
}

export { onSuccessButtonClick, onErrorButtonClick, onDocumentKeydown, onDocumentMouseClick };

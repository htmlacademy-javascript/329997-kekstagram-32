import { isEscapeKey } from './utils.js';

const removeAlertElement = (alertClass) => {
  const sumbitElement = document.querySelector(alertClass);
  sumbitElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentMouseClick);
};

const onAlertButtonClick = (alertClass) => () => removeAlertElement(alertClass);

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.body.contains(document.querySelector('.success'))) {
      removeAlertElement('.success');
    }
    if (document.body.contains(document.querySelector('.error'))) {
      removeAlertElement('.error');
    }
  }
}

function onDocumentMouseClick (evt) {
  evt.preventDefault();
  if (evt.target === document.querySelector('.success')) {
    removeAlertElement('.success');
  }
  if (evt.target === document.querySelector('.error')) {
    removeAlertElement('.error');
  }
}

export { onAlertButtonClick, onDocumentKeydown, onDocumentMouseClick };

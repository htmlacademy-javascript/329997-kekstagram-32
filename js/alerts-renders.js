import { onAlertButtonClick, onDocumentKeydown, onDocumentMouseClick } from './alerts-events.js';

const dataErrorTemplate = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');

const submitSuccessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const submitErrorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const renderAlert = (template) => {
  const element = template.cloneNode(true);
  document.body.append(element);
};

const renderDataAlert = () => {
  renderAlert(dataErrorTemplate);
  const dataErrorElement = document.querySelector('.data-error');
  setTimeout(() => dataErrorElement.remove(), 5000);
};

const renderSubmitAlert = (success) => {
  if (success) {
    renderAlert(submitSuccessTemplate);
    const successButton = document.querySelector('.success__button');
    successButton.addEventListener('click', onAlertButtonClick('.success'));
  } else {
    renderAlert(submitErrorTemplate);
    const errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', onAlertButtonClick('.error'));
  }
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentMouseClick);
};

export { renderDataAlert, renderSubmitAlert };

import { onSuccessButtonClick, onErrorButtonClick, onDocumentKeydown, onDocumentMouseClick } from './alerts-events.js';

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
  const fragment = document.createDocumentFragment();
  const element = template.cloneNode(true);
  fragment.append(element);
  document.body.append(fragment);
};

const renderDataAlert = () => {
  renderAlert(dataErrorTemplate);
  const dataErrorElement = document.querySelector('.data-error');
  setTimeout(() => dataErrorElement.remove(), 5000);
};

const renderSubmitSuccessAlert = () => {
  renderAlert(submitSuccessTemplate);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentMouseClick);
};

const renderSubmitErrorAlert = () => {
  renderAlert(submitErrorTemplate);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentMouseClick);
};

export { renderDataAlert, renderSubmitSuccessAlert, renderSubmitErrorAlert };

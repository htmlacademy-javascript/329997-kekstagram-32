
const dataErrorTemplate = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');

const renderDataAlert = () => {
  const dataErrorFragment = document.createDocumentFragment();
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  dataErrorFragment.append(dataErrorElement);
  document.body.append(dataErrorFragment);

  setTimeout(() => dataErrorElement.remove(), 5000);
};

export { renderDataAlert };

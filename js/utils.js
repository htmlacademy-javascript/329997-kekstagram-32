const getRandomInteger = (min, max) => {
  const minimum = Math.ceil(Math.min(min, max));
  const maximum = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
};

const getUnicIndexGenerator = (min, max) => {
  const usedIndexes = [];
  return () => {
    let unicIndex = getRandomInteger(min, max);
    if (usedIndexes.length >= (max - min + 1)) {
      return;
    }
    while (usedIndexes.includes(unicIndex)) {
      unicIndex = getRandomInteger(min, max);
    }
    usedIndexes.push(unicIndex);
    return unicIndex;
  };
};

const getValueInRange = (value, min, max) => Math.min(max, Math.max(min, value));

const getRandomElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

const getRandomCommentsMessages = (messages, minMessageCount, maxMessageCount) => Array.from({length: getRandomInteger(minMessageCount, maxMessageCount)}, () => getRandomElement(messages)).join(' ');

const isEscapeKey = (evt) => evt.key === 'Escape';

const scrollTop = (container) => container.scroll({top: 0, behavior: 'smooth'});

export { getRandomInteger, getUnicIndexGenerator, getRandomElement, getValueInRange, getRandomCommentsMessages, isEscapeKey, scrollTop };

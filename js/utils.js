//Функция случайной генерации числа в заданных пределах
const getRandomInteger = (min, max) => {
  const minimum = Math.ceil(Math.min(min, max));
  const maximum = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
};

//Функция генерации уникального идентификатора в заданных пределах
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

//Функция нахождения случайного элемента в массиве
const getRandomElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

//Функция генерации случайного количества комментариев
const getRandomCommentsMessages = (messages, minMessageCount, maxMessageCount) => Array.from({length: getRandomInteger(minMessageCount, maxMessageCount)}, () => getRandomElement(messages)).join(' ');

export {getRandomInteger, getUnicIndexGenerator, getRandomElement, getRandomCommentsMessages};

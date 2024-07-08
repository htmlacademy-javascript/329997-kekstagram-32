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
    return unicIndex;
  };
};

export {getRandomInteger, getUnicIndexGenerator};

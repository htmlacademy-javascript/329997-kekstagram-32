//Массив имен
const NAMES = ['Евгений', 'Виктория', 'Аделина', 'Валерия', 'Кирилл', 'Степан', 'Тимофей', 'Семён', 'Александра', 'Анастасия', 'Александр', 'Варвара', 'Дмитрий', 'Вероника', 'Павел', 'Елизавета', 'Константин', 'Матвей', 'Владислав',
  'Ева', 'София', 'Анна', 'Святослав', 'Арина', 'Роман'];

//Массив описаний к фото
const DESCRIPTIONS = [
  'Прекрасные виды!',
  'Наконец то на пляж!',
  'Долгожданный отпуск!',
  'Сказочное Бали',
  'Едим еду :О',
  'Мечтаю о такой %_%',
  'Десерт в китайском ресторане О_о',
  'Пейте люди морс - будете здоровы',
  'Самолет забери меня в полет',
  'Идея для хранения обуви',
  'Дорога на пляж',
  'Моя ласточка ^_-',
  'ПП ужин - всегда хорошо',
  'Ой, это у вас суши? Нет это котик!',
  'Чил дома',
  'Синее небо и горы, что может быть лучше?',
  'Наконец то услышал живое выступление хора',
  'Дед мой сохранил настоящий раритет',
  'Лайфхак для жизни',
  'Вечер в парке',
  'Вкусный обед на новом месте',
  'Обожаю закаты!',
  'Это - краб',
  'Лучший концерт ever!',
  'Ох как мы быстро уезжали от этих зверюг...'];

//Массив комментариев к фото от пользователей
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

//Функция случайной генерации числа в заданных пределах
const getRandomInteger = (min, max) => {
  const minimum = Math.ceil(Math.min(min, max));
  const maximum = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
};

//Функция генерации уникального идентификатора в заданных пределах
const getUnicIndexGenerator = (min, max) => {
  const usedIndexes = [];
  let unicIndex;
  return () => {
    if (usedIndexes.length >= (max - min + 1)) {
      return;
    }
    for (let i = 0; i < max - 1; i++) {
      unicIndex = getRandomInteger(min, max);
      if (usedIndexes.includes(unicIndex)) {
        unicIndex = getRandomInteger(min, max);
      } else {
        usedIndexes.push(unicIndex);
        return unicIndex;
      }
    }
  };
};

const getUnicPostIndex = getUnicIndexGenerator(1, 25);
const getUnicCommentIndex = getUnicIndexGenerator(1, 10000);

//Функция генерации комментариев
const getRandomComments = () => {
  const commentsCount = getRandomInteger(0, 30);
  const randomComments = [];
  for (let i = 0; i <= commentsCount; i++) {
    const randomCommentIndex = Math.round(getUnicCommentIndex());
    const randomCommentAvatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
    const randomCommentMessage = Array.from({length: getRandomInteger(1,2)}, () => MESSAGES[getRandomInteger(1, 6) - 1]).join(' ');
    const randomCommentUserName = NAMES[getRandomInteger(1, 25) - 1];
    randomComments.push({id: randomCommentIndex, avatar: randomCommentAvatar, message: randomCommentMessage, name: randomCommentUserName});
  }
  return randomComments;
};

//Функция генерации поста
const createPost = () => {
  const randomPostIndex = getUnicPostIndex();
  const randomPostPhotoUrl = `photos/${randomPostIndex}.jpg`;
  const randomPostPhotoDescription = DESCRIPTIONS[randomPostIndex - 1];
  const randomPostLikes = getRandomInteger(15, 200);
  const randomPostComments = getRandomComments();

  return {id: randomPostIndex, url: randomPostPhotoUrl, description: randomPostPhotoDescription, likes: randomPostLikes, comments: randomPostComments};
};

createPost();

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

const ALIKE_USER_POSTS_COUNT = 25;
const MIN_ID_COUNT = 1;
const MAX_ID_COUNT = ALIKE_USER_POSTS_COUNT;
const MAX_AVATAR_COUNT = 6;
const MIN_LIKE_COUNT = 15;
const MAX_LIKE_COUNT = 200;
const MIN_COMMENT_COUNT = 0;
const MAX_COMMENT_COUNT = 30;
const MIN_MESSAGE_COUNT = 1;
const MAX_MESSAGE_COUNT = 2;

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

//Функция генерации случайного количества комментариев
const getRandomCommentsMessages = (array, minMessageCount, maxMessageCount) => Array.from({length: getRandomInteger(minMessageCount, maxMessageCount)}, () => array[getRandomInteger(1, array.length) - 1]).join(' ');

const getUnicPostIndex = getUnicIndexGenerator(MIN_ID_COUNT, MAX_ID_COUNT);
const getUnicCommentIndex = getUnicIndexGenerator(MIN_ID_COUNT, 10000);

//Функция генерации комментариев
const getRandomComments = () => {
  const commentsCount = getRandomInteger(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT);
  const randomComments = [];
  for (let i = 0; i <= commentsCount; i++) {
    const randomCommentIndex = Math.round(getUnicCommentIndex());
    const randomCommentAvatar = `img/avatar-${getRandomInteger(MIN_ID_COUNT, MAX_AVATAR_COUNT)}.svg`;
    const randomCommentMessage = getRandomCommentsMessages(MESSAGES, MIN_MESSAGE_COUNT, MAX_MESSAGE_COUNT);
    const randomCommentUserName = NAMES[getRandomInteger(MIN_ID_COUNT, MAX_ID_COUNT) - 1];
    randomComments.push({id: randomCommentIndex, avatar: randomCommentAvatar, message: randomCommentMessage, name: randomCommentUserName});
  }
  return randomComments;
};

//Функция генерации поста
const createPost = () => {
  const randomPostIndex = getUnicPostIndex();
  const randomPostPhotoUrl = `photos/${randomPostIndex}.jpg`;
  const randomPostPhotoDescription = DESCRIPTIONS[randomPostIndex - 1];
  const randomPostLikes = getRandomInteger(MIN_LIKE_COUNT, MAX_LIKE_COUNT);
  const randomPostComments = getRandomComments();
  return {id: randomPostIndex, url: randomPostPhotoUrl, description: randomPostPhotoDescription, likes: randomPostLikes, comments: randomPostComments};
};

//Функция вывода массива комментариев
const createPosts = () => Array.from({length: ALIKE_USER_POSTS_COUNT}, createPost);

createPosts();

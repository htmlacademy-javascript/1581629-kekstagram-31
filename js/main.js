const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      throw new Error(`Перебраны все числа из диапазона от ${min} до ${max}`);
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);

    return currentValue;
  };
};

const MAX_COMMENTS_COUNT = 30;
const MAX_PHOTOS_COUNT = 25;
const MAX_AVATAR_INDEX = 6;

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const AUTHORS_NAMES = [
  'Барсик',
  'Марсик',
  'Кексик',
  'Коржик',
  'Карамелька',
  'Компот'
];

const generateCommentId = createRandomIdFromRangeGenerator(
  1,
  MAX_COMMENTS_COUNT * MAX_PHOTOS_COUNT
);

const createComment = () => {
  const generateMessageIndex = createRandomIdFromRangeGenerator(
    0,
    COMMENT_MESSAGES.length - 1
  );
  const avatarIndex = getRandomInteger(1, MAX_AVATAR_INDEX);
  const messagesCount = getRandomInteger(1, 2);
  const messages = [];
  for (let i = 0; i < messagesCount; i++) {
    messages.push(COMMENT_MESSAGES[generateMessageIndex()]);
  }

  return {
    id: generateCommentId(),
    avatar: `img/avatar-${avatarIndex}.svg`,
    message: messages.join(' '),
    name: AUTHORS_NAMES[avatarIndex - 1]
  };
};

const PHOTO_DESCRIPTIONS = [
  'На пляже',
  'Дома',
  'Отпуск',
  'В музее',
  'Выпускной',
  'Зацените, классная фоточка',
  'На рыбалке'
];

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const generatePhotoId = createRandomIdFromRangeGenerator(1, MAX_PHOTOS_COUNT);

const createPhoto = () => {
  const photoId = generatePhotoId();

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, MAX_COMMENTS_COUNT)}, createComment)
  };
};

const createPhotos = (photosCount) => Array.from({length: photosCount}, createPhoto);

createPhotos(MAX_PHOTOS_COUNT);

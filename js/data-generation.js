import {
  getRandomInteger,
  createRandomIdFromRangeGenerator,
  getRandomArrayElement
} from './utils.js';

const MAX_COMMENTS_COUNT = 30;
const MAX_PHOTOS_COUNT = 25;
const MAX_AVATAR_INDEX = 6;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

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

const PHOTO_DESCRIPTIONS = [
  'На пляже',
  'Дома',
  'Отпуск',
  'В музее',
  'Выпускной',
  'Зацените, классная фоточка',
  'На рыбалке'
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

const generatePhotoId = createRandomIdFromRangeGenerator(1, MAX_PHOTOS_COUNT);

const createPhoto = () => {
  const photoId = generatePhotoId();

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: Array.from({length: getRandomInteger(0, MAX_COMMENTS_COUNT)}, createComment)
  };
};

const createPhotos = () => Array.from({length: MAX_PHOTOS_COUNT}, createPhoto);

export {createPhotos};

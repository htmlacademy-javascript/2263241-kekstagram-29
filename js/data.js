const Counters = {
  PHOTOS_COUNT: 25,
  COMMENTS_COUNT: 30,
  MESSAGE_MIN: 1,
  MESSAGE_MAX: 200,
  COMMENT_MIN: 1,
  COMMENT_MAX: 2,
  AVATAR_MIN: 1,
  AVATAR_MAX: 6,
  LIKE_MIN: 15,
  LIKE_MAX: 200,
  COMMENT_BIG_PICTURE: 5,
  HASHTAG_MAX_COUNT: 5,
  HASHTAG_MIN_LENGTH: 2,
  HASHTAG_MAX_LENGTH: 20,
  COMMENT_MAX_LENGTH: 140
};
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

// eslint-disable-next-line no-unused-vars
const DESCRIPTION = [
  'Я и море',
  'Мои вкусняшки',
  'Красота неземная',
  'Я на даче'
];

const NAME = [
  'Татьяна',
  'Гертруда',
  'Петя',
  'Василий',
  'Сигизмунд',
  'Иван',
  'Соня'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

export {Counters, DESCRIPTION, NAME, MESSAGE, HASHTAG_PATTERN};

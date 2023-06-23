import {getRandomInteger} from './util.js';

const PHOTOS_COUNT = 25;
const COMMENTS_COUNT = 30;
const MESSAGE_MIN = 1;
const MESSAGE_MAX = 200;
const COMMENT_MIN = 1;
const COMMENT_MAX = 2;
const AVATAR_MIN = 1;
const AVATAR_MAX = 6;
const LIKE_MIN = 15;
const LIKE_MAX = 200;

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

//создаем один комментарий - объект
const createOneComment = () => {
  const randomCountMessage = getRandomInteger(COMMENT_MIN,COMMENT_MAX); //1 или 2 предложения
  let message = MESSAGE[getRandomInteger(0,MESSAGE.length - 1)];

  if (randomCountMessage === 2) {
    let randomIndexMessage = getRandomInteger(0,MESSAGE.length - 1);
    //если предложение повторяется, то выбираем до тех пор, пока не попадется другое
    if (message === MESSAGE[randomIndexMessage]) {
      do {
        randomIndexMessage = getRandomInteger(0,MESSAGE.length - 1);
      } while (message === MESSAGE[randomIndexMessage]);
    }
    message += ` ${ MESSAGE[randomIndexMessage]}`;
  }

  return {
    id: getRandomInteger(MESSAGE_MIN, MESSAGE_MAX),
    avatar: `img/avatar-${ getRandomInteger(AVATAR_MIN,AVATAR_MAX)}.svg`,
    message: message,
    name: NAME[getRandomInteger(0,NAME.length - 1)]
  };
};


//создаем массив из комментариев
const createComments = (maxCount) => {
  const comments = [];
  const randomCountComment = getRandomInteger(0,maxCount);
  for (let i = 0; i < randomCountComment; i ++){
    comments.push(createOneComment());
  }
  return comments;
};

//создаем один объект фото
const createOneFoto = (index) => {
  const idFoto = index + 1;
  return {
    id: idFoto,
    url: `photos/${ idFoto }.jpg`,
    description: DESCRIPTION[getRandomInteger(0,DESCRIPTION.length - 1)],
    likes: getRandomInteger(LIKE_MIN,LIKE_MAX),
    comments : createComments(COMMENTS_COUNT)
  };
};

//создаем массив из фото

const createGallary = () => Array.from({length: PHOTOS_COUNT}, createOneFoto);
export {createGallary};

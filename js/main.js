/*
*/

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

//генераор случайных чисел
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const PHOTOS_COUNT = 25;
const COMMENTS_COUNT = 30;

//создаем один комментарий - объект
const createOneComment = () => {
  const randomCountMessage = getRandomInteger(1,2); //1 или 2 предложения
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
    id: getRandomInteger(1,200),
    avatar: `img/avatar-${ getRandomInteger(1,6)}.svg`,
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
    likes: getRandomInteger(15,200),
    comments : createComments(COMMENTS_COUNT)
  };
};

//создаем массив из фото
function createGallary(maxCount) {
  const photos = [];
  for (let i = 0; i < maxCount; i++) {
    photos.push(createOneFoto(i));
  }
  return photos;
}

createGallary(PHOTOS_COUNT);

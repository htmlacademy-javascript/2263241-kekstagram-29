import {getRandomInteger} from './util.js';
import {Сounters, DESCRIPTION, NAME, MESSAGE} from './data.js';

//создаем один комментарий - объект
const createOneComment = () => {
  const randomCountMessage = getRandomInteger(Сounters.COMMENT_MIN,Сounters.COMMENT_MAX); //1 или 2 предложения
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
    id: getRandomInteger(Сounters.MESSAGE_MIN, Сounters.MESSAGE_MAX),
    avatar: `img/avatar-${ getRandomInteger(Сounters.AVATAR_MIN, Сounters.AVATAR_MAX)}.svg`,
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
const createOneFoto = (index) => ({
  id: index,
  url: `photos/${ index}.jpg`,
  description: DESCRIPTION[getRandomInteger(0,DESCRIPTION.length - 1)],
  likes: getRandomInteger(Сounters.LIKE_MIN,Сounters.LIKE_MAX),
  comments : createComments(Сounters.COMMENTS_COUNT)
});

//создаем массив из фото

const createGallery = () => Array.from(
  {length: Сounters.PHOTOS_COUNT},
  (_, photoIndex) => createOneFoto(photoIndex + 1),
);

export {createGallery};

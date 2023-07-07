import {getRandomInteger} from './util.js';
import {Counters, DESCRIPTION, NAME, MESSAGE} from './data.js';

//создаем один комментарий - объект
const createOneComment = () => {
  const randomCountMessage = getRandomInteger(Counters.COMMENT_MIN,Counters.COMMENT_MAX); //1 или 2 предложения
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
    id: getRandomInteger(Counters.MESSAGE_MIN, Counters.MESSAGE_MAX),
    avatar: `img/avatar-${ getRandomInteger(Counters.AVATAR_MIN, Counters.AVATAR_MAX)}.svg`,
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
  likes: getRandomInteger(Counters.LIKE_MIN,Counters.LIKE_MAX),
  comments : createComments(Counters.COMMENTS_COUNT)
});

//создаем массив из фото

const createGallery = () => Array.from(
  {length: Counters.PHOTOS_COUNT},
  (_, photoIndex) => createOneFoto(photoIndex + 1),
);

export {createGallery};

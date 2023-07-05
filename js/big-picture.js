import {picturesGallery} from './create-thumbnails.js';
import {Сounters} from './data.js';

const modalPicture = document.querySelector('.big-picture');
const modalPictureCancel = modalPicture.querySelector('#picture-cancel');
const parentPicture = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture__preview');
const bigPictureElementSocial = bigPictureElement.querySelector('.big-picture__social');
let currentPictureId = '';

//создает элемент DOM для одного комментария
const createOneComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentElementImg = document.createElement('img');
  commentElementImg.classList.add('social__picture');
  commentElementImg.src = comment.avatar;
  commentElementImg.alt = comment.name;
  commentElementImg.width = '35';
  commentElementImg.height = '35';
  commentElement.append(commentElementImg);

  const commentElementText = document.createElement('p');
  commentElementText.classList.add('social__text');
  commentElementText.textContent = comment.message;
  commentElement.append(commentElementText);

  return commentElement;
};

//Удаляет комменты, которые были в разметке
const removeChilds = (parent, children) => {
  for (let i = children.length - 1; i >= 0 ; i--) {
    parent.removeChild(children[i]);
  }
};

//Добавляет комментарии, предварительно удалив старые
const createComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  //удаляем старые комментарии, которые были в разметке
  const bigPictureSocialComments = bigPictureElementSocial.querySelector('.social__comments');
  if (bigPictureSocialComments.children.length > 0) {
    removeChilds(bigPictureSocialComments, bigPictureSocialComments.children);
  }
  //Проверяем, комментариев >5?
  let countComments = Сounters.COMMENT_BIG_PICTURE;
  if (countComments > comments.length) {
    countComments = comments.length;
  }
  //перебираем массив до длины countComments
  for (let i = 0; i < countComments; i++) {
    const oneComment = createOneComment(comments[i]); //создаем элемент для комментария
    commentsFragment.appendChild(oneComment);
  }
  bigPictureSocialComments.appendChild(commentsFragment);
};

//Находитё нужный элемент массива по currentPictureId
const createBigPicture = (gallery) => {
  for (let i = 0; i < gallery.length; i++) {
    if (gallery[i].id === parseInt(currentPictureId, 10)) {
      bigPictureElement.querySelector('.big-picture__img img').src = gallery[i].url;
      bigPictureElementSocial.querySelector('.social__caption').textContent = gallery[i].description;
      bigPictureElementSocial.querySelector('.likes-count').textContent = gallery[i].likes;
      bigPictureElementSocial.querySelector('.comments-count').textContent = gallery[i].comments.length;
      createComments(gallery[i].comments, gallery[i].comments.length); //вызываем добавление комментов

    }
  }

};
//Проверяем кликнули по фото? тогда запоминаем id в currentPictureId и открываем модалку
// массив фотографий picturesGallery импортировали из create-thumbnails.js
const clickThumbnails = (evt) => {
  if (evt.target.closest('.picture__img')) {
    modalPicture.classList.remove('hidden');
    currentPictureId = evt.target.id;
    createBigPicture(picturesGallery);
  }
};
//делегирую клик на родителя
parentPicture.addEventListener('click', clickThumbnails);

modalPictureCancel.addEventListener('click', () => {
  modalPicture.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    modalPicture.classList.add('hidden');
  }
});

const showBigPicture = () => {

};
export {showBigPicture};

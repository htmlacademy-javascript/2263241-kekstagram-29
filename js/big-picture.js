import {isEscapeKey} from './util.js';
import {Counters} from './data.js';
let picturesGallery = [];

const body = document.querySelector('body');
const modalPicture = document.querySelector('.big-picture');
const modalPictureCancel = modalPicture.querySelector('#picture-cancel');
const parentPicture = document.querySelector('.pictures');
const bigPicturePreview = document.querySelector('.big-picture__preview');
const bigPictureSocial = bigPicturePreview.querySelector('.big-picture__social');
const bigPictureSocialComments = bigPictureSocial.querySelector('.social__comments');
const socialCommentTemplate = bigPictureSocialComments.children.item(0);
const loaderComments = bigPictureSocial.querySelector('.social__comments-loader');
const commentsDownloadAmount = bigPictureSocial.querySelector('.comments-download');
let currentPictureId = '';
let currentPicture = {};

//создает элемент DOM для одного комментария
const createOneComment = (comment) => {
  const createdComment = socialCommentTemplate.cloneNode(true);

  const createdCommentImg = createdComment.querySelector('.social__picture');
  createdCommentImg.src = comment.avatar;
  createdCommentImg.alt = comment.name;
  createdComment.querySelector('.social__text').textContent = comment.message;

  return createdComment;
};

//Добавляет комментарии, предварительно удалив старые

const createComments = (comments, startingComment, uploadingComments) => {
  if (startingComment === 0) {
    bigPictureSocialComments.innerHTML = '';
  }
  const commentsFragment = document.createDocumentFragment();

  if (uploadingComments !== 0){
    const commentsDownload = comments.slice(startingComment, uploadingComments);
    for (let i = 0; i < commentsDownload.length; i++) {
      const oneComment = createOneComment(commentsDownload[i]); //создаем элемент для комментария
      commentsFragment.appendChild(oneComment);
    }
  }
  bigPictureSocialComments.appendChild(commentsFragment);
};

const hideButtonUpload = () => {
  loaderComments.classList.add('hidden');
  loaderComments.removeEventListener('click', onButtonLoadClick);
};

const showButtonUpload = () => {
  loaderComments.classList.remove('hidden');
  loaderComments.addEventListener('click', onButtonLoadClick);
};

function onButtonLoadClick () {
  const startingComment = bigPictureSocial.querySelector('.social__comments').children.length;

  const uploadingComments = startingComment + Counters.COMMENT_BIG_PICTURE;

  if (uploadingComments <= currentPicture.comments.length) {
    createComments(currentPicture.comments, startingComment, uploadingComments);
    commentsDownloadAmount.textContent = uploadingComments;
  } else {
    createComments(currentPicture.comments, startingComment, currentPicture.comments.length);
    commentsDownloadAmount.textContent = currentPicture.comments.length;
    hideButtonUpload ();
  }
}

//Находитё нужный элемент массива по currentPictureId
const createBigPicture = () => {

  currentPicture = picturesGallery.find((elementGallery) => elementGallery.id === parseInt(currentPictureId, 10));

  bigPicturePreview.querySelector('.big-picture__img img').src = currentPicture.url;
  bigPictureSocial.querySelector('.social__caption').textContent = currentPicture.description;
  bigPictureSocial.querySelector('.likes-count').textContent = currentPicture.likes;
  bigPictureSocial.querySelector('.comments-count').textContent = currentPicture.comments.length;

  let countComments = Counters.COMMENT_BIG_PICTURE;

  if (countComments >= currentPicture.comments.length) {
    countComments = currentPicture.comments.length;
    hideButtonUpload();
  } else {
    showButtonUpload();
  }

  commentsDownloadAmount.textContent = countComments;
  createComments(currentPicture.comments, 0, countComments); //вызываем добавление комментов
};


const onWindowKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture () {
  body.classList.remove('modal-open');
  modalPicture.classList.add('hidden');
  document.removeEventListener('keydown', onWindowKeyDown);
}

function openBigPicture (evt) {

  body.classList.add('modal-open');
  modalPicture.classList.remove('hidden');
  document.addEventListener('keydown', onWindowKeyDown);

  currentPictureId = evt.target.dataset.pictureId;
  createBigPicture();
}

//делегирую клик на родителя
parentPicture.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture__img')) {
    evt.preventDefault();
    openBigPicture(evt);
  }
});
const onCloseBigPicture = () => closeBigPicture();
modalPictureCancel.addEventListener('click', onCloseBigPicture);

const showBigPicture = (pictures) => {
  picturesGallery = pictures.slice();
};

export {showBigPicture};

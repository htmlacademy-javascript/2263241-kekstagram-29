import {isEscapeKey} from './util.js';

const showBigPicture = (picturesGallery, countCommentsMax) => {
  const bodyElement = document.querySelector('body');
  const modalPicture = document.querySelector('.big-picture');
  const modalPictureCancel = modalPicture.querySelector('#picture-cancel');
  const parentPicture = document.querySelector('.pictures');
  const bigPictureElement = document.querySelector('.big-picture__preview');
  const bigPictureElementSocial = bigPictureElement.querySelector('.big-picture__social');
  const bigPictureSocialComments = bigPictureElementSocial.querySelector('.social__comments');
  const SocialCommentsOneElement = bigPictureSocialComments.children.item(0);
  const loaderComments = bigPictureElementSocial.querySelector('.social__comments-loader');
  let currentPictureId = '';
  let currentPicture = {};

  //создает элемент DOM для одного комментария
  const createOneCommentElement = (comment) => {
    const commentElement = SocialCommentsOneElement.cloneNode(true);

    const commentElementImg = commentElement.querySelector('.social__picture');
    commentElementImg.src = comment.avatar;
    commentElementImg.alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  //Добавляет комментарии, предварительно удалив старые

  const createComments = (comments, countcommentsLoad) => {
    bigPictureSocialComments.innerHTML = '';
    const commentsFragment = document.createDocumentFragment();

    if (countcommentsLoad !== 0){
      const commentsDownload = comments.slice(0, countcommentsLoad);
      for (let i = 0; i < commentsDownload.length; i++) {
        const oneComment = createOneCommentElement(comments[i]); //создаем элемент для комментария
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
    const uploadCommentsCount = bigPictureElementSocial.querySelector('.social__comments').children.length + countCommentsMax;
    if (uploadCommentsCount <= currentPicture.comments.length) {
      createComments(currentPicture.comments, uploadCommentsCount);
    } else {
      createComments(currentPicture.comments, currentPicture.comments.length);
      hideButtonUpload ();
    }
  }

  //Находитё нужный элемент массива по currentPictureId
  const createBigPicture = () => {

    currentPicture = picturesGallery.find((elementGallery) => elementGallery.id === parseInt(currentPictureId, 10));

    bigPictureElement.querySelector('.big-picture__img img').src = currentPicture.url;
    bigPictureElementSocial.querySelector('.social__caption').textContent = currentPicture.description;
    bigPictureElementSocial.querySelector('.likes-count').textContent = currentPicture.likes;
    bigPictureElementSocial.querySelector('.comments-count').textContent = currentPicture.comments.length;

    let countComments = countCommentsMax;

    if (countComments >= currentPicture.comments.length) {
      countComments = currentPicture.comments.length;
      hideButtonUpload();
    } else {
      showButtonUpload();
    }

    bigPictureElementSocial.querySelector('.comments-download').textContent = countComments;
    createComments(currentPicture.comments, countComments); //вызываем добавление комментов
  };


  const onWindowKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  function closeBigPicture () {
    bodyElement.classList.remove('modal-open');
    modalPicture.classList.add('hidden');
    document.removeEventListener('keydown', onWindowKeyDown);
  }

  function openBigPicture (evt) {

    bodyElement.classList.add('modal-open');
    modalPicture.classList.remove('hidden');
    document.addEventListener('keydown', onWindowKeyDown);

    currentPictureId = evt.target.id;
    createBigPicture();
  }

  //делегирую клик на родителя
  parentPicture.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture__img')) {
      openBigPicture(evt);
    }
  });

  modalPictureCancel.addEventListener('click', closeBigPicture);


};
export {showBigPicture};

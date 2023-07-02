import {createGallery} from './create-gallery.js';

const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const picturestFragment = document.createDocumentFragment();

const picturesGallery = createGallery();

const createThumbnails = () => {

  picturesGallery.forEach(({url, description,comments, likes}) => {
    const picturesElement = picturesTemplate.cloneNode(true);

    picturesElement.querySelector('.picture__img').src = url;
    picturesElement.querySelector('.picture__img').alt = description;
    picturesElement.querySelector('.picture__comments').textContent = comments.length;
    picturesElement.querySelector('.picture__likes').textContent = likes;

    picturestFragment.append(picturesElement);
  });

  picturesContainer.append(picturestFragment);

};

export {createThumbnails};

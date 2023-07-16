//import {createGallery} from './create-gallery.js';
const createThumbnails = (picturesArray) => {

  const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesContainer = document.querySelector('.pictures');

  const picturestFragment = document.createDocumentFragment();

  //const picturesGallery = createGallery();

  picturesArray.forEach(({id, url, description,comments, likes}) => {
    const picturesElement = picturesTemplate.cloneNode(true);
    const pictureElementImg = picturesElement.querySelector('.picture__img');

    pictureElementImg.dataset.pictureId = id;
    pictureElementImg.src = url;
    pictureElementImg.alt = description;

    picturesElement.querySelector('.picture__comments').textContent = comments.length;
    picturesElement.querySelector('.picture__likes').textContent = likes;

    picturestFragment.append(picturesElement);
  });

  picturesContainer.append(picturestFragment);

};

export {createThumbnails};

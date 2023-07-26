const createThumbnails = (picturesArray) => {

  const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesContainer = document.querySelector('.pictures');

  const picturestFragment = document.createDocumentFragment();

  document.querySelectorAll('.picture').forEach((element)=>element.remove());

  picturesArray.forEach(({id, url, description,comments, likes}) => {
    const createdPicture = picturesTemplate.cloneNode(true);
    const createdPictureImg = createdPicture.querySelector('.picture__img');

    createdPictureImg.dataset.pictureId = id;
    createdPictureImg.src = url;
    createdPictureImg.alt = description;

    createdPicture.querySelector('.picture__comments').textContent = comments.length;
    createdPicture.querySelector('.picture__likes').textContent = likes;

    picturestFragment.append(createdPicture);
  });

  picturesContainer.append(picturestFragment);

};

export {createThumbnails};

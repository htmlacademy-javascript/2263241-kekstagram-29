import {getData} from './api.js';
import {createThumbnails} from './create-thumbnails.js';
import {showBigPicture} from './big-picture.js';
import {setDefaultSlider} from './filters.js';
import {setUserFormSubmit} from './form.js';
import { showAlert } from './util.js';

getData().then((picturesArray)=>{
  createThumbnails(picturesArray);
  showBigPicture(picturesArray);
})
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setDefaultSlider();
setUserFormSubmit();

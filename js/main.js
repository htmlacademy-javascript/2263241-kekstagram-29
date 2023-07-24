import {getData} from './api.js';
import {createThumbnails} from './create-thumbnails.js';
import {showBigPicture} from './big-picture.js';
import {setDefaultSlider} from './effects.js';
import {setUserFormSubmit} from './form.js';
import { showAlert } from './util.js';
import {showFilters} from './filters.js';
import {addFileChooserListener} from './upload-file.js';

getData().then((picturesArray)=>{
  createThumbnails(picturesArray);
  showBigPicture(picturesArray);
  showFilters(picturesArray);
})
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setDefaultSlider();
setUserFormSubmit();
addFileChooserListener();

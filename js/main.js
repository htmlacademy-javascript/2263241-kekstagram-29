import {getData} from './api.js';
import {createThumbnails} from './create-thumbnails.js';
import {showBigPicture} from './big-picture.js';
import {setDefaultSlider} from './effects.js';
import {setUserFormSubmit} from './form.js';
import { showAlert, debounce } from './util.js';
import {showFiltredPhotos} from './filters.js';
import {addFileChooserListener} from './upload-file.js';

getData().then((picturesArray)=>{

  const debouncedThumbnails = debounce(createThumbnails);
  createThumbnails(picturesArray);
  showFiltredPhotos(picturesArray,debouncedThumbnails);
  showBigPicture(picturesArray);
})
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setDefaultSlider();
setUserFormSubmit();
addFileChooserListener();

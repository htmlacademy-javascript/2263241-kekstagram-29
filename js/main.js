import {createThumbnails} from './create-thumbnails.js';
import {createGallery} from './create-gallery.js';
import {showBigPicture} from './big-picture.js';
//import {Counters} from './data.js';
import {setDefaultSlider} from './filters.js';
import './form.js';
import {getData} from './api.js';

//const picturesArray = createGallery();

getData().then((picturesArray)=>{
  createThumbnails(picturesArray);
});
//createThumbnails(picturesArray);
//showBigPicture(picturesArray);
setDefaultSlider();

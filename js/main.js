import {getData} from './api.js';
import {createThumbnails} from './create-thumbnails.js';
import {createGallery} from './create-gallery.js';
import {showBigPicture} from './big-picture.js';
//import {Counters} from './data.js';
import {setDefaultSlider} from './filters.js';
import './form.js';

//const picturesArray = createGallery();
//createThumbnails(picturesArray);
//showBigPicture(picturesArray);

getData().then((picturesArray)=>{
  createThumbnails(picturesArray);
});

getData().then((picturesArray)=>{
  showBigPicture(picturesArray);
});

setDefaultSlider();

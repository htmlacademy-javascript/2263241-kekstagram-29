import {Scale} from './data.js';

const buttonPlus = document.querySelector('.scale__control--bigger');
const buttonMinus = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const scaleImage = (currentScale) => {
  scaleValue.value = `${currentScale}%`;
  imgPreview.style.transform = `scale(${currentScale / Scale.MAX})`;
};

const onButtonMinusClick = () =>{
  let currentScale = parseInt(scaleValue.value, 10);
  if (currentScale > Scale.MIN){
    currentScale = parseInt(scaleValue.value, 10) - Scale.STEP;
    scaleImage(currentScale);
  } else {
    scaleImage(Scale.MIN);
  }
};

const onButtonPlusClick = () =>{
  let currentScale = parseInt(scaleValue.value, 10);
  if (currentScale < Scale.MAX){
    currentScale = parseInt(scaleValue.value, 10) + Scale.STEP;
    scaleImage(currentScale);
  } else {
    scaleImage(Scale.MAX);
  }
};

const resetScale = () => scaleImage(Scale.DEFAULT);

const addScaleListener = () => {
  buttonMinus.addEventListener('click', onButtonMinusClick);
  buttonPlus.addEventListener('click', onButtonPlusClick);
};

const removeScaleListener = () => {
  buttonMinus.removeEventListener('click', onButtonMinusClick);
  buttonPlus.removeEventListener('click', onButtonPlusClick);
};

export {resetScale, addScaleListener, removeScaleListener};

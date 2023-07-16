import {EFFECTS} from './data.js';

const DEFAULT_EFFECT = EFFECTS[0];
let currentEffect = DEFAULT_EFFECT;

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectSliderValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.img-upload__effects');
const imgPreview = document.querySelector('.img-upload__preview img');

const showSliderContainer = () => sliderContainer.classList.remove('hidden');
const hideSliderContainer = () => sliderContainer.classList.add('hidden');


const createSlider = () => {
  noUiSlider.create(sliderElement, {
    start: DEFAULT_EFFECT.max,
    range: {
      min: DEFAULT_EFFECT.min,
      max: DEFAULT_EFFECT.max,
    },
    step: DEFAULT_EFFECT.step,
    connect: 'lower',
  });
};

const isDefault = () => currentEffect === DEFAULT_EFFECT;

const updateSettingsSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    start: currentEffect.max,
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    connect: 'lower',
  });

};

const onEffectsChange = (evt) => {
  currentEffect = EFFECTS.find((element) => element.name === evt.target.value);
  if (!isDefault()) {
    updateSettingsSlider();
    showSliderContainer();
  } else {
    updateSettingsSlider();
    hideSliderContainer();
  }

};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  if (isDefault()) {
    imgPreview.style.filter = DEFAULT_EFFECT.style;
  } else{
    imgPreview.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  }
  effectSliderValue.value = sliderValue;
};

const addEffectListener = () => {
  effectsList.addEventListener('change', onEffectsChange);
};

const removeEffectListener = () => {
  effectsList.removeEventListener('change', onEffectsChange);
};

const setDefaultSlider = () => {
  createSlider();
  hideSliderContainer();
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSettingsSlider();
};

export {setDefaultSlider, resetEffects,addEffectListener,removeEffectListener};

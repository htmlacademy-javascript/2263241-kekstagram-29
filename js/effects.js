const effects = [
  {
    name : 'none',
    style : 'none',
    min : 0 ,
    max : 100 ,
    step : 1,
    unit : '',
  },
  {
    name : 'chrome',
    style : 'grayscale',
    min : 0 ,
    max : 1,
    step : 0.1,
    unit : '',
  },
  {
    name : 'sepia',
    style : 'sepia',
    min : 0,
    max : 1,
    step : 0.1,
    unit : '',
  },
  {
    name : 'marvin',
    style : 'invert',
    min : 0,
    max : 100,
    step : 1,
    unit : '%',
  },
  {
    name : 'phobos',
    style : 'blur',
    min : 0,
    max : 3,
    step : 0.1,
    unit : 'px',
  },
  {
    name : 'heat',
    style : 'brightness',
    min : 1,
    max : 3,
    step : 0.1,
    unit : '',
  }
];

const DEFAULT_EFFECT = effects[0];
let currentEffect = DEFAULT_EFFECT;

const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectSlider = document.querySelector('.effect-level__slider');
const effectSliderValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.img-upload__effects');
const imgPreview = document.querySelector('.img-upload__preview img');

const showSliderContainer = () => sliderContainer.classList.remove('hidden');
const hideSliderContainer = () => sliderContainer.classList.add('hidden');


const createSlider = () => {
  noUiSlider.create(effectSlider, {
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
  effectSlider.noUiSlider.updateOptions({
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
  currentEffect = effects.find((element) => element.name === evt.target.value);
  if (!isDefault()) {
    updateSettingsSlider();
    showSliderContainer();
  } else {
    updateSettingsSlider();
    hideSliderContainer();
  }

};

const onSliderUpdate = () => {
  const sliderValue = effectSlider.noUiSlider.get();
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
  effectSlider.noUiSlider.on('update', onSliderUpdate);
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  hideSliderContainer();
  updateSettingsSlider();
};

export {setDefaultSlider, resetEffects, addEffectListener,removeEffectListener};

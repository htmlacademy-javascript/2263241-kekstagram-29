const Counters = {
  COMMENT_BIG_PICTURE: 5,
  HASHTAG_MAX_COUNT: 5,
  HASHTAG_MIN_LENGTH: 2,
  HASHTAG_MAX_LENGTH: 20,
  COMMENT_MAX_LENGTH: 140
};
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const Scale = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
  DEFAULT: 100
};

const EFFECTS = [
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

export {Counters, Scale, EFFECTS, HASHTAG_PATTERN};

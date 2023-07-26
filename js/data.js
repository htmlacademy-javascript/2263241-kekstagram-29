const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_TIME = 500;

const Counters = {
  COMMENT_BIG_PICTURE: 5,
  HASHTAG_MAX_COUNT: 5,
  HASHTAG_MIN_LENGTH: 2,
  HASHTAG_MAX_LENGTH: 20,
  COMMENT_MAX_LENGTH: 140
};

const Scale = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
  DEFAULT: 100
};


const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM:'filter-random',
  DISCUSSED: 'filter-discussed'
};

const Variants = {
  SUCCESS: 'success',
  ERROR: 'error'
};


export {Counters, Scale, FilterType, Variants, ALERT_SHOW_TIME, DEBOUNCE_TIME, HASHTAG_PATTERN};

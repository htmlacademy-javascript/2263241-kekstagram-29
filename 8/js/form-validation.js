import {Counters, HASHTAG_PATTERN} from './data.js';

const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');


const validatePristine = new Pristine(uploadForm ,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
},
true);

//проверка длины комментария
validatePristine.addValidator(
  textDescription,
  (value) => value.length < Counters.COMMENT_MAX_LENGTH,
  `Комментарий не должен превышать ${Counters.COMMENT_MAX_LENGTH} символов`
);

const arrayHashtags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

//проверка на правильный ввод хештега
validatePristine.addValidator(
  textHashtags,
  (value) => arrayHashtags(value).every((tag) => HASHTAG_PATTERN.test(tag))
  ,
  `Хештеги должен начинаться с #, состоять из букв, цифр,не превышать ${Counters.HASHTAG_MAX_LENGTH} символов.`,
  2,
  true
);

//проверка количества хештегов
validatePristine.addValidator(
  textHashtags,
  (value) => arrayHashtags(value).length <= Counters.HASHTAG_MAX_COUNT ,
  `Количество хештегов не больше ${Counters.HASHTAG_MAX_COUNT}!`,
  3,
  true
);

//проверка на повторяющийся хештег
validatePristine.addValidator(
  textHashtags,
  (value) => {
    const words = value.toLowerCase().split(' ');
    const uniqueTags = new Set(words);
    return uniqueTags.size === words.length;
  },
  'Хештеги должны быть уникальным',
  1,
  true
);

export {validatePristine};

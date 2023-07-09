const uploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(uploadForm ,{
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const correctTextDescription = (value) => value.length >= 2 && value.length <= 140;

pristine.addValidator(
  uploadForm.querySelector('.text__description'),
  correctTextDescription,
  'Введите от 2 до 140 символов'
);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

import {isEscapeKey} from './util.js';
import {validatePristine} from './form-validation.js';

const bodyElement = document.querySelector('body');
const uploadFile = bodyElement.querySelector('#upload-file');
const uploadOverlay = bodyElement.querySelector('.img-upload__overlay');
const uploadModalCancel = bodyElement.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');


const onWindowKeyDown = (evt) => {
  if (isEscapeKey(evt) && (!evt.target.closest('.img-upload__field-wrapper'))) {
    evt.preventDefault();
    closeUploadModal();
  }
};

const onUploadModalCancelClick = () => closeUploadModal();

function closeUploadModal () {
  uploadForm.reset();
  validatePristine.reset();
  bodyElement.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onWindowKeyDown);
  uploadModalCancel.removeEventListener('click',onUploadModalCancelClick);
}

function openUploadModal () {
  bodyElement.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onWindowKeyDown);
  uploadModalCancel.addEventListener('click',onUploadModalCancelClick);
}

uploadFile.addEventListener('change', openUploadModal);

uploadForm.addEventListener('submit', (evt) => {
  const isValid = validatePristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

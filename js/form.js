import {isEscapeKey} from './util.js';

const bodyElement = document.querySelector('body');
const uploadFile = bodyElement.querySelector('#upload-file');
const uploadModal = bodyElement.querySelector('.img-upload__overlay');
const uploadModalCancel = bodyElement.querySelector('.img-upload__cancel');


const onWindowKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

const onUploadModalCancelClick = () => closeUploadModal();

function closeUploadModal () {
  bodyElement.classList.remove('modal-open');
  uploadModal.classList.add('hidden');
  document.querySelector('.img-upload__input').value = '';
  document.removeEventListener('keydown', onWindowKeyDown);
  uploadModalCancel.removeEventListener('click',onUploadModalCancelClick);
}

function openUploadModal () {
  bodyElement.classList.add('modal-open');
  uploadModal.classList.remove('hidden');
  document.addEventListener('keydown', onWindowKeyDown);
  uploadModalCancel.addEventListener('click',onUploadModalCancelClick);
}

uploadFile.addEventListener('change', openUploadModal);

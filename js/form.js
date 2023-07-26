import {isEscapeKey} from './util.js';
import {validatePristine} from './form-validation.js';
import { addScaleListener, removeScaleListener, resetScale} from './scale.js';
import {addEffectListener,removeEffectListener,resetEffects} from'./effects.js';
import { sendData } from './api.js';
import { createSuccessMessage } from './message.js';


const body = document.querySelector('body');
const uploadFile = body.querySelector('#upload-file');
const uploadOverlay = body.querySelector('.img-upload__overlay');
const uploadModalCancel = body.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const uploadModalSubmit = document.querySelector('.img-upload__submit');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');


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
  body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onWindowKeyDown);
  uploadModalCancel.removeEventListener('click',onUploadModalCancelClick);
  removeScaleListener();
  removeEffectListener();
  resetEffects();
  resetScale();
}

function openUploadModal () {
  body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onWindowKeyDown);
  uploadModalCancel.addEventListener('click',onUploadModalCancelClick);
  addScaleListener();
  addEffectListener();
}

const onUploadModalClick = () => openUploadModal();
uploadFile.addEventListener('change', onUploadModalClick);

const blockSubmitButton = () => {
  uploadModalSubmit.disabled = true;
};

const unblockSubmitButton = () => {
  uploadModalSubmit.disabled = false;
};


const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...'
};

const startSendingData = () => {
  blockSubmitButton();
  uploadModalSubmit.textContent = SubmitButtonText.SENDING;
  textHashtags.readOnly = true;
  textDescription.readOnly = true;
};

const finishSendingData = () => {
  unblockSubmitButton();
  uploadModalSubmit.textContent = SubmitButtonText.IDLE;
  textHashtags.readOnly = false;
  textDescription.readOnly = false;
};

const setUserFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = validatePristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      startSendingData();
      sendData(formData).then(()=>(closeUploadModal(),createSuccessMessage()))
        .catch(
          () => (createSuccessMessage(false))
        )
        .finally(finishSendingData);
    }
  });
};
export {setUserFormSubmit};

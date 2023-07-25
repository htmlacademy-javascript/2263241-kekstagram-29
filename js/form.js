import {isEscapeKey} from './util.js';
import {validatePristine} from './form-validation.js';
import { addScaleListener, removeScaleListener, resetScale} from './scale.js';
import {addEffectListener,removeEffectListener,resetEffects} from'./effects.js';
import { sendData } from './api.js';
import { createSuccessMessage } from './message.js';


const bodyElement = document.querySelector('body');
const uploadFile = bodyElement.querySelector('#upload-file');
const uploadOverlay = bodyElement.querySelector('.img-upload__overlay');
const uploadModalCancel = bodyElement.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const uploadModalSubmit = document.querySelector('.img-upload__submit');
const elementHashtags = document.querySelector('.text__hashtags');
const elementDescription = document.querySelector('.text__description');


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
  removeScaleListener();
  removeEffectListener();
  resetEffects();
  resetScale();
}

function openUploadModal () {
  bodyElement.classList.add('modal-open');
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

const startSendData = () => {
  blockSubmitButton();
  uploadModalSubmit.textContent = SubmitButtonText.SENDING;
  elementHashtags.readOnly = true;
  elementDescription.readOnly = true;
};

const EndSendData = () => {
  unblockSubmitButton();
  uploadModalSubmit.textContent = SubmitButtonText.IDLE;
  elementHashtags.readOnly = false;
  elementDescription.readOnly = false;
};

const setUserFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = validatePristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      startSendData();
      sendData(formData,()=>(closeUploadModal(),createSuccessMessage()))
        .catch(
          () => (createSuccessMessage(false))
        )
        .finally(EndSendData);
    }
  });
};
export {setUserFormSubmit};

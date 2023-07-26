import {isEscapeKey} from './util.js';
import {Variants} from './data.js';

let currentMessage,currentButton;

const body = document.querySelector('body');

const createSuccessMessage = (success = true) => {
  let typeMessage;
  if (success === true) {
    typeMessage = Variants.SUCCESS;
  } else {
    typeMessage = Variants.ERROR;
  }

  const currentMessageTemplate = document.querySelector(`#${typeMessage}`).content.querySelector(`.${typeMessage}`);
  currentMessage = currentMessageTemplate.cloneNode(true);
  currentButton = currentMessage.querySelector(`.${typeMessage}__button`);

  currentButton.addEventListener('click',onSuccessClick);
  body.addEventListener('keydown',onKeyDownPress);
  body.addEventListener('click',onOutSideClick);
  body.append(currentMessage);
};

const removeMessage = (element) => element.remove();

const closeMessage = () => {
  removeMessage(currentMessage);
  body.removeEventListener('keydown',onKeyDownPress);
  body.removeEventListener('click',onOutSideClick);
  currentButton.removeEventListener('click',onSuccessClick);
};

function onKeyDownPress (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    closeMessage();
  }
}

function onSuccessClick () {
  closeMessage();
}


function onOutSideClick(evt) {
  if(evt.target === currentMessage){
    closeMessage();
  }
}


export {createSuccessMessage};

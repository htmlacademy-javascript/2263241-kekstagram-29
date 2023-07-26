import {isEscapeKey} from './util.js';
import {Variants} from './data.js';

const createSuccessMessage = (success = true) => {
  let typeMessage;
  if (success === true) {
    typeMessage = Variants.SUCCESS;
  } else {
    typeMessage = Variants.ERROR;
  }

  const currentMessageTemplate = document.querySelector(`#${typeMessage}`).content.querySelector(`.${typeMessage}`);
  const currentMessage = currentMessageTemplate.cloneNode(true);
  const currentButton = currentMessage.querySelector(`.${typeMessage}__button`);
  const body = document.querySelector('body');

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

  currentButton.addEventListener('click',onSuccessClick);
  body.addEventListener('keydown',onKeyDownPress);
  body.addEventListener('click',onOutSideClick);
  body.append(currentMessage);

};

export {createSuccessMessage};

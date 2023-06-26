// Функция для проверки длины строки.
function checkLength(charset, lengthCharset){
  return charset.length <= lengthCharset;
}

checkLength('привет привет!', 10);


//Функция для проверки, является ли строка палиндромом.
function isPalindrome (string) {
  const checkingString = string.replaceAll(' ', '').toUpperCase();
  let newString = '';
  for (let i = checkingString.length - 1; i >= 0; i--) {
    newString += checkingString[i];
  }
  return checkingString === newString;
}

isPalindrome(' А роза упала на лапу Азора ');


//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
function getNumbers(value) {
  const currentValue = value.toString();
  let newValue = '';
  for (let i = 0; i <= currentValue.length; i++) {
    if (!Number.isNaN(parseInt(currentValue[i],10))) {
      newValue += currentValue[i];
    }
  }
  return parseInt(newValue, 10);
}
getNumbers('1 кефир, 0.5 батона');


/*Напишите функцию, которая принимает время начала и конца рабочего дня,
а также время старта и продолжительность встречи в минутах и возвращает true,
если встреча не выходит за рамки рабочего дня, и false, если выходит.
 */
const WORKING_MIN_IN_HOUR = 60;
const convertToMinuts = (strTime) =>{
  const [hours, minutes] = strTime.split(':');
  return parseInt(hours,10) * WORKING_MIN_IN_HOUR + parseInt(minutes,10);
};

const checkMeetingTime = (startWorkDay, endWorkDay, startMeeting, timeMeeting) => {
  const startWorkDayMinuts = convertToMinuts(startWorkDay);
  const endWorkDayMinuts = convertToMinuts(endWorkDay);
  const startMeetingMinuts = convertToMinuts(startMeeting);

  return (startMeetingMinuts >= startWorkDayMinuts) && (startMeetingMinuts + timeMeeting <= endWorkDayMinuts);
};

checkMeetingTime('08:00', '17:30', '14:00', 90); // true
checkMeetingTime('8:0', '10:0', '8:0', 120); // true
checkMeetingTime('08:00', '14:30', '14:00', 90); // false
checkMeetingTime('14:00', '17:30', '08:0', 90); // false
checkMeetingTime('8:00', '17:30', '08:00', 900); // false

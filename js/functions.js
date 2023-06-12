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

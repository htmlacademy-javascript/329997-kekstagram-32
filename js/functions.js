//Функция для проверки длины строки
const checkStringLength = (inputString, maxLength) => inputString.length <= maxLength;

//Функция для проверки, является ли строка палиндромом
const checkStringIsPalindrome = (inputString) => {
  inputString = inputString.toLowerCase().replaceAll(' ','');
  let reversedString = '';
  for (let i = -1; Math.abs(i) <= inputString.length; i--) {
    reversedString += inputString.at(i);
  }
  return inputString === reversedString;
};

//Дополнительное задание. Функция извелечения целого положительного числа
const getNumbers = (inputString) => {
  inputString = inputString.toString();
  let result = '';
  for (let i = 0; i <= inputString.length - 1; i++) {
    if (!Number.isNaN(parseInt(inputString[i], 10))) {
      result += inputString[i];
    }
  }
  return parseInt(result, 10);
};

checkStringLength('tester', 10);
checkStringIsPalindrome('довод');
getNumbers('fdhsfkj 032$*#!JDSAL!0-00');

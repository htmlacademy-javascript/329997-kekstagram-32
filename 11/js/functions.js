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

//5.16. Функции возвращаются

const getMinutes = (time) => {
  const convertedHours = parseInt(time.split(':')[0], 10) * 60;
  const convertedMinutes = parseInt(time.split(':')[1], 10);
  return convertedHours + convertedMinutes;
};

const isMeetingWithinWorkingDay = (timeStartOfTheDay, timeEndOfTheDay, timeStartOfTheMeeting, duratationOfMeeting) => {
  const timeOfMeeting = getMinutes(timeStartOfTheMeeting) + duratationOfMeeting;
  const timeStartOfTheDayInMin = getMinutes(timeStartOfTheDay);
  const timeStartOfTheMeetingInMin = getMinutes(timeStartOfTheMeeting);
  const timeEndOfTheDayInMin = getMinutes(timeEndOfTheDay);
  return (timeStartOfTheMeetingInMin >= timeStartOfTheDayInMin) && (timeOfMeeting <= timeEndOfTheDayInMin);
};


isMeetingWithinWorkingDay('08:00', '17:30', '14:00', 90); // true
isMeetingWithinWorkingDay('8:0', '10:0', '8:0', 120); // true
isMeetingWithinWorkingDay('08:00', '14:30', '14:00', 90); // false
isMeetingWithinWorkingDay('14:00', '17:30', '08:0', 90); // false
isMeetingWithinWorkingDay('8:00', '17:30', '08:00', 900); // false

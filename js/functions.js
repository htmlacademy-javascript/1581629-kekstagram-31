const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;

const validateStringLength = (sourceString, maxLength) => sourceString.length <= maxLength;


const isPalindrome = (sourceString) => {
  const normalizedString = sourceString.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for(let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  return reversedString === normalizedString;
};

const extractDigitsAsNumber = (parameter) => {
  const string = parameter.toString();

  let stringWithDigits = '';
  let digit;
  for(let i = 0; i < string.length; i++) {
    digit = parseInt(string[i], 10);
    if (!isNaN(digit)) {
      stringWithDigits += digit;
    }
  }

  return parseInt(stringWithDigits, 10);
};

/**
 * Проверяет, выходит ли встреча за рамки рабочего дня.
 *
 * @param {string} workTimeStart
 * @param {string} workTimeEnd
 * @param {string} meetingTimeStart
 * @param {number} meetingDuration Продолжительность встречи в минутах
 *
 * @return {boolean}
 */
const isMeetingWithinWorktime = (workTimeStart, workTimeEnd, meetingTimeStart, meetingDuration) => {
  const someDate = '2024.01.01';
  const workStart = new Date(`${someDate} ${workTimeStart}`);
  const workEnd = new Date(`${someDate} ${workTimeEnd}`);
  const meetingStart = new Date(`${someDate} ${meetingTimeStart}`);

  const minutesTillWorkTimeEnd = (workEnd - meetingStart) / (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE);

  return meetingStart >= workStart && meetingDuration <= minutesTillWorkTimeEnd;
};

validateStringLength('строка', 6);

isPalindrome('топот');

extractDigitsAsNumber('ECMAScript 2022');

isMeetingWithinWorktime('14:00', '17:30', '08:0', 90);

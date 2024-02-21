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

validateStringLength('строка', 6);

isPalindrome('топот');

extractDigitsAsNumber('ECMAScript 2022');

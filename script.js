'use strict';

// form.addEventListener('submit', (event) => {
  

//   // const language = 'ENG';
// }) 
  
const engUp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const engLow = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const english = [engUp, engLow];

const ukrUp = ['А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж', 'З', 'И', 'І', 'Ї', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ю', 'Я'];
const ukrLow = ['а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я'];
const ukrainian = [ukrUp, ukrLow];

const numbers = [[],['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']];

function vigenereCipher(word, keyNums, mode, alfabet) {
  
  if (keyNums.length <= 0) {
    return `Key was not defined`;
  }

  const wordArray = word.split('');
  let output = '';

  switch (mode) {
    case 'encrypt':
      for (let i = 0; i < wordArray.length; i++) {
        let upOrLow = 0;
        if (wordArray[i] == wordArray[i].toUpperCase()) {
          upOrLow = 0;
        } else if (wordArray[i] == wordArray[i].toLowerCase()){
          upOrLow = 1;
        }
    
        if (+wordArray[i] === 0 || +wordArray[i]) {
          let numWord = +wordArray[i];
          let numKey = keyNums[i] % 10;

          if (numWord - numKey < 0) {
            output += `${10 - (numKey - numWord)}`;
            continue;
          }
          
          output += `${(numWord - numKey) % 10}`;
          continue;
        }
    
        for (let ii = 0; ii < alfabet[upOrLow].length; ii++) {
          if (+wordArray[i]) {
            continue;
          }
    
          if (wordArray[i] === alfabet[upOrLow][ii]) {
            if ((ii - keyNums[i]) < 0) {
              output += alfabet[upOrLow][alfabet[upOrLow].length - (keyNums[i] - ii)];
              break;
            }
    
            output += alfabet[upOrLow][ii - keyNums[i]];
            break;
          }
        }
      }
      document.getElementById('decrypted').value = output;
      return output;

    case 'decrypt':
      for (let i = 0; i < wordArray.length; i++) {
        let upOrLow = 0;
        if (wordArray[i] == wordArray[i].toUpperCase()) {
          upOrLow = 0;
        } else if (wordArray[i] == wordArray[i].toLowerCase()){
          upOrLow = 1;
        }
    
        if (+wordArray[i] === 0 || +wordArray[i]) {
          let numWord = +wordArray[i];
          let numKey = keyNums[i] % 10;
    
          output += `${(numWord + numKey) % 10}`;
          continue;
        }
    
        for (let ii = 0; ii < alfabet[upOrLow].length; ii++) {
          if (+wordArray[i]) {
            continue;
          }
    
          if (wordArray[i] === alfabet[upOrLow][ii]) {
            if ((ii + keyNums[i]) >= alfabet[upOrLow].length) {
              output += alfabet[upOrLow][(ii + keyNums[i]) % alfabet[upOrLow].length];
              continue;
            }
    
            output += alfabet[upOrLow][ii + keyNums[i]];
          }
        }
      }
      document.getElementById('decrypted').value = output;
      return output;
  }
};

function defineAlfabet(language) {
  let alfabet;

  switch (language) {
    case 'english':
      alfabet = english;
      break;

    case 'ukrainian':
      alfabet = ukrainian;
      break;
  }

  return alfabet;
}

function defineKey(initialKey, initialWord) {
  let keyArray = initialKey.split('');

  if (keyArray.length > initialWord.length) {
    keyArray.splice(initialWord.length);
  }

  if (keyArray.length === initialWord.length) {
    return keyArray;
  }

  let keyIndex = 0;
  let newKey = [];

  for (let i = 0; i < initialWord.length; i++) {
    newKey.push(keyArray[keyIndex]);
    keyIndex++;
    
    if (keyIndex === keyArray.length) {
      keyIndex = 0;
      continue;
    }
  }

  return newKey;
};

function defineKeyNums(newKey, alfabet) {
  let keyNums = [];

  for (let i = 0; i < newKey.length; i++) {
    for (let ii = 0; ii < alfabet[1].length; ii++) {
      if (newKey[i] === alfabet[1][ii]) {
        keyNums.push(ii);
      }
    }
  }

  return keyNums;
}
  
function getInput() {
  const form = document.getElementById('form');
  let input = form.elements['encrypted'].value;
  let key = form.elements['key'].value.toLowerCase();
  let language = form.elements['language'].value;
  let mode = form.elements['mode'].value;

  let alfabet = defineAlfabet(language);
  let newKey = defineKey(key, input);
  let keyNums = defineKeyNums(newKey, alfabet);
  
  console.log(`input: ${input}, key: ${key}, language: ${language}`);
  document.getElementById('decrypted').innerHTML = '';
  document.getElementById('decrypted').innerHTML = vigenereCipher(input, keyNums, mode, alfabet);
}

function clearForm() {
  document.getElementById('encrypted').value = '';
  document.getElementById('decrypted').value = '';
}
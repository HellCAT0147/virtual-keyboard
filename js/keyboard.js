class Button {
  constructor(type = 'letter') {
    if (type === 'letter' || type === 'number') {
      this.purpose = 'type';
    } else {
      this.purpose = type;
    }
    this.mainLabel = null;
    this.subLabel = null;
  }
}

function createButtons(row, ...buttons) {
  buttons.forEach((button) => {
    const buttonHTML = document.createElement('button');
    const span = document.createElement('span');
    const span2 = document.createElement('span');
    let btn;

    buttonHTML.classList.add('row__button');
    span.classList.add('row__title');
    if (button.shiftLabel) {
      btn = new Button('number');
      btn.subLabel = button.shiftLabel;
      span2.classList.add('row__title', 'row__title_shifted');
    } else if (button.label.length > 1) {
      switch (button.label) {
        case 'Tab':
          btn = new Button('tab');
          buttonHTML.classList.add('row__button_width_thin');
          break;
        case 'Caps Lock':
          btn = new Button('caps');
          buttonHTML.classList.add('row__button_width_medium');
          break;
        case 'Enter':
          btn = new Button('enter');
          buttonHTML.classList.add('row__button_width_wide');
          break;
        case 'Shift':
          btn = new Button('shift');
          buttonHTML.classList.add('row__button_width_thick');
          break;
        case 'Ctrl':
          btn = new Button('ctrl');
          buttonHTML.classList.add('row__button_width_slim');
          break;
        case 'Alt':
          btn = new Button('alt');
          break;
        case 'Backspace':
          btn = new Button('backspace');
          buttonHTML.classList.add('row__button_width_wide');
          break;
        case 'Del':
          btn = new Button('delete');
          break;
        default:
          btn = new Button('win');
          span.classList.add('row__title_type_win');
      }
    } else if (button.label.match(/[a-z]/i)) {
      btn = new Button();
      span.classList.add('row__title_type_letter');
    } else if (!button.label.length) {
      btn = new Button('space');
      buttonHTML.classList.add('row__button_width_largest');
    } else {
      btn = new Button('arrowUp');
      buttonHTML.classList.add('row__button_type_arrow');
      span.classList.add('row__title_type_arrow');
    }
    btn.mainLabel = button.label;

    span.innerHTML = btn.mainLabel;
    span2.innerHTML = btn.subLabel;

    buttonHTML.appendChild(span);
    buttonHTML.appendChild(span2);
    row.appendChild(buttonHTML);
  });
  return row;
}

function createKeyboard() {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  const main = document.createElement('main');
  const display = document.createElement('textarea');
  const keyboard = document.createElement('div');
  const rows = [];
  const instructions = document.createElement('div');
  const system = document.createElement('p');
  const language = document.createElement('p');

  for (let i = 0; i < 5; i += 1) {
    rows.push(document.createElement('div'));
  }

  rows[0] = createButtons(
    rows[0],
    { label: '`', shiftLabel: '~' },
    { label: '1', shiftLabel: '!' },
    { label: '2', shiftLabel: '@' },
    { label: '3', shiftLabel: '#' },
    { label: '4', shiftLabel: '$' },
    { label: '5', shiftLabel: '%' },
    { label: '6', shiftLabel: '^' },
    { label: '7', shiftLabel: '&' },
    { label: '8', shiftLabel: '*' },
    { label: '9', shiftLabel: '(' },
    { label: '0', shiftLabel: ')' },
    { label: '-', shiftLabel: '_' },
    { label: '=', shiftLabel: '+' },
    { label: 'Backspace' },
  );

  rows[1] = createButtons(
    rows[1],
    { label: 'Tab' },
    { label: 'Q' },
    { label: 'W' },
    { label: 'E' },
    { label: 'R' },
    { label: 'T' },
    { label: 'Y' },
    { label: 'U' },
    { label: 'I' },
    { label: 'O' },
    { label: 'P' },
    { label: '[', shiftLabel: '{' },
    { label: ']', shiftLabel: '}' },
    { label: '\\', shiftLabel: '|' },
    { label: 'Del' },
  );

  rows[2] = createButtons(
    rows[2],
    { label: 'Caps Lock' },
    { label: 'A' },
    { label: 'S' },
    { label: 'D' },
    { label: 'F' },
    { label: 'G' },
    { label: 'H' },
    { label: 'J' },
    { label: 'K' },
    { label: 'L' },
    { label: ';', shiftLabel: ':' },
    { label: '\'', shiftLabel: '"' },
    { label: 'Enter' },
  );

  rows[3] = createButtons(
    rows[3],
    { label: 'Shift' },
    { label: 'Z' },
    { label: 'X' },
    { label: 'C' },
    { label: 'V' },
    { label: 'B' },
    { label: 'N' },
    { label: 'M' },
    { label: ',', shiftLabel: '<' },
    { label: '.', shiftLabel: '>' },
    { label: '/', shiftLabel: '?' },
    { label: '↑' },
    { label: 'Shift' },
  );

  rows[4] = createButtons(
    rows[4],
    { label: 'Ctrl' },
    { label: '<img src="assets/win-icon.png" alt="windows 11 start-icon">' },
    { label: 'Alt' },
    { label: '' },
    { label: 'Alt' },
    { label: '←' },
    { label: '↓' },
    { label: '→' },
    { label: 'Ctrl' },
  );

  system.textContent = 'This virtual keyboard was created in Windows 11.';
  language.textContent = 'To switch language on left side of physical keyboard press Alt + Shift or Shift + Alt.';

  html.classList.add('page');
  body.classList.add('body');
  main.classList.add('all');
  display.classList.add('all__display');
  display.setAttribute('type', 'text');
  keyboard.classList.add('keyboard', 'all__keyboard');
  rows.forEach((row) => row.classList.add('row', 'keyboard__row'));
  instructions.classList.add('all__instructions');

  rows.forEach((row) => keyboard.appendChild(row));
  [system, language].forEach((p) => instructions.appendChild(p));
  [display, keyboard, instructions].forEach((div) => main.appendChild(div));
  body.appendChild(main);
}

createKeyboard();

// Getting all buttons by groups in order to manipulate them comfortably
const ALL_BUTTONS = document.querySelectorAll('.row__button');
const ALL_LABELS = document.querySelectorAll('.row__title');
const DELETE = Array.from(ALL_LABELS).find((label) => label.innerHTML === 'Del');
const ALTS = Array.from(ALL_LABELS).filter((label) => label.innerHTML === 'Alt');
const SHIFT_BUTTONS = document.querySelectorAll('.row__button_width_thick');

const SHIFTED_SECONDS = document.querySelectorAll('.row__title_shifted'); // labels of special characters like #, $, %, etc.
const PRESSED_BUTTONS = [];
const SCREEN = document.querySelector('textarea');
const BACKSPACE_BUTTON = document.querySelector('.row__button_width_wide');
const CAPS_LOCK_BUTTON = document.querySelector('.row__button_width_medium');
const SPACE_BUTTON = document.querySelector('.row__button_width_largest');
const CTRL_BUTTONS = document.querySelectorAll('.row__button_width_slim');
const TAB_BUTTON = document.querySelector('.row__button_width_thin');
const ENTER_BUTTON = document.querySelectorAll('.row__button_width_wide')[1];
const WINKEY = document.querySelector('.row__title_type_win');
const LETTERS = document.querySelectorAll('.row__title_type_letter');
const ARROW_BUTTONS = document.querySelectorAll('.row__button_type_arrow');
const LETTER_BINDINGS = {
  Q: 'Й',
  W: 'Ц',
  E: 'У',
  R: 'К',
  T: 'Е',
  Y: 'Н',
  U: 'Г',
  I: 'Ш',
  O: 'Щ',
  P: 'З',
  A: 'Ф',
  S: 'Ы',
  D: 'В',
  F: 'А',
  G: 'П',
  H: 'Р',
  J: 'О',
  K: 'Л',
  L: 'Д',
  Z: 'Я',
  X: 'Ч',
  C: 'С',
  V: 'М',
  B: 'И',
  N: 'Т',
  M: 'Ь',
};

let cursor = 0;
let shiftTrigger = false;
let capsTrigger = false;
let capslockLock = false; // lock CapsLock button when it is pressed
let timeAltCtrl; // for setting and then checking time between behaviours
let enLanguage = true;

SCREEN.setAttribute('style', 'min-height: 0;');

function changeLanguage(language) {
  if (language) {
    for (let i = 0; i < LETTERS.length; i += 1) {
      LETTERS[i].innerHTML = Object.values(LETTER_BINDINGS)[i];
    }
    const specialCharacters = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Х', 'Ъ', '/', 'Ж', 'Э', 'Б', 'Ю', ',', '.'];
    for (let i = 0; i < SHIFTED_SECONDS.length; i += 1) {
      if (specialCharacters[i].match(/[а-я]/i) || specialCharacters[i] === 'Ё') {
        SHIFTED_SECONDS[i].previousSibling.innerHTML = specialCharacters[i];
        SHIFTED_SECONDS[i].innerHTML = '';
        SHIFTED_SECONDS[i].classList.remove('row__title_shifted');
        SHIFTED_SECONDS[i].previousSibling.classList.add('row__title_type_letter');
      } else {
        SHIFTED_SECONDS[i].innerHTML = specialCharacters[i];
        if (i === SHIFTED_SECONDS.length - 1) {
          SHIFTED_SECONDS[i].previousSibling.innerHTML = specialCharacters[i + 1];
        }
      }
    }
  } else {
    for (let i = 0; i < LETTERS.length; i += 1) {
      LETTERS[i].innerHTML = Object.keys(LETTER_BINDINGS)[i];
    }
    const specialCharacters = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?', '/', '.', ',', '\'', ';', ']', '[', '`'];
    for (let i = 0; i < specialCharacters.length; i += 1) {
      SHIFTED_SECONDS[i].innerHTML = specialCharacters[i];
      switch (i) {
        case 0:
        case 13:
        case 14:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
          SHIFTED_SECONDS[i].classList.add('row__title_shifted');
          SHIFTED_SECONDS[i].previousSibling.classList.remove('row__title_type_letter');
          SHIFTED_SECONDS[i].previousSibling.innerHTML = specialCharacters.pop([i]);
          break;
        default:
      }
    }
  }
  enLanguage = !enLanguage;
}

// Local Storage
function setLocalStorage(key, value) {
  if (value) localStorage.setItem(key, 'en');
  else localStorage.setItem(key, 'ru');
}
window.addEventListener('beforeunload', () => {
  setLocalStorage('lang', enLanguage);
});

function getLocalStorage(key) {
  if (localStorage.getItem(key)) {
    return localStorage.getItem(key);
  }
  return null;
}
window.addEventListener('load', () => {
  if (getLocalStorage('lang') === 'ru') {
    changeLanguage(true);
  }
});

function removeFromArray(array, trash) {
  const id = array.indexOf(trash);
  if (id >= 0) {
    array.splice(id, 1);
  }
}

function shift(side) {
  ALL_BUTTONS.forEach((button) => {
    const spans = button.querySelectorAll('span');
    if (spans[1].innerHTML) {
      spans[0].setAttribute('style', 'color: #d8ffce8c');
      spans[1].setAttribute('style', 'color: #d8ffce');
    }
  });
  if (side === 'ShiftLeft') {
    SHIFT_BUTTONS[0].classList.add('row__button_active');
  } else if (side === 'ShiftRight') {
    SHIFT_BUTTONS[1].classList.add('row__button_active');
  }
  shiftTrigger = true;
}

function unshift(side) {
  const spans = document.querySelectorAll('span');
  spans.forEach((span) => span.removeAttribute('style'));
  if (side === 'ShiftLeft') {
    SHIFT_BUTTONS[0].classList.remove('row__button_active');
  } else if (side === 'ShiftRight') {
    SHIFT_BUTTONS[1].classList.remove('row__button_active');
  }
  shiftTrigger = false;
}

function switchCapsLock() {
  if (!capslockLock) {
    capsTrigger = !capsTrigger;
  }
  capslockLock = true;
}

function typeToCursorPlace(letter, shif = false, cap = false) {
  if (letter === 'backspace') {
    if (cursor > 0) {
      const leftText = SCREEN.value.slice(0, cursor - 1);
      const resultLetter = '';
      const rightText = SCREEN.value.slice(cursor);
      SCREEN.value = leftText + resultLetter + rightText;
      cursor -= 1;
    }
  } else if (letter === 'delete') {
    const leftText = SCREEN.value.slice(0, cursor);
    const resultLetter = '';
    const rightText = SCREEN.value.slice(cursor + 1);
    SCREEN.value = leftText + resultLetter + rightText;
  } else {
    let isBig = false;
    if (shif) isBig = !isBig;
    if (cap) isBig = !isBig;
    const resultLetter = (isBig) ? letter.toUpperCase() : letter.toLowerCase();
    const leftText = SCREEN.value.slice(0, cursor);
    const rightText = SCREEN.value.slice(cursor);
    SCREEN.value = leftText + resultLetter + rightText;
    cursor += resultLetter.length;
  }
  SCREEN.selectionStart = cursor;
  SCREEN.selectionEnd = cursor;
}

// Keyboard events when button is hold
document.addEventListener('keydown', (event) => {
  if (event.code === 'ControlLeft') {
    setTimeout(() => {
      if (Math.ceil(timeAltCtrl) > 1) CTRL_BUTTONS[0].classList.add('row__button_active');
    }, 5);
    timeAltCtrl = event.timeStamp;
  } else if (event.code === 'AltRight') {
    timeAltCtrl -= event.timeStamp;
    event.preventDefault();
    ALTS[1].parentNode.classList.add('row__button_active');
  } else if (event.key === 'Shift') {
    if (!PRESSED_BUTTONS.includes(event.code)) PRESSED_BUTTONS.push(event.code);
    else if (event.code === 'ShiftRight' && PRESSED_BUTTONS.includes('ShiftLeft')) {
      unshift('ShiftLeft');
      removeFromArray(PRESSED_BUTTONS, 'ShiftLeft');
    } else if (event.code === 'ShiftLeft' && PRESSED_BUTTONS.includes('ShiftRight')) {
      unshift('ShiftRight');
      removeFromArray(PRESSED_BUTTONS, 'ShiftRight');
    }
    shift(event.code);
  } else if (event.code.includes('Key')) {
    event.preventDefault();
    if (enLanguage) {
      LETTERS.forEach((letterBtn) => {
        if (letterBtn.innerHTML === event.code[3]) letterBtn.parentNode.classList.add('row__button_active');
      });
      typeToCursorPlace(event.code[3], shiftTrigger, capsTrigger);
    } else {
      LETTERS.forEach((letterBtn) => {
        if (letterBtn.innerHTML === LETTER_BINDINGS[event.code[3]]) letterBtn.parentNode.classList.add('row__button_active');
      });
      typeToCursorPlace(LETTER_BINDINGS[event.code[3]], shiftTrigger, capsTrigger);
    }
  } else if (event.key === 'CapsLock') {
    CAPS_LOCK_BUTTON.classList.add('row__button_active');
    switchCapsLock();
    if (capsTrigger) CAPS_LOCK_BUTTON.setAttribute('style', 'border-color: #005016;');
    else CAPS_LOCK_BUTTON.removeAttribute('style');
  } else if (event.key === 'Backspace') {
    event.preventDefault();
    typeToCursorPlace('backspace');
    BACKSPACE_BUTTON.classList.add('row__button_active');
  } else if (event.key === 'Delete') {
    event.preventDefault();
    typeToCursorPlace('delete');
    DELETE.parentNode.classList.add('row__button_active');
  } else if (event.code === 'Space') {
    event.preventDefault();
    typeToCursorPlace(' ');
    SPACE_BUTTON.classList.add('row__button_active');
  } else if (event.code === 'ControlRight') {
    CTRL_BUTTONS[1].classList.add('row__button_active');
  } else if (event.code === 'AltLeft') {
    event.preventDefault();
    ALTS[0].parentNode.classList.add('row__button_active');
  } else if (event.code.includes('Digit')) {
    event.preventDefault();
    SHIFTED_SECONDS.forEach((title) => {
      if (title.previousSibling.innerHTML === event.code[5]) {
        title.parentNode.classList.add('row__button_active');
        if (shiftTrigger) {
          if (event.code[5] === '7' && enLanguage) typeToCursorPlace('&');
          else typeToCursorPlace(title.innerHTML);
        } else typeToCursorPlace(event.code[5]);
      }
    });
  } else if (event.code === 'Backquote') {
    event.preventDefault();
    SHIFTED_SECONDS[0].parentNode.classList.add('row__button_active');
    if (shiftTrigger && enLanguage) typeToCursorPlace(SHIFTED_SECONDS[0].innerHTML);
    else if (!shiftTrigger && enLanguage) {
      typeToCursorPlace(SHIFTED_SECONDS[0].previousSibling.innerHTML);
    } else {
      typeToCursorPlace(SHIFTED_SECONDS[0].previousSibling.innerHTML, shiftTrigger, capsTrigger);
    }
  } else if (event.code === 'Minus') {
    event.preventDefault();
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '_') {
        title.parentNode.classList.add('row__button_active');
        if (shiftTrigger) typeToCursorPlace(title.innerHTML);
        else typeToCursorPlace(title.previousSibling.innerHTML);
      }
    });
  } else if (event.code === 'Equal') {
    event.preventDefault();
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '+') {
        title.parentNode.classList.add('row__button_active');
        if (shiftTrigger) typeToCursorPlace(title.innerHTML);
        else typeToCursorPlace(title.previousSibling.innerHTML);
      }
    });
  } else if (event.code === 'BracketLeft') {
    event.preventDefault();
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '{' || title.previousSibling.innerHTML === 'Х') {
        title.parentNode.classList.add('row__button_active');
        if (shiftTrigger && enLanguage) typeToCursorPlace(title.innerHTML);
        else if (!shiftTrigger && enLanguage) typeToCursorPlace(title.previousSibling.innerHTML);
        else typeToCursorPlace(title.previousSibling.innerHTML, shiftTrigger, capsTrigger);
      }
    });
  } else if (event.code === 'BracketRight') {
    event.preventDefault();
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '}' || title.previousSibling.innerHTML === 'Ъ') {
        title.parentNode.classList.add('row__button_active');
        if (shiftTrigger && enLanguage) typeToCursorPlace(title.innerHTML);
        else if (!shiftTrigger && enLanguage) typeToCursorPlace(title.previousSibling.innerHTML);
        else typeToCursorPlace(title.previousSibling.innerHTML, shiftTrigger, capsTrigger);
      }
    });
  } else if (event.code === 'Backslash') {
    event.preventDefault();
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '|' && enLanguage) {
        title.parentNode.classList.add('row__button_active');
        if (shiftTrigger) typeToCursorPlace(title.innerHTML);
        else typeToCursorPlace(title.previousSibling.innerHTML);
      } else if (!enLanguage && title.innerHTML === '/') {
        title.parentNode.classList.add('row__button_active');
        if (shiftTrigger) typeToCursorPlace(title.innerHTML);
        else typeToCursorPlace(title.previousSibling.innerHTML);
      }
    });
  } else if (event.code === 'Tab') {
    event.preventDefault();
    typeToCursorPlace('    ');
    TAB_BUTTON.classList.add('row__button_active');
  } else if (event.code === 'Enter') {
    event.preventDefault();
    typeToCursorPlace('\n');
    ENTER_BUTTON.classList.add('row__button_active');
  } else if (event.code === 'Semicolon') {
    event.preventDefault();
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === ':' && enLanguage) {
        title.parentNode.classList.add('row__button_active');
        if (shiftTrigger) typeToCursorPlace(title.innerHTML);
        else typeToCursorPlace(title.previousSibling.innerHTML);
      } else if (title.previousSibling.innerHTML === 'Ж') {
        title.parentNode.classList.add('row__button_active');
        typeToCursorPlace(title.previousSibling.innerHTML, shiftTrigger, capsTrigger);
      }
    });
  } else if (event.code === 'Quote') {
    event.preventDefault();
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '"' && enLanguage) {
        title.parentNode.classList.add('row__button_active');
        if (shiftTrigger) typeToCursorPlace(title.innerHTML);
        else typeToCursorPlace(title.previousSibling.innerHTML);
      } else if (title.previousSibling.innerHTML === 'Э') {
        title.parentNode.classList.add('row__button_active');
        typeToCursorPlace(title.previousSibling.innerHTML, shiftTrigger, capsTrigger);
      }
    });
  } else if (event.code === 'Comma') {
    event.preventDefault();
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '&lt;' && enLanguage) {
        title.parentNode.classList.add('row__button_active');
        if (shiftTrigger) typeToCursorPlace('<');
        else typeToCursorPlace(title.previousSibling.innerHTML);
      } else if (title.previousSibling.innerHTML === 'Б') {
        title.parentNode.classList.add('row__button_active');
        typeToCursorPlace(title.previousSibling.innerHTML, shiftTrigger, capsTrigger);
      }
    });
  } else if (event.code === 'Period') {
    event.preventDefault();
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '&gt;' && enLanguage) {
        title.parentNode.classList.add('row__button_active');
        if (shiftTrigger) typeToCursorPlace('>');
        else typeToCursorPlace(title.previousSibling.innerHTML);
      } else if (title.previousSibling.innerHTML === 'Ю') {
        title.parentNode.classList.add('row__button_active');
        typeToCursorPlace(title.previousSibling.innerHTML, shiftTrigger, capsTrigger);
      }
    });
  } else if (event.code === 'Slash') {
    event.preventDefault();
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '?' && enLanguage) {
        title.parentNode.classList.add('row__button_active');
        if (shiftTrigger) typeToCursorPlace(title.innerHTML);
        else typeToCursorPlace(title.previousSibling.innerHTML);
      } else if (title.innerHTML === ',' && !enLanguage) {
        title.parentNode.classList.add('row__button_active');
        if (shiftTrigger) typeToCursorPlace(title.innerHTML);
        else typeToCursorPlace(title.previousSibling.innerHTML);
      }
    });
  } else if (event.code === 'MetaLeft') {
    event.preventDefault();
    WINKEY.parentNode.classList.add('row__button_active');
  } else if (event.code === 'ArrowDown') {
    event.preventDefault();
    ARROW_BUTTONS[2].classList.add('row__button_type_arrow_active');
    typeToCursorPlace('↓');
  } else if (event.code === 'ArrowUp') {
    event.preventDefault();
    ARROW_BUTTONS[0].classList.add('row__button_type_arrow_active');
    typeToCursorPlace('↑');
  } else if (event.code === 'ArrowLeft') {
    event.preventDefault();
    ARROW_BUTTONS[1].classList.add('row__button_type_arrow_active');
    typeToCursorPlace('←');
  } else if (event.code === 'ArrowRight') {
    event.preventDefault();
    ARROW_BUTTONS[3].classList.add('row__button_type_arrow_active');
    typeToCursorPlace('→');
  }
  if (SCREEN.value.length) {
    SCREEN.setAttribute('style', 'min-height: 150px;');
  } else {
    SCREEN.setAttribute('style', 'min-height: 0;');
  }
});

// Keyboard events when button is released
document.addEventListener('keyup', (event) => {
  if (event.key === 'Shift') {
    removeFromArray(PRESSED_BUTTONS, event.code);
    unshift('ShiftRight');
    unshift('ShiftLeft');
    if (event.altKey) changeLanguage(enLanguage);
  } else if (event.code.includes('Key')) {
    if (enLanguage) {
      LETTERS.forEach((letterBtn) => {
        if (letterBtn.innerHTML === event.code[3]) letterBtn.parentNode.classList.remove('row__button_active');
      });
    } else {
      LETTERS.forEach((letterBtn) => {
        if (letterBtn.innerHTML === LETTER_BINDINGS[event.code[3]]) letterBtn.parentNode.classList.remove('row__button_active');
      });
    }
  } else if (event.key === 'CapsLock') {
    CAPS_LOCK_BUTTON.classList.remove('row__button_active');
    capslockLock = false;
  } else if (event.key === 'Backspace') {
    BACKSPACE_BUTTON.classList.remove('row__button_active');
  } else if (event.key === 'Delete') {
    DELETE.parentNode.classList.remove('row__button_active');
  } else if (event.code === 'Space') {
    SPACE_BUTTON.classList.remove('row__button_active');
  } else if (event.code === 'ControlLeft') {
    CTRL_BUTTONS[0].classList.remove('row__button_active');
  } else if (event.code === 'ControlRight') {
    CTRL_BUTTONS[1].classList.remove('row__button_active');
  } else if (event.code.includes('Digit')) {
    SHIFTED_SECONDS.forEach((title) => {
      if (title.previousSibling.innerHTML === event.code[5]) title.parentNode.classList.remove('row__button_active');
    });
  } else if (event.code === 'Backquote') {
    SHIFTED_SECONDS[0].parentNode.classList.remove('row__button_active');
  } else if (event.code === 'Minus') {
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '_') title.parentNode.classList.remove('row__button_active');
    });
  } else if (event.code === 'Equal') {
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '+') title.parentNode.classList.remove('row__button_active');
    });
  } else if (event.code === 'BracketLeft') {
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '{' || title.previousSibling.innerHTML === 'Х') title.parentNode.classList.remove('row__button_active');
    });
  } else if (event.code === 'BracketRight') {
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '}' || title.previousSibling.innerHTML === 'Ъ') title.parentNode.classList.remove('row__button_active');
    });
  } else if (event.code === 'Backslash') {
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '|' || title.innerHTML === '/') title.parentNode.classList.remove('row__button_active');
    });
  } else if (event.code === 'Tab') {
    TAB_BUTTON.classList.remove('row__button_active');
  } else if (event.code === 'Enter') {
    ENTER_BUTTON.classList.remove('row__button_active');
  } else if (event.code === 'Semicolon') {
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === ':' || title.previousSibling.innerHTML === 'Ж') title.parentNode.classList.remove('row__button_active');
    });
  } else if (event.code === 'Quote') {
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '"' || title.previousSibling.innerHTML === 'Э') title.parentNode.classList.remove('row__button_active');
    });
  } else if (event.code === 'Comma') {
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '&lt;' || title.previousSibling.innerHTML === 'Б') title.parentNode.classList.remove('row__button_active');
    });
  } else if (event.code === 'Period') {
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '&gt;' || title.previousSibling.innerHTML === 'Ю') title.parentNode.classList.remove('row__button_active');
    });
  } else if (event.code === 'Slash') {
    SHIFTED_SECONDS.forEach((title) => {
      if (title.innerHTML === '?' || title.innerHTML === ',') title.parentNode.classList.remove('row__button_active');
    });
  } else if (event.code === 'AltLeft') {
    if (event.shiftKey) changeLanguage(enLanguage);
    ALTS[0].parentNode.classList.remove('row__button_active');
  } else if (event.code === 'AltRight') {
    if (event.shiftKey) changeLanguage(enLanguage);
    ALTS[1].parentNode.classList.remove('row__button_active');
  } else if (event.code === 'MetaLeft') {
    event.preventDefault();
    WINKEY.parentNode.classList.remove('row__button_active');
  } else if (event.code === 'ArrowDown') {
    ARROW_BUTTONS[2].classList.remove('row__button_type_arrow_active');
  } else if (event.code === 'ArrowUp') {
    ARROW_BUTTONS[0].classList.remove('row__button_type_arrow_active');
  } else if (event.code === 'ArrowLeft') {
    ARROW_BUTTONS[1].classList.remove('row__button_type_arrow_active');
  } else if (event.code === 'ArrowRight') {
    ARROW_BUTTONS[3].classList.remove('row__button_type_arrow_active');
  }
});

// MouseEvents with virtual keyboard
SCREEN.addEventListener('mouseup', () => {
  cursor = SCREEN.selectionStart;
});

SHIFT_BUTTONS.forEach((button) => button.addEventListener('mousedown', shift));

document.addEventListener('mouseup', (event) => {
  if (!event.shiftKey) unshift();
});

LETTERS.forEach((letter) => letter.parentNode.addEventListener('mousedown', () => {
  typeToCursorPlace(letter.innerHTML, shiftTrigger, capsTrigger);
}));

SHIFTED_SECONDS.forEach((title) => title.parentNode.addEventListener('mousedown', () => {
  if (shiftTrigger && enLanguage) {
    switch (title.innerHTML) {
      case '&amp;':
        typeToCursorPlace('&');
        break;
      case '&lt;':
        typeToCursorPlace('<');
        break;
      case '&gt;':
        typeToCursorPlace('>');
        break;
      default:
        typeToCursorPlace(title.innerHTML);
    }
  } else if (!shiftTrigger && enLanguage) {
    typeToCursorPlace(title.previousSibling.innerHTML);
  } else if (shiftTrigger && !enLanguage && !title.previousSibling.innerHTML.match(/[а-я]/i) && title.previousSibling.innerHTML !== 'Ё') {
    typeToCursorPlace(title.innerHTML, shiftTrigger, capsTrigger);
  } else typeToCursorPlace(title.previousSibling.innerHTML, shiftTrigger, capsTrigger);
}));

BACKSPACE_BUTTON.addEventListener('mousedown', () => typeToCursorPlace('backspace'));

DELETE.parentNode.addEventListener('mousedown', () => typeToCursorPlace('delete'));

CAPS_LOCK_BUTTON.addEventListener('mousedown', () => {
  capslockLock = false;
  if (!capsTrigger) CAPS_LOCK_BUTTON.setAttribute('style', 'border-color: #005016;');
  else CAPS_LOCK_BUTTON.removeAttribute('style');
  switchCapsLock();
  capslockLock = false;
});

SPACE_BUTTON.addEventListener('mousedown', () => typeToCursorPlace(' '));

TAB_BUTTON.addEventListener('mousedown', () => typeToCursorPlace('    '));

ENTER_BUTTON.addEventListener('mousedown', () => typeToCursorPlace('\n'));

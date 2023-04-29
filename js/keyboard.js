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

  html.classList.add('page');
  body.classList.add('body');
  main.classList.add('all');
  display.classList.add('all__display');
  display.setAttribute('type', 'text');
  keyboard.classList.add('keyboard', 'all__keyboard');
  rows.forEach((row) => row.classList.add('row', 'keyboard__row'));

  rows.forEach((row) => keyboard.appendChild(row));
  main.appendChild(display);
  main.appendChild(keyboard);
  body.appendChild(main);
}

createKeyboard();

// Getting all buttons by groups in order to manipulate them comfortably
const ALL_BUTTONS = document.querySelectorAll('.row__button');
const SHIFT_BUTTONS = document.querySelectorAll('.row__button_width_thick');
const LETTERS = document.querySelectorAll('.row__title_type_letter');
const PRESSED_BUTTONS = [];
const SCREEN = document.querySelector('textarea');
const BACKSPACE_BUTTON = document.querySelector('.row__button_width_wide');
const CAPS_LOCK_BUTTON = document.querySelector('.row__button_width_medium');
const SPACE_BUTTON = document.querySelector('.row__button_width_largest');

let cursor = 0;
let shiftTrigger = false;
let capsTrigger = false;

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
  capsTrigger = !capsTrigger;
  if (capsTrigger) CAPS_LOCK_BUTTON.classList.add('row__button_active');
  else CAPS_LOCK_BUTTON.classList.remove('row__button_active');
}

function typeToCursorPlace(letter, shif = false, cap = false) {
  let resultLetter;
  let leftText;
  if (letter === 'backspace') {
    if (cursor > 0) {
      leftText = SCREEN.value.slice(0, cursor - 1);
      resultLetter = '';
      const rightText = SCREEN.value.slice(cursor);
      SCREEN.value = leftText + resultLetter + rightText;
      cursor -= 1;
    }
  } else {
    let isBig = false;
    if (shif) isBig = !isBig;
    if (cap) isBig = !isBig;
    resultLetter = (isBig) ? letter.toUpperCase() : letter.toLowerCase();
    leftText = SCREEN.value.slice(0, cursor);
    const rightText = SCREEN.value.slice(cursor);
    SCREEN.value = leftText + resultLetter + rightText;
    cursor += 1;
  }
  SCREEN.selectionStart = cursor;
  SCREEN.selectionEnd = cursor;
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Shift') {
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
    LETTERS.forEach((letterBtn) => {
      if (letterBtn.innerHTML === event.code[3]) letterBtn.parentNode.classList.add('row__button_active');
    });
    typeToCursorPlace(event.code[3], shiftTrigger, capsTrigger);
  } else if (event.key === 'CapsLock') {
    switchCapsLock();
  } else if (event.key === 'Backspace') {
    event.preventDefault();
    typeToCursorPlace('backspace');
    BACKSPACE_BUTTON.classList.add('row__button_active');
  } else if (event.code === 'Space') {
    event.preventDefault();
    typeToCursorPlace(' ');
    SPACE_BUTTON.classList.add('row__button_active');
  }
});

SCREEN.addEventListener('mouseup', () => {
  cursor = SCREEN.selectionStart;
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'Shift') {
    removeFromArray(PRESSED_BUTTONS, event.code);
    unshift('ShiftRight');
    unshift('ShiftLeft');
  } else if (event.code.includes('Key')) {
    LETTERS.forEach((letterBtn) => {
      if (letterBtn.innerHTML === event.code[3]) letterBtn.parentNode.classList.remove('row__button_active');
    });
  } else if (event.key === 'Backspace') {
    BACKSPACE_BUTTON.classList.remove('row__button_active');
  } else if (event.code === 'Space') {
    SPACE_BUTTON.classList.remove('row__button_active');
  }
});

SHIFT_BUTTONS.forEach((button) => button.addEventListener('mousedown', shift));

document.addEventListener('mouseup', (event) => {
  if (!event.shiftKey) unshift();
});

LETTERS.forEach((letter) => letter.parentNode.addEventListener('mousedown', () => {
  typeToCursorPlace(letter.innerHTML, shiftTrigger, capsTrigger);
}));

BACKSPACE_BUTTON.addEventListener('mousedown', () => typeToCursorPlace('backspace'));

CAPS_LOCK_BUTTON.addEventListener('mousedown', switchCapsLock);

SPACE_BUTTON.addEventListener('mousedown', () => typeToCursorPlace(' '));

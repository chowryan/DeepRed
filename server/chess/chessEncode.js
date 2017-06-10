const transcribeBoard = board => board.map((row) => {
  const pieceIndex = {
    null: 0,
    WP: 1,
    WN: 2,
    WB: 3,
    WR: 4,
    WQ: 5,
    WK: 6,
    BP: 'a',
    BN: 'b',
    BB: 'c',
    BR: 'd',
    BQ: 'e',
    BK: 'f',
  };
  const newRow = row.map(col => pieceIndex[col]);
  return newRow.join('');
}).join('');

const encode = {
  WN: '0',
  WB: '1',
  WR: '2',
  WQ: '3',
  WK: '4',
  BN: '5',
  BB: '6',
  BR: '7',
  BQ: '8',
  BK: '9',
  WP1: 'A',
  WP2: 'B',
  WP3: 'C',
  WP4: 'D',
  WP5: 'E',
  WP6: 'F',
  WP7: 'G',
  WP8: 'H',
  BP1: 'I',
  BP2: 'J',
  BP3: 'K',
  BP4: 'L',
  BP5: 'M',
  BP6: 'N',
  BP7: 'O',
  BP8: 'P',
  _1: '_',
  _2: 'R',
  _3: 'S',
  _4: 'T',
  _5: 'U',
  _6: 'V',
  _7: 'W',
  _8: 'X',
  _9: 'Y',
  _10: 'Z',
  _11: 'a',
  _12: 'b',
  _13: 'c',
  _14: 'd',
  _15: 'e',
  _16: 'f',
  _17: 'g',
  _18: 'h',
  _19: 'i',
  _20: 'j',
  _21: 'k',
  _22: 'l',
  _23: 'm',
  _24: 'n',
  _25: 'o',
  _26: 'p',
  _27: 'q',
  _28: 'r',
  _29: 's',
  _30: 't',
  _31: 'u',
  _32: 'v',
  _33: 'w',
  _34: 'x',
  _35: 'y',
  _36: 'z',
  _37: '!',
  _38: '{',
  _39: '#',
  _40: '$',
  _41: '%',
  _42: '&',
  _43: '(',
  _44: ')',
  _45: '*',
  _46: '+',
  _47: ',',
  _48: '-',
  _49: '.',
  _50: '/',
  _51: ':',
  _52: ';',
  _53: '<',
  _54: '=',
  _55: '>',
  _56: '?',
  _57: '@',
  _58: '[',
  _59: '}',
  _60: ']',
  _61: '^',
  _62: 'Q',
};

const decode = {
  0: 'WN',
  1: 'WB',
  2: 'WR',
  3: 'WQ',
  4: 'WK',
  5: 'BN',
  6: 'BB',
  7: 'BR',
  8: 'BQ',
  9: 'BK',
  A: 'WP',
  B: 'WP|WP',
  C: 'WP|WP|WP',
  D: 'WP|WP|WP|WP',
  E: 'WP|WP|WP|WP|WP',
  F: 'WP|WP|WP|WP|WP|WP',
  G: 'WP|WP|WP|WP|WP|WP|WP',
  H: 'WP|WP|WP|WP|WP|WP|WP|WP',
  I: 'BP',
  J: 'BP|BP',
  K: 'BP|BP|BP',
  L: 'BP|BP|BP|BP',
  M: 'BP|BP|BP|BP|BP',
  N: 'BP|BP|BP|BP|BP|BP',
  O: 'BP|BP|BP|BP|BP|BP|BP',
  P: 'BP|BP|BP|BP|BP|BP|BP|BP',
  _: '_',
  R: '_|_',
  S: '_|_|_',
  T: '_|_|_|_',
  U: '_|_|_|_|_',
  V: '_|_|_|_|_|_',
  W: '_|_|_|_|_|_|_',
  X: '_|_|_|_|_|_|_|_',
  Y: '_|_|_|_|_|_|_|_|_',
  Z: '_|_|_|_|_|_|_|_|_|_',
  a: '_|_|_|_|_|_|_|_|_|_|_',
  b: '_|_|_|_|_|_|_|_|_|_|_|_',
  c: '_|_|_|_|_|_|_|_|_|_|_|_|_',
  d: '_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  e: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  f: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  g: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  h: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  i: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  j: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  k: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  l: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  m: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  n: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  o: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  p: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  q: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  r: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  s: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  t: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  u: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  v: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  w: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  x: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  y: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  z: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '!': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '{': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '#': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  $: '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '%': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '&': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '(': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  ')': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '*': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '+': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  ',': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '-': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '.': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '/': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  ':': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  ';': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '<': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '=': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '>': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '?': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '@': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '[': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '}': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  ']': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  '^': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
  'Q': '_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|_',
};

const encodeBoard = (board) => {
  const boardArray = [].concat(...board);
  let storage = '';
  let count = 1;
  const result = [];
  boardArray.forEach((input) => {
    const piece = (input === null) ? '_' : input;
    if (piece === storage) {
      count += 1;
    } else if (piece !== '_' && piece[1] !== 'P') {
      result.push(encode[storage + count]);
      result.push(encode[piece]);
      count = 1;
    } else if (piece === '_' || piece[1] === 'P') {
      result.push(encode[storage + count]);
      count = 1;
    } else {
      result.push(encode[piece]);
      count = 1;
    }
    storage = (piece === '_' || piece[1] === 'P') ? piece : '';
  });

  return result.join('');
};

const decodeBoard = (code) => {
  let string = '';
  for (let i = 0; i < code.length; i += 1) {
    string += `${(i === 0) ? '' : '|'}${decode[code[i]]}`;
  }

  const array = string.split('|');
  // console.log(string);
  // console.log(array.length, array);
  const board = [];
  let row = [];

  for (let i = 0; i < 8; i += 1) {
    board.push(array.splice(0, 8).map(x => (x === '_') ? null : x));
  }

  return board;
};


/**
 * Returns string of encoded board and state
 * @param {array} board = 8 x 8 array of arrays
 * @param {object} pieceState = {
 *                           hasMovedWK:    boolean,
 *                           hasMovedWKR:   boolean,
 *                           hasMovedWQR:   boolean,
 *                           hasMovedBK:    boolean,
 *                           hasMovedBKR:   boolean,
 *                           hasMovedBQR:   boolean,
 *                           canEnPassantW: string, 'rc' r = row | c = col
 *                           canEnPassantB: string,
 *                         }
 * @return {string} result = [encoded board]|abcde
 *                               a: WK has moved - 0 : 1
 *                               b: WKR has moved - 0 : 1
 *                               c: WQR has moved - 0 : 1
 *                               d: BK has moved - 0 : 1
 *                               e: BKR has moved - 0 : 1
 *                               f: BQR has moved - 0 : 1
 *                               g: Can enpassant - character code representing
 *                                                  position of pawn that can be captured
 */

const encodeWithState = (board, pieceState) => {
  let result = `${encodeBoard(board)}|`;
  result += +pieceState.hasMovedWK;
  result += +pieceState.hasMovedWKR;
  result += +pieceState.hasMovedWQR;
  result += +pieceState.hasMovedBK;
  result += +pieceState.hasMovedBKR;
  result += +pieceState.hasMovedBQR;
  const epW = pieceState.canEnPassantW;
  const epB = pieceState.canEnPassantB;

  if (epW !== '') result += +epW - 31;
  if (epB !== '') result += String.fromCharCode(+epB + 56);

  return result;
};


const decodeWithState = (codeWithState) => {
  const array = codeWithState.split('|');
  const board = decodeBoard(array[0]);
  const stateString = array[1];

  const state = {
    hasMovedWK: +stateString[0] === 1,
    hasMovedWKR: +stateString[1] === 1,
    hasMovedWQR: +stateString[2] === 1,
    hasMovedBK: +stateString[3] === 1,
    hasMovedBKR: +stateString[4] === 1,
    hasMovedBQR: +stateString[5] === 1,
    canEnPassantW: '',
    canEnPassantB: '',
  };

  if (stateString.length > 6) {
    if (isNaN(stateString[6])) {
      state.canEnPassantB = (stateString[6].charCodeAt() - 56).toString();
    } else {
      state.canEnPassantW = (+stateString[6] + 31).toString();
    }
  }

  return [board, state];
};

/**
 * TESTING
 */

let board = [
  ['BR', 'BN', 'BB', 'BK', 'BQ', 'BB', 'BN', 'BR'],
  ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
  ['WR', 'WN', 'WB', 'WK', 'WQ', 'WB', 'WN', 'WR'],
];

let pieceState = {
  hasMovedWK: false,
  hasMovedWKR: false,
  hasMovedWQR: false,
  hasMovedBK: false,
  hasMovedBKR: false,
  hasMovedBQR: false,
  canEnPassantW: '',
  canEnPassantB: '',
};

console.log(JSON.stringify(board) ===
  JSON.stringify(decodeWithState(encodeWithState(board, pieceState))[0]));
console.log(JSON.stringify(pieceState) ===
  JSON.stringify(decodeWithState(encodeWithState(board, pieceState))[1]));

board = [
  ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', null],
  ['BP', null, 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, 'BR'],
  ['WP', 'BP', null, null, null, null, null, null],
  ['WR', null, null, 'WP', null, null, null, null],
  [null, 'WP', 'WP', 'WK', 'WP', 'WP', 'WP', 'WP'],
  [null, 'WN', 'WB', 'WQ', null, 'WB', 'WN', 'WR'],
];

pieceState = {
  hasMovedWK: false,
  hasMovedWKR: false,
  hasMovedWQR: true,
  hasMovedBK: false,
  hasMovedBKR: true,
  hasMovedBQR: false,
  canEnPassantW: '',
  canEnPassantB: '40',
};

console.log(JSON.stringify(board) ===
  JSON.stringify(decodeWithState(encodeWithState(board, pieceState))[0]));
console.log(JSON.stringify(pieceState) ===
  JSON.stringify(decodeWithState(encodeWithState(board, pieceState))[1]));


module.exports = {
  transcribeBoard,
  encodeBoard,
};

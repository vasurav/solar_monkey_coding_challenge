//  SETUP! DO NOT TOUCH!
//const Mocha = require('mocha')
//const chai = require('chai')
//const { expect } = chai
//const mocha = new Mocha()
//mocha.suite.emit('pre-require', this, 'solution', mocha)
//  END OF SETUP


//  =============================================================================
//  PUZZLE 1
//  Write the implementation of the diamond function. The single parameter passed
//  in is the width of the diamond. Even numbers don't generate beautiful
//  diamonds, nor do negative ones, so return an empty string in those cases. See
//  the tests for the expected output. Mind the (trailing) spaces!
//  Feel free to add more tests, or clean up your solution afterwards.


function diamond(n) {
  // check for invalid input
  if (n <= 0 || n % 2 == 0) {
    return '';
  }

  // start with the baseline
  let diamondString = charString(n, '*');

  // add smaller asterisks lines to the top and bottom of the diamond
  for (let i = n - 2; i > 0; i-= 2) {
    let newLine = diamondLine(i, n);
    diamondString = addDiamondLines(diamondString, newLine);
  }

  // add leading and trailing line breaks
  return '\n' + diamondString + '\n';
}

function diamondLine(currentLine, diamondWidth) {
  const numSpaces = calcSpaces(currentLine, diamondWidth);

  let spaceLine = charString(numSpaces, ' ');
  let starLine = charString(currentLine, '*');

  return spaceLine + starLine + spaceLine;
}

// calculate the number of spaces needed based on total size and current row size
const calcSpaces = (currentLine, diamondWidth) => (diamondWidth - currentLine) / 2;

// add a diamond line to the bigger string
const addDiamondLines = (diamondString, newLine) => newLine + '\n' + diamondString + '\n' + newLine;

function charString(numChars, charToAdd) {
  // outputs a number (numChars) of characters (charToAdd)
  let charString = '';

  for (let i = 0; i < numChars; i++) {
    charString += charToAdd;
  }

  return charString
}


console.log('diamond(0): ' + diamond(0));
console.log('diamond(4): ' + diamond(4));
console.log('diamond(3): ' + diamond(3));
console.log('diamond(5): ' + diamond(5));
console.log('diamond(-5): ' + diamond(-5));
console.log('\n');



 // TESTS PUZZLE 1
//describe('Diamond', function() {
//    it('should return a simple diamond', () => {
//        expect(diamond(3)).to.equal(`
// *
//***
// *
//`
//        )
//    })
//
//    it('should return empty string for even number', () => {
//        expect(diamond(4)).to.equal('')
//    })
//
//    it('should return a bigger diamond', () => {
//        expect(diamond(5)).to.equal(`
//  *
// ***
//*****
// ***
//  *
//`
//        )
//    })
//})

// //  ===========================================================================
// // PUZZLE 2
// // Write a sudoku validator:
// // 1. The `solution_valid(board)` function should return True when the
// //    solution is True, False otherwise. The cells of the sudoku board may
// //    also contain 0's, which represent empty cells. Boards with empty cells
// //    are invalid of course. For the standard rules see
// //    https://en.wikipedia.org/wiki/Sudoku
// // 2. Divide the problem into subproblems, write separate functions for
// //    these.
// // 3. Make sure to write some tests for these functions.

function validateSudoku(board) {
  if (!checkForNoZeros(board)) {
    return false;
  }

  if (!checkHorizontals(board)) {
    return false;
  }

  if (!checkVerticals(board)) {
    return false;
  }

  if (!checkBoxes(board)) {
    return false;
  }

  return true;
}

function checkForNoZeros(board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i].includes(0)) {
      return false;
    }
  }
  return true;
}

function checkForDuplicates(arr) {
  return arr.length !== new Set(arr).size;
}

function checkHorizontals(board) {
  for (let i = 0; i < board.length; i++) {
    if (checkForDuplicates(board[i])) {
      return false;
    }
  }

  return true;
}

function getVerticalArray(board, i) {
  let verticalArray = [];
  for (let j = 0; j < board.length; j++) {
    verticalArray.push(board[j][i]);
  }

  return verticalArray;
}


function checkVerticals(board) {
  for (let i = 0;  i < board[0].length; i++) {
    let verticalArray = getVerticalArray(board, i);
    if (checkForDuplicates(verticalArray)) {
      return false;
    }
  }

  return true;
}

function getBox(board, boxCoordinateStart, boxWidth, boxHeight) {
  let boxArray = [];
  for (let i = boxCoordinateStart[0]; i < boxCoordinateStart[0] + boxWidth; i++) {
    for (let j = boxCoordinateStart[1]; j < boxCoordinateStart[1] + boxWidth; j++) {
      boxArray.push(board[i][j]);
    }
  }

  return boxArray;
}

function checkBoxes(board) {
  const boxDimSquare = 3; // in this case all dimensions are equal, but can change the function if you want

  const boxesHorizontal = boxDimSquare; // how many boxes there are in the horizontal direction
  const boxesVertical = boxDimSquare;   // how many boxes there are in the vertical direction
  const boxWidth = boxDimSquare;        // box dimension in the horizontal
  const boxHeight = boxDimSquare;       // box dimension in the vertical

  for (let i = 0; i < boxesHorizontal; i++) {
    for (let j = 0; j < boxesVertical; j++) {
      let boxCoordinateStart = [i*boxWidth, j*boxHeight];
      let boxArray = getBox(board, boxCoordinateStart, boxWidth, boxHeight);
      if (checkForDuplicates(boxArray)) {
        return false;
      }
    }
  }

  return true;
}


const board_correct = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9],
        ]

const board_zeros = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 0, 3, 4, 9],
            [1, 0, 0, 3, 4, 2, 5, 6, 0],
            [8, 5, 9, 7, 6, 1, 0, 2, 0],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 0, 1, 5, 3, 7, 2, 1, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 0, 0, 4, 8, 1, 1, 7, 9],
        ]

const board_bad_columns = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 5, 8, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9],
        ]

const board_bad_rows = [
            [5, 3, 4, 8, 7, 6, 9, 2, 2],
            [8, 7, 2, 1, 9, 5, 3, 4, 6],
            [1, 9, 6, 3, 4, 2, 5, 8, 7],
            [6, 4, 9, 7, 8, 1, 5, 1, 3],
            [4, 2, 8, 6, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 6, 5, 8],
            [9, 8, 1, 5, 3, 7, 2, 6, 4],
            [2, 6, 7, 4, 1, 9, 8, 3, 5],
            [3, 4, 5, 2, 6, 8, 1, 7, 9],
        ]

const board_bad_boxes = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [2, 3, 4, 5, 6, 7, 8, 9, 1],
            [3, 4, 5, 6, 7, 8, 9, 1, 2],
            [4, 5, 6, 7, 8, 9, 1, 2, 3],
            [5, 6, 7, 8, 9, 1, 2, 3, 4],
            [6, 7, 8, 9, 1, 2, 3, 4, 5],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [8, 9, 1, 2, 3, 4, 5, 6, 7],
            [9, 1, 2, 3, 4, 5, 6, 7, 8],
        ]

console.log('Puzzle 2 Checks:')

console.log('Zero check Good Board: ' + String(checkForNoZeros(board_correct)))
console.log('Zero check Zeros: ' + String(checkForNoZeros(board_zeros)))

console.log('Row check Good Board: ' + String(checkHorizontals(board_correct)))
console.log('Row check Bad Row: ' + String(checkHorizontals(board_bad_rows)))

console.log('Column check Good Board: ' + String(checkVerticals(board_correct)))
console.log('Column check Bad Column: ' + String(checkVerticals(board_bad_columns)))

console.log('Block check Good Board: ' + String(checkBoxes(board_correct)))
console.log('Block check Bad Block: ' + String(checkBoxes(board_bad_boxes)))

console.log('\n')

console.log('Validate Sudoku: Correct: ' + String(validateSudoku(board_correct)))
console.log('Validate Sudoku: Zeros: ' + String(validateSudoku(board_zeros)))
console.log('Validate Sudoku: Bad Row: ' + String(validateSudoku(board_bad_rows)))
console.log('Validate Sudoku: Bad Column: ' + String(validateSudoku(board_bad_columns)))
console.log('Validate Sudoku: Bad Block: ' + String(validateSudoku(board_bad_boxes)))

//  TESTS PUZZLE 2
//describe('Sudoku', () => {
//    it('should return true for a valid solution', () => {
//        const board = [
//            [5, 3, 4, 6, 7, 8, 9, 1, 2],
//            [6, 7, 2, 1, 9, 5, 3, 4, 8],
//            [1, 9, 8, 3, 4, 2, 5, 6, 7],
//            [8, 5, 9, 7, 6, 1, 4, 2, 3],
//            [4, 2, 6, 8, 5, 3, 7, 9, 1],
//            [7, 1, 3, 9, 2, 4, 8, 5, 6],
//            [9, 6, 1, 5, 3, 7, 2, 8, 4],
//            [2, 8, 7, 4, 1, 9, 6, 3, 5],
//            [3, 4, 5, 2, 8, 6, 1, 7, 9],
//        ]
//        expect(validateSudoku(board)).to.equal(true)
//    })
//
//    it('should return false when there are empty fields', () => {
//        const board = [
//            [5, 3, 4, 6, 7, 8, 9, 1, 2],
//            [6, 7, 2, 1, 9, 0, 3, 4, 9],
//            [1, 0, 0, 3, 4, 2, 5, 6, 0],
//            [8, 5, 9, 7, 6, 1, 0, 2, 0],
//            [4, 2, 6, 8, 5, 3, 7, 9, 1],
//            [7, 1, 3, 9, 2, 4, 8, 5, 6],
//            [9, 0, 1, 5, 3, 7, 2, 1, 4],
//            [2, 8, 7, 4, 1, 9, 6, 3, 5],
//            [3, 0, 0, 4, 8, 1, 1, 7, 9],
//        ]
//        expect(validateSudoku(board)).to.equal(false)
//    })
//
//    it('should return false when a column is invalid', () => {
//        const board = [
//            [5, 3, 4, 6, 7, 8, 9, 1, 2],
//            [6, 7, 2, 1, 9, 5, 3, 4, 8],
//            [1, 9, 8, 3, 4, 2, 5, 6, 7],
//            [8, 5, 9, 7, 6, 1, 4, 2, 3],
//            [4, 2, 6, 8, 5, 3, 7, 9, 1],
//            [7, 1, 3, 9, 2, 4, 5, 8, 6],
//            [9, 6, 1, 5, 3, 7, 2, 8, 4],
//            [2, 8, 7, 4, 1, 9, 6, 3, 5],
//            [3, 4, 5, 2, 8, 6, 1, 7, 9],
//        ]
//        expect(validateSudoku(board)).to.equal(false)
//    })
//
//    it('should return false when a row is invalid', () => {
//        const board = [
//            [5, 3, 4, 8, 7, 6, 9, 1, 2],
//            [8, 7, 2, 1, 9, 5, 3, 4, 6],
//            [1, 9, 6, 3, 4, 2, 5, 8, 7],
//            [6, 4, 9, 7, 8, 1, 5, 2, 3],
//            [4, 2, 8, 6, 5, 3, 7, 9, 1],
//            [7, 1, 3, 9, 2, 4, 6, 5, 8],
//            [9, 8, 1, 5, 3, 7, 2, 6, 4],
//            [2, 6, 7, 4, 1, 9, 8, 3, 5],
//            [3, 4, 5, 2, 6, 8, 1, 7, 9],
//        ]
//        expect(validateSudoku(board)).to.equal(false)
//    })
//
//    it('should return false when a block is invalid', () => {
//        const board = [
//            [1, 2, 3, 4, 5, 6, 7, 8, 9],
//            [2, 3, 4, 5, 6, 7, 8, 9, 1],
//            [3, 4, 5, 6, 7, 8, 9, 1, 2],
//            [4, 5, 6, 7, 8, 9, 1, 2, 3],
//            [5, 6, 7, 8, 9, 1, 2, 3, 4],
//            [6, 7, 8, 9, 1, 2, 3, 4, 5],
//            [7, 8, 9, 1, 2, 3, 4, 5, 6],
//            [8, 9, 1, 2, 3, 4, 5, 6, 7],
//            [9, 1, 2, 3, 4, 5, 6, 7, 8],
//        ]
//        expect(validateSudoku(board)).to.equal(false)
//    })
//})

//mocha.run()
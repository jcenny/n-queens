/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var boardObject = new Board(({n: n}));
  var board = boardObject.rows();

  for (let i = 0; i < board.length; i++) {
    board[i][i] = 1;
  }


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
let deepCopy = function(arr) {
  if (arr.length === 1) {
    return [].concat(arr);
  }
  let copiedArr = [];
  for (let i = 0; i < arr.length; i++) {
    copiedArr.push([]);
    for (let j = 0; j < arr.length; j++) {
      copiedArr[i].push(arr[i][j]);
    }
  }
  return copiedArr;
};

window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var boardObj = new Board({n: n});

  var inner = function(board, row) {
    for (let i = 0; i < n; i++) {
      boardObj.togglePiece(row, i);
      if (!boardObj.hasColConflictAt(i)) {
        if (row >= n - 1) {
          solutionCount++;
          boardObj.togglePiece(row, i);
          return;
        }
        inner(board, row + 1);
      }
      boardObj.togglePiece(row, i);
    }
  };

  inner(boardObj, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return {n: 0};
  }
  var solution; //fixme
  //debugger;

  var boardObj = new Board({n: n});

  if (n === 2) {
    return {n: 2};
  }

  if (n === 3) {
    return {n: 3};
  }

  var inner = function(board, row) {
    //debugger;
    for (let i = 0; i < n; i++) {
      boardObj.togglePiece(row, i);
      if (!boardObj.hasAnyQueenConflictsOn(row, i)) {
        if (row >= n - 1) {
          solution = deepCopy(boardObj.rows());
          return;
        }
        inner(board, row + 1);
      }
      boardObj.togglePiece(row, i);
    }
  };

  inner(boardObj, 0);
  return solution;

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  //return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var solutionCount = 0; //fixme
  var boardObj = new Board({n: n});

  var inner = function(board, row) {
    for (let i = 0; i < n; i++) {
      boardObj.togglePiece(row, i);
      if (!boardObj.hasAnyQueenConflictsOn(row, i)) {
        if (row >= n - 1) {
          solutionCount++;
          boardObj.togglePiece(row, i);
          return;
        }
        inner(board, row + 1);
      }
      boardObj.togglePiece(row, i);
    }
  };

  inner(boardObj, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

// This calculates the possible values for each empty box
// then goes through and fills in all the squares that only
// have one potential solution.
// It can solve simple boards.
// Could potentially be useful for speeding up bruteforcesolve

// Practice grid
const sudokuData = [
  0,0,3,0,2,0,6,0,0,
  9,0,0,3,0,5,0,0,1,
  0,0,1,8,0,6,4,0,0,
  0,0,8,1,0,2,9,0,0,
  7,0,0,0,0,0,0,0,8,
  0,0,6,7,0,8,2,0,0,
  0,0,2,6,0,9,5,0,0,
  8,0,0,2,0,3,0,0,9,
  0,0,5,0,1,0,3,0,0];

// Most difficult practice grid
const sudokuData2 = [
  3,0,0,2,0,0,0,0,0,
  0,0,0,1,0,7,0,0,0,
  7,0,6,0,3,0,5,0,0,
  0,7,0,0,0,9,0,8,0,
  9,0,0,0,2,0,0,0,4,
  0,1,0,8,0,0,0,5,0,
  0,0,9,0,4,0,3,0,1,
  0,0,0,7,0,2,0,0,0,
  0,0,0,0,0,8,0,0,6];

const cellsInMiniSquares = {
  1: ["1_1", "1_2", "1_3", "2_1", "2_2", "2_3", "3_1", "3_2", "3_3"],
  2: ["1_4", "1_5", "1_6", "2_4", "2_5", "2_6", "3_4", "3_5", "3_6"],
  3: ["1_7", "1_8", "1_9", "2_7", "2_8", "2_9", "3_7", "3_8", "3_9"],
  4: ["4_1", "4_2", "4_3", "5_1", "5_2", "5_3", "6_1", "6_2", "6_3"],
  5: ["4_4", "4_5", "4_6", "5_4", "5_5", "5_6", "6_4", "6_5", "6_6"],
  6: ["4_7", "4_8", "4_9", "5_7", "5_8", "5_9", "6_7", "6_8", "6_9"],
  7: ["7_1", "7_2", "7_3", "8_1", "8_2", "8_3", "9_1", "9_2", "9_3"],
  8: ["7_4", "7_5", "7_6", "8_4", "8_5", "8_6", "9_4", "9_5", "9_6"],
  9: ["7_7", "7_8", "7_9", "8_7", "8_8", "8_9", "9_7", "9_8", "9_9"],
};

function RemainingValues(){
  return {
    row1: [],
    row2: [],
    row3: [],
    row4: [],
    row5: [],
    row6: [],
    row7: [],
    row8: [],
    row9: [],
    col1: [],
    col2: [],
    col3: [],
    col4: [],
    col5: [],
    col6: [],
    col7: [],
    col8: [],
    col9: [],
    sq1: [],
    sq2: [],
    sq3: [],
    sq4: [],
    sq5: [],
    sq6: [],
    sq7: [],
    sq8: [],
    sq9: [],
  };
};

function Cell(row, column, value){
  return {
    row: row,
    column: column,
    square: 0,
    value: value,
    possibleValues: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  };
};

function Board(startingData){
  let board = {};
  for ( let row = 1; row < 10; row++) {
    for (let column = 1; column < 10; column++){
      let id = row + "_" + column;
      board[id] = Cell( row, column, startingData.shift() );
      board[id]['square'] = designateSquare(id);
      if (board[id]['value'] !== 0){
	board[id]['possibleValues'] = [];
      };
    };
  };
  board['remainingValues'] = new RemainingValues;
  return board;
};

function designateSquare(id){
  for (let i = 1; i < 10; i++){
    if(cellsInMiniSquares[i].includes(id)){
      return i;
    }
  };
};

function buildBoard(board){
  let root = document.getElementById('board');
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  };
  let boardDiv = document.createElement('div');
  for(let r = 1; r < 10; r++){
    let rowDiv = document.createElement('div');
    for(let c = 1; c < 10; c++){
      const id = r + "_" + c;
      const cellContent = document.createTextNode(board[id]['value']);
      rowDiv.appendChild(cellContent);
    };
    boardDiv.appendChild(rowDiv);
  };
  root.appendChild(boardDiv);
};

function remainingValsInEachRow(board){
  for(let r = 1; r < 10; r++){
    let listOfUsedVals = [];
    let listOfRemaining = [1,2,3,4,5,6,7,8,9];
    for(let c = 1; c < 10; c++){
      let id = r + "_" + c;
      if(board[id]['value'] !== 0) {
	listOfUsedVals.push(board[id]['value']);
      };
    };
    board['remainingValues']["row" + r] = listOfRemaining.filter(x => !listOfUsedVals.includes(x));
  }
};

function remainingValsInEachCol(board){
  for(let c = 1; c < 10; c++){
    let listOfUsedVals = [];
    let listOfRemaining = [1,2,3,4,5,6,7,8,9];
    for(let r = 1; r < 10; r++){
      let id = r + "_" + c;
      if(board[id]['value'] !== 0) {
	listOfUsedVals.push(board[id]['value']);
      };
    };
    board['remainingValues']["col" + c] = listOfRemaining.filter(x => !listOfUsedVals.includes(x));
  }
};

function remainingValsInEachSq(board, refsForSquares){
  for(let i = 1; i < 10; i++){
    let listOfUsedVals = [];
    let listOfRemaining = [1,2,3,4,5,6,7,8,9];
    refsForSquares[i].forEach(id => {
      listOfUsedVals.push(board[id]['value']);
    });
    board['remainingValues']["sq" + i] = listOfRemaining.filter(x => !listOfUsedVals.includes(x));
  }
};

function calculatePossibleVals(board){
  let rowVars, colVars, sqVars;
  for ( let row = 1; row < 10; row++) {
    for (let column = 1; column < 10; column++){
      let id = row + "_" + column;
      if(board[id]['value'] == 0){
        rowVars = board['remainingValues']["row" + (board[id]['row'])];
        colVars = board['remainingValues']["col" + (board[id]['column'])];
        sqVars = board['remainingValues']["sq" + (board[id]['square'])];
        if(sqVars.length > rowVars.length && sqVars.length > colVars.length){
          board[id]['possibleValues'] = sqVars.filter(x => rowVars.includes(x) && colVars.includes(x));
        }else if (rowVars.length > sqVars.length && rowVars.length > colVars.length){
          board[id]['possibleValues'] = rowVars.filter(x => sqVars.includes(x) && colVars.includes(x));
        }else {
          board[id]['possibleValues'] = colVars.filter(x => rowVars.includes(x) && sqVars.includes(x));
        };
      }
    };
  };
};

function iterateSolve(board){
  for ( let row = 1; row < 10; row++) {
    for (let column = 1; column < 10; column++){
      let id = row + "_" + column;
      // if only one possible value
      if (board[id]['possibleValues'].length == 1){
	console.log("Cell ID: " + id + "\nCell value: " + board[id]['value']);
	// make it the value
	board[id]['value'] = board[id]['possibleValues'].pop();
	console.log(board[id]['value']);
	// update the applicable remaining values for that row
        board['remainingValues']["row" + (board[id]['row'])] = board['remainingValues']["row" + (board[id]['row'])].filter(x => x !== board[id]['value']);
	console.log(board['remainingValues']["row" + (board[id]['row'])]);
	// update the applicable remaining values for that column
        board['remainingValues']["col" + (board[id]['column'])] = board['remainingValues']["col" + (board[id]['column'])].filter(x => x !== board[id]['value']);
	// update the applicable remaining values for that square
        board['remainingValues']["sq" + (board[id]['square'])] = board['remainingValues']["sq" + (board[id]['square'])].filter(x => x !== board[id]['value']);
      };
      calculatePossibleVals(board);
    };
  };
  buildBoard(board);
};

const handleClick = function(board){
  iterateSolve(board);
  buildBoard(board);
};

let board = new Board(sudokuData);

document.getElementById("solver").addEventListener("click", () => {handleClick(board, iterateSolve);}); 

remainingValsInEachRow(board);
remainingValsInEachCol(board);
remainingValsInEachSq(board, cellsInMiniSquares);
calculatePossibleVals(board);
buildBoard(board);

/*
003020600
900305001
001806400
008102900
700000008
006708200
002609500
800203009
005010300
*/

const sudokuData = [0,0,3,0,2,0,6,0,0,9,0,0,3,0,5,0,0,1,0,0,1,8,0,6,4,0,0,0,0,8,1,0,2,9,0,0,7,0,0,0,0,0,0,0,8,0,0,6,7,0,8,2,0,0,0,0,2,6,0,9,5,0,0,8,0,0,2,0,3,0,0,9,0,0,5,0,1,0,3,0,0];

function Cell(row, column, value){
  return {
    id: row + "_" + column,
    row: row,
    column: column,
    value: value,
  };
};

function Board(openingNumbersList){
  let board = {};
  for ( let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++){
      board[row + "_" + column] = Cell( row, column, openingNumbersList.shift() );
    };
  };
  return board;
};

let board = Board(sudokuData);

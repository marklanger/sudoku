const handleClick = function(board, refsForSquares, buildBoard){
  bruteForceSolve(board, refsForSquares, buildBoard);
};

let board = new Board(sudokuData2);

document.getElementById("solver").addEventListener("click", () => {handleClick(board, cellsInMiniSquares, buildBoard);}); 

buildBoard(board);

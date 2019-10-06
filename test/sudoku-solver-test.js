const expect = require('chai').expect;
require('../src/sudoku-solver.js');

describe('Board setup', () => {
  describe('#Board()', () => {
    it('should create a new 9x9 sudoku board', () => {
      let board = new Board(sudokudata);
      expect(board['1_1']).to.exist;
    });
  });
});


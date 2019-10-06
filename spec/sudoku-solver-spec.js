describe("App", function(){

  beforeEach(() => {
    const board = new Board(sudokuData);
  });

  it('creates a board with 82 entries', () => {
    expect(board.length).toEqual(82);
  });

});

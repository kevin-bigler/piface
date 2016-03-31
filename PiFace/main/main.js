pf.main = function() {
  console.log('pf.main()');

  common.log('this is the first log evar!');
  common.log('seriously');

  var testObject = {
    'key1':'123',
    'foos':'ball'
  }
  common.log(testObject);

  var puzzle = new pf.Puzzle();
  puzzle.grid.initWithSize(10, 10);

  var theSquare = puzzle.grid.getSquare(2, 3);

  common.log('theSquare at 2,3:');
  common.log(theSquare);
  common.log(theSquare.toString());

  var testRow = new pf.Row();
  // testRow.squares = [new pf.Square, new pf.Square, new pf.Square];
  testRow.initWithLength(5);

  common.log('testRow.squares:');
  common.log(testRow.squares);

  common.log('testRow:');
  common.log(testRow.toString());

  testRow.exSquare(0);
  testRow.fillSquare(1);
  testRow.getSquare(2).setFilled();
  testRow.exVacantSquares();
  testRow.vacateSquare(4);
  testRow.fillVacantSquares();

  common.log('testRow now:');
  common.log(testRow.toString());

  var rowFromPuzzle = puzzle.grid.getRow(1);

  common.log('rowFromPuzzle:');
  common.log(rowFromPuzzle);

  rowFromPuzzle.exSquare(0);
  rowFromPuzzle.fillSquare(1);
  rowFromPuzzle.getSquare(2).setFilled();
  rowFromPuzzle.exVacantSquares();
  rowFromPuzzle.vacateSquare(4);
  rowFromPuzzle.fillVacantSquares();

  common.log();
}

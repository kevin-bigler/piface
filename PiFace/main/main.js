pf.main = function() {
  common.log('pf.main()');

  var puzzle = new pf.Puzzle();
  puzzle.grid.initWithSize(10, 10);
  //
  // var theSquare = puzzle.grid.getSquare(2, 3);
  //
  // common.log('grid:');
  // common.log(puzzle.grid.toString());
  //
  // common.log('theSquare at 2,3:');
  // // common.log(theSquare);
  // common.log(theSquare.toString());
  //
  // theSquare.setExed();
  // common.log('exed the square at 2,3');
  //
  // common.log('grid now:');
  // common.log(puzzle.grid.toString());
  //
  // common.log('theSquare at 2,3 now:');
  // // common.log(theSquare);
  // common.log(theSquare.toString());

  var testRow = new pf.Row();
  // testRow.squares = [new pf.Square, new pf.Square, new pf.Square];
  testRow.initWithLength(5);

  // common.log('testRow.squares:');
  // common.log(testRow.squares);

  common.log();
  common.log('testRow:');
  common.log(testRow.toString());

  common.log('isSolved? ' + (testRow.isSolved() ? 'yes' : 'no'));
  common.log('isComplete? ' + (testRow.isComplete() ? 'yes' : 'no'));

  testRow.exSquare(0);
  testRow.fillSquare(1);
  testRow.getSquare(2).setFilled();
  testRow.exVacantSquares();
  testRow.vacateSquare(4);
  testRow.fillVacantSquares();

  common.log();
  common.log('testRow now:');
  common.log(testRow.toString());

  common.log('isSolved? ' + (testRow.isSolved() ? 'yes' : 'no'));
  common.log('isComplete? ' + (testRow.isComplete() ? 'yes' : 'no'));

  common.log();
  common.log('testRow runs:');
  common.log(testRow.getRuns());

  var rowFromPuzzle = puzzle.grid.getRow(1);

  common.log();
  common.log('rowFromPuzzle:');
  common.log(rowFromPuzzle.toString());

  rowFromPuzzle.exSquare(0);
  rowFromPuzzle.fillSquare(1);
  rowFromPuzzle.getSquare(2).setFilled();
  rowFromPuzzle.exVacantSquares();
  rowFromPuzzle.vacateSquare(4);
  rowFromPuzzle.fillSquare(7);
  rowFromPuzzle.fillSquare(8);
  rowFromPuzzle.fillSquare(9);
  rowFromPuzzle.fillVacantSquares();

  common.log();
  common.log('rowFromPuzzle now:');
  common.log(rowFromPuzzle.toString());

  common.log();
  common.log('rowFromPuzzle runs:');
  common.log(rowFromPuzzle.getRuns());

  puzzle.grid.getSquare(6, 6).setFilled();
  puzzle.grid.getSquare(7, 7).setFilled();

  common.log();
  common.log('grid now:');
  common.log(puzzle.grid.toString());

  var defTest = new pf.Definition();
  defTest.initWithRuns([1, 3, 1, 2]);

  common.log();
  common.log('defTest:');
  common.log(defTest.toString());
  common.log('totalFilled: ' + defTest.getTotalFilled());
  common.log('minSquares: ' + defTest.getMinSquares());
  common.log('minRun: ' + defTest.getMinRun());
  common.log('maxRun: ' + defTest.getMaxRun());
}

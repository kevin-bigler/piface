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

  puzzle.grid.getSquare(2, 3);
}

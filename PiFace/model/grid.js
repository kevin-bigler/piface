pf.Grid = function() {
  this.width = 0;
  this.height = 0;
  // this.squares = [][];
  this.squares = [];

};

// pf.Grid.prototype.property = value;
// pf.Grid.prototype.func = function() {};

pf.Grid.prototype.getSquare = function(x, y) {
  common.log('getSquare(x,y), x: ' + x + ', y: ' + y);

  if (common.arrayContainsIndex(this.squres, x) && common.arrayContainsIndex(this.squares[x], y)) {
    common.log('we can get x, y');
    this.squares[x][y];
  } else {
    common.log('we cannot get x, y');
  }
};

pf.Grid.prototype.initWithSize = function(width, height) {
  common.log('initWithSize(width, height), width: ' + width + ', height: ' + height);

  common.log('grid squares before:');
  common.log(this.squares);

  this.squares = [];

  // go through each column (~width)
  for (var i = 0; i < width; i++) {
    // go through each row (square) in the column (~height)
    var columnSquares = [];
    for (var j = 0; j < height; j++) {
      // placeholder new Square in each spot
      columnSquares.push(new pf.Square());
    }
    this.squares.push(columnSquares);
  }

  common.log('grid squares now:');
  common.log(this.squares);
};

// pf.Grid.prototype.func = function() {};
// pf.Grid.prototype.func = function() {};

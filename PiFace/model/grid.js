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

  // common.log('grid squares for lookup:');
  // common.log(this.squares);

  if (common.arrayContainsIndex(this.squares, x) && common.arrayContainsIndex(this.squares[x], y)) {
    common.log('we can get x, y');
    return this.squares[x][y];
  } else {
    common.log('we cannot get x, y');
  }

  return null;
};

pf.Grid.prototype.initWithSize = function(width, height) {
  common.log('initWithSize(width, height), width: ' + width + ', height: ' + height);

  this.width = width;
  this.height = height;

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

pf.Grid.prototype.getRow = function(j) {
  if ( ! common.isArray(this.squares) )
    return null;

  var rowSquares = [];

  // go through each column (~width)
  for (var i = 0; i < this.squares.length; i++) {
    // go through the row (square) in the column (~height = i)
    // var columnSquares = [];
    // for (var j = 0; j < height; j++) {
    //   // placeholder new Square in each spot
    //   columnSquares.push(new pf.Square());
    // }
    if ( common.isArray(this.squares[i]) && common.arrayContainsIndex(this.squares[i], j) && this.squares[i][j] instanceof pf.Square)
      rowSquares.push(this.squares[i][j]);
  }

  common.log('rowSquares in getRow():');
  common.log(rowSquares);

  var row = new pf.Row();
  row.initWithSquares(rowSquares);

  return row;
};

pf.Grid.prototype.getColumn = function(i) {
  if ( ! common.isArray(this.squares) )
    return null;

  var rowSquares = [];

  // go through each column (~width)
  // for (var i = 0; i < this.squares.length; i++) {
    // go through the row (square) in the column (~height = i)
    // var columnSquares = [];
    // for (var j = 0; j < height; j++) {
    //   // placeholder new Square in each spot
    //   columnSquares.push(new pf.Square());
    // }
  if ( common.isArray(this.squares) && common.arrayContainsIndex(this.squares, i) ) // && this.squares[i][j] instanceof pf.Square)
    rowSquares = this.squares[i];
  // }

  common.log('rowSquares in getColumn():');
  common.log(rowSquares);

  var row = new pf.Row();
  row.initWithSquares(rowSquares);

  return row;
};

pf.Grid.prototype.toString = function() {
  // TODO this method could use more checks, or at the very least a try-catch
  if ( ! common.isArray(this.squares) )
    return '?grid?';

  var rows = [];

  // go through each row (~height)
  for (var y = 0; y < this.height; y++) {
    var rowSquares = [];
    // go through the column (square) per row (~width)
    for (var x = 0; x < this.width; x++) {
      rowSquares.push(this.squares[x][y]);
    }

    var row = new pf.Row();
    row.initWithSquares(rowSquares);

    rows.push(row.toString());
  }

  var linebreak = '<br>\n';
  var bookendTop = linebreak + '/' + new Array(this.width * 2).join('-') + '\\' + linebreak;
  var bookendBottom = linebreak + '\\' + new Array(this.width * 2).join('-') + '/' + linebreak;

  var str = bookendTop + rows.join(linebreak) + bookendBottom;

  return str;
}

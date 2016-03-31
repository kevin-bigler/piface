pf.Row = function() {
  // this.foos = ball;
  this.length = 0;
  this.squares = [];
  this.definition = new pf.Definition();
};

// pf.Row.prototype.property = value;
// pf.Row.prototype.func = function() {};

pf.Row.prototype.initWithLength = function(length) {
  if ( ! common.isNumber(parseInt(length)) )
    this.squares = [];

  this.squares = [];
  for (var i = 0; i < length; i++) {
    // placeholder new Square in each spot
    this.squares.push(new pf.Square());
  }
};

pf.Row.prototype.initWithSquares = function(squares) {
  if ( ! common.isArray(squares) )
    this.squares = [];

  this.squares = squares;
};

// Note: empty array still returns true (intentionally).
// pf.Row.prototype.isSquaresSet = function() {
//   return this.squares !== undefined && this.squares !== null && common.isArray(this.squares);
// };

pf.Row.prototype.getSquare = function(i) {
  if (  ! common.isArray(this.squares)
        || ! common.arrayContainsIndex(this.squares, i)
        || ! this.squares[i]
        || ! this.squares[i] instanceof pf.Square) {
    return null;
  }

  return this.squares[i];
};

pf.Row.prototype.vacateSquare = function(i) {
  var square = this.getSquare(i);
  if (square)
    square.setVacant();
};

pf.Row.prototype.fillSquare = function(i) {
  var square = this.getSquare(i);
  if (square)
    square.setFilled();
};

pf.Row.prototype.exSquare = function(i) {
  var square = this.getSquare(i);
  if (square)
    square.setExed();
};

pf.Row.prototype.vacateAllSquares = function() {
  var length = common.isArray(this.squares) ? this.squares.length : 0;
  for (var i = 0; i < length; i++)
    this.vacateSquare(i);
};

pf.Row.prototype.fillAllSquares = function() {
  var length = common.isArray(this.squares) ? this.squares.length : 0;
  for (var i = 0; i < length; i++)
    this.fillSquare(i);
};

pf.Row.prototype.exAllSquares = function() {
  var length = common.isArray(this.squares) ? this.squares.length : 0;
  for (var i = 0; i < length; i++)
    this.exSquare(i);
};

pf.Row.prototype.fillVacantSquares = function() {
  var length = common.isArray(this.squares) ? this.squares.length : 0;
  for (var i = 0; i < length; i++) {
    var square = this.getSquare(i);
    if (square && square.isVacant())
      square.setFilled();
  }
};

pf.Row.prototype.exVacantSquares = function() {
  var length = common.isArray(this.squares) ? this.squares.length : 0;
  for (var i = 0; i < length; i++) {
    var square = this.getSquare(i);
    if (square && square.isVacant())
      square.setExed();
  }
};

pf.Row.prototype.isComplete = function() {
  if ( ! common.isArray(this.squares) )
    return false;

  var isComplete = true;
  $.each(this.squares, function(i, e) {
    if ( ! e || ! e instanceof pf.Square || e.isVacant()) {
      isComplete = false;
      return false; // break
    } else {
      // we're good on this square...
    }
  });

  return isComplete;
};

pf.Row.prototype.isSolved = function() {
  if ( ! common.isArray(this.squares) )
    return false;

  // TODO this depends on a definition
  return false;
};

pf.Row.prototype.toString = function() {
  if ( ! common.isArray(this.squares) )
    return '?row?';

  var squareStrings = [];
  $.each(this.squares, function(i, e) {
    if (e && e instanceof pf.Square)
      squareStrings.push(e.toString());
    else
      squareStrings.push('?sq?');
  });

  // common.log('squareStrings:');
  // common.log(squareStrings);

  var str = '[' + squareStrings.join(',') + ']';

  return str;
};

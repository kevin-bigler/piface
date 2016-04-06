pf.Square = function() {
  // this.foos = 'ball';
  this.state = pf.SquareState.VACANT;
  // this.position = {'x':x, 'y':y};
};

// pf.Square.prototype.property = value;
// pf.Square.prototype.func = function() {};

// all of these functions have to do with the Square's state
pf.Square.prototype.isVacant = function() { return this.state === pf.SquareState.VACANT; };
pf.Square.prototype.isOccupied = function() { return this.state === pf.SquareState.FILLED || this.state === pf.SquareState.EXED; };
pf.Square.prototype.isFilled = function() { return this.state === pf.SquareState.FILLED; };
pf.Square.prototype.isExed = function() { return this.state === pf.SquareState.EXED; };
pf.Square.prototype.isAvailable = function() { return this.state === pf.SquareState.VACANT || this.state === pf.SquareState.FILLED; };
pf.Square.prototype.isUnavailable = function() { return this.state === pf.SquareState.EXED; };  // could do something about OOB index here, if we add that property etc

pf.Square.prototype.setVacant = function() { this.state = pf.SquareState.VACANT; };
pf.Square.prototype.setFilled = function() { this.state = pf.SquareState.FILLED; };
pf.Square.prototype.setExed = function() { this.state = pf.SquareState.EXED; };

pf.Square.prototype.copy = function() {
  var copy = new pf.Square();
  copy.state = this.state;

  return copy;
};

pf.Square.prototype.toString = function() {
  var stringMap = {};
  stringMap[pf.SquareState.VACANT] = 'o';
  stringMap[pf.SquareState.FILLED] = 'f';
  stringMap[pf.SquareState.EXED] = 'x';

  return stringMap[this.state];
};

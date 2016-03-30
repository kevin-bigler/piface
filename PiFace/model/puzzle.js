pf.Puzzle = function() {
  this.grid = new pf.Grid();
  this.rowDefinitions = [];
  this.colDefinitions = [];
};

// pf.Puzzle.prototype.property = value;
// pf.Puzzle.prototype.func = function() {};

pf.Puzzle.prototype.getWidth = function() {
  return this.grid !== null && this.grid instanceof pf.Grid ? this.grid.width : 0;
};

pf.Puzzle.prototype.getHeight = function() {
  return this.grid !== null && this.grid instanceof pf.Grid ? this.grid.width : 0;
};

pf.Puzzle.prototype.isSolved = function() {
  // TODO
  return false;
};

pf.Puzzle.prototype.isComplete = function() {
  // TODO
  return false;
};

pf.Puzzle.prototype.toString = function() {
  // TODO
  return 'Puzzle.toString() [TODO]';
};

// TODO later
// pf.Puzzle.prototype.copy = function() {};
// pf.Puzzle.prototype.serialize = function() {};
// pf.Puzzle.prototype.deserialize = function() {};

pf.Definition = function() {
  // this.foos = ball;
  this.runs = []; // array of integers
};

// pf.Definition.prototype.property = value;
// pf.Definition.prototype.func = function() {};

pf.Definition.prototype.initWithRuns = function(runs) {
  if ( ! common.isArray(runs) ) {
    this.runs = [];
    return;
  }

  this.runs = runs;
};

pf.Definition.prototype.getRun = function(i) {
  if ( ! common.isArray(this.runs) || ! common.arrayContainsIndex(this.runs, i) )
    return 0;

  return this.runs[i];
};

pf.Definition.prototype.getTotalFilled = function() {
  if ( ! common.isArray(this.runs) )
    return 0;

  var totalFilled = 0;

  $.each(this.runs, function(i, e) {
    if ( common.isNumber(parseInt(e)) )
      totalFilled += parseInt(e);
  });

  return totalFilled;
};

pf.Definition.prototype.getMinSquares = function() {
  if ( ! common.isArray(this.runs) || this.runs.length <= 0)
    return 0;

  return this.getTotalFilled() + this.runs.length - 1;
};

pf.Definition.prototype.getMinRun = function() {
  // sort this.runs ascending, then return first element in sorted array
  if ( ! common.isArray(this.runs) && this.runs.length > 0)
    return 0;

  var sortedRuns = common.copyArray(this.runs);
  sortedRuns = common.sortArrayOfNumbers(sortedRuns);

  return sortedRuns.shift();
};

pf.Definition.prototype.getMaxRun = function() {
  // sort this.runs ascending, then return last element in sorted array
  if ( ! common.isArray(this.runs) && this.runs.length > 0)
    return 0;

  var sortedRuns = common.copyArray(this.runs);
  sortedRuns = common.sortArrayOfNumbers(sortedRuns);

  return sortedRuns.pop();
};

pf.Definition.prototype.toString = function() {
  if ( ! common.isArray(this.runs) )
    return 0;

  return this.runs.join(', ');
};

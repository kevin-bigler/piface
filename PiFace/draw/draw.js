pf.Draw = function() {
  // this.foos = ball;

  this.squareWidth = 50;
  this.squareHeight = 50;

  this.startX = 25;
  this.startY = 25;

  this.canvas = d3.select('body').append('svg').attr('width', 500).attr('height', 500);
  this.squareRects = this.canvas.selectAll('rect');   // TODO probably select <g> elements (groups), and either way with a more defined selector (e.g. 'rect.pf-square') or something
};

// pf.Draw.prototype.property = value;
// pf.Draw.prototype.func = function() {};

// I guess this is just an alias for drawSquares()
// pf.Draw.prototype.update(squares, rowLength) = function() {
//
// };

// pf.Draw.prototype.drawSquare = function(square, x, y) {
//   if ( ! square || ! square instanceof pf.Square || ! common.isNumber(parseInt(x)) || ! common.isNumber(parseInt(y)) )
//     return;
//
//   common.log('drawSquare()');
//
//   x = parseInt(x);
//   y = parseInt(y);
//
//   common.log('square:');
//   common.log(square);
//   common.log('x: ' + x);
//   common.log('y: ' + y);
//
//
// };

pf.Draw.prototype.drawSquares = function(squares, rowLength) {
  if ( ! common.isArray(squares) && squares.length > 0 )
    return;

  common.log('drawSquares()');

  // default the row length, if not given, to the entire length of the squares (which would be a single row)
  rowLength = rowLength || squares.length;

  common.log('squares:');
  common.log(squares);

  common.log('rowLength:' + rowLength);

  // re-map DOM to data (selection)
  this.squareRects = this.canvas.selectAll('rect').data(squares);  // TODO selection change mentionied in constructor

  // enter selection
  this.squareRects.enter().append('rect');                    // TODO selection change mentionied in constructor

  var self = this;
  // update selection
  this.squareRects
          .attr('x', function(d, i) { return self.startX + (i * (self.squareWidth + 5)); })
          .attr('y', this.startY)
          .attr('width', this.squareWidth)
          .attr('height', this.squareHeight)
          .style('stroke-width', 3)
          .style('stroke', 'black')
          .attr('fill', function(d, i) {
            // return i % 2 ? 'orange' : 'blue';
            var colorMap = {};
            colorMap[pf.SquareState.VACANT] = 'gray';
            colorMap[pf.SquareState.FILLED] = 'blue';
            colorMap[pf.SquareState.EXED] = 'red';

            return colorMap[d.state];
          })
          .on('click', function(d, i) {
              common.log('on square click');

              common.log('d');
              common.log(d);

              common.log('i');
              common.log(i);

              common.log('d3.select(this)');
              common.log(d3.select(this));

              common.log('d3.event');
              common.log(d3.event);


              var nextStateMap = {};
              nextStateMap[pf.SquareState.VACANT] = pf.SquareState.FILLED;
              nextStateMap[pf.SquareState.FILLED] = pf.SquareState.EXED;
              nextStateMap[pf.SquareState.EXED] = pf.SquareState.VACANT;

              d.state = nextStateMap[d.state];

              self.drawSquares(squares);
          });

  // exit selection
  this.squareRects.exit().remove();
};

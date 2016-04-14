pf.Draw = function() {
  // this.foos = ball;

  this.squareWidth = 50;
  this.squareHeight = 50;

  this.startX = 25;
  this.startY = 25;

  // this.canvas = d3.select('body').append('svg').attr('width', 2000).attr('height', 1500);
  this.canvas = this.initCanvas();
  this.squareRects = this.canvas.selectAll('rect');   // TODO probably select <g> elements (groups), and either way with a more defined selector (e.g. 'rect.pf-square') or something

  // this.vcrControls = this.canvas.append('g').attr('id', 'vcr-controls').attr('width', 50).attr('height', 50).attr('transform', 'translate(15, 15)').style('fill', 'gray').append('rect').attr('width', 35).attr('height', 35);
  // this.vcrControls.style('fill', 'red');
};

// pf.Draw.prototype.property = value;
// pf.Draw.prototype.func = function() {};

pf.Draw.prototype.initCanvas = function() {
  var canvas = d3.select('body')
    .selectAll('svg#main-canvas')
    .data([0]);

  canvas.enter()
    .append('svg')
    .attr('id', 'main-canvas');

  canvas.exit().remove();

  canvas.attr('width', 2000)
    .attr('height', 1500);

  return canvas;
};

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
          .attr('x', function(d, i) {
            var x = common.conversions.iToX(i, rowLength);
            return self.startX + (x * (self.squareWidth + 5));
          })
          .attr('y', function(d, i) {
            var y = common.conversions.iToY(i, rowLength);
            return self.startY + (y * (self.squareHeight + 5));
          })
          .attr('width', this.squareWidth)
          .attr('height', this.squareHeight)
          .style('stroke-width', 3)
          .style('stroke', 'black')
          .attr('fill', function(d, i) {
            var colorMap = {};
            colorMap[pf.SquareState.VACANT] = 'white';
            colorMap[pf.SquareState.FILLED] = 'blue';
            colorMap[pf.SquareState.EXED] = 'red';

            return colorMap[d.state];
          })
          .on('mouseover', function(d, i) {
            d3.select(this).transition()
              .ease('cubic-out')
              // .ease('linear')
              .duration('200')
              // .style("fill-opacity", 1)
              // .style("fill", "red");
              .style('stroke', 'gray');
          })
          .on('mouseout', function(d, i) {
            d3.select(this).transition()
              .ease('cubic-in')
              // .ease('linear')
              .duration('200')
              // .style("fill-opacity", 1)
              // .style("fill", "black");
              .style('stroke', 'black');
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

              self.drawSquares(squares, rowLength);
          });

  // exit selection
  this.squareRects.exit().remove();
};

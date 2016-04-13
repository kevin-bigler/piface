pf.DrawTests = function() {
  this.testData = ['red', 'blue', 'green'];

  this.buttonsStartX = 300;
  this.buttonsStartY = 100;
  this.buttonWidth = 50;
  this.buttonHeight = 25;
  this.buttonMarginX = 5;

  this.canvas = this.initCanvas();
  this.buttons = this.initButtons();
  this.squares = this.initSquares();
};

var rerun = function() { var dt = new pf.DrawTests(); dt.idAndClassElements(); };

pf.DrawTests.prototype.initCanvas = function() {
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

pf.DrawTests.prototype.initSquares = function() {
  // TODO I think - Sazed
};

pf.DrawTests.prototype.initButtons = function() {
  var buttonsData = [
    {
      title: 'Unsolve',
      isEnabled: function() {
        return true; // TODO
      },
      onclick: function() {

      }
    },
    {
      title: '<<',
      isEnabled: function() {
        return true; // TODO
      },
      onclick: function() {

      }
    },
    {
      title: '<',
      isEnabled: function() {
        return true; // TODO
      },
      onclick: function() {

      }
    },
    {
      title: '>',
      isEnabled: function() {
        return true; // TODO
      },
      onclick: function() {

      }
    },
    {
      title: '>>',
      isEnabled: function() {
        return true; // TODO
      },
      onclick: function() {

      }
    },
    {
      title: 'Solve',
      isEnabled: function() {
        return true; // TODO
      },
      onclick: function() {

      }
    }
  ];

  var buttons = this.canvas.selectAll('g.button')
    .data(buttonsData);

  buttons.enter()
    .append('g')
    .classed('button', true);

  buttons.exit().remove();

  var self = this;

  buttons.attr("transform", function(d, i) {
    return "translate(" + (self.buttonsStartX + self.buttonWidth * i + self.buttonMarginX * i) + "," + self.buttonsStartY + ")";
  });

  buttons.append('rect').classed('button', true)
    .text(function(d, i) { return d.title; })
    .attr('width', 50)
    .attr('height', 25)
    // .attr('x', function(d, i) {
    //   return self.buttonsStartX + self.buttonWidth * i + self.buttonMarginX * i;
    // })
    // .attr('y', function(d, i) {
    //   return self.buttonsStartY;
    // })
    .style('stroke-width', 3)
    .style('stroke', 'black')
    .attr('fill', function(d, i) {
      return d.isEnabled() ? 'white' : 'gray';
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

        d.onclick();
    });

  buttons.append('text')
    .style("text-anchor", "middle")
    .style("alignment-baseline", "middle")
    // .attr("x", function(d) { return self.buttonWidth / 2; })
    // .attr("y", self.buttonHeight / 2)
    .attr("dy", ".35em")
    .text(function(d, i) { return d.title; });

  return buttons;
};

pf.DrawTests.prototype.idAndClassElements = function() {
  common.log('idAndClassElements()');



  // var rectWithClass = this.canvas.append('rect')//.append('rect.some-class-thingy')
  //                                 .attr('width', 50)
  //                                 .attr('height', 50)
  //                                 .attr('x', 75)
  //                                 .attr('y', 75)
  //                                 .style('fill', 'red');

  var rectsWithClass = this.canvas.selectAll('rect.some-class-thingy')
                                  .data(this.testData);

                                  rectsWithClass.enter()
                                    .append('rect')
                                    .classed('some-class-thingy', true);

                                  rectsWithClass.attr('width', 50)
                                    .attr('height', 50)
                                    .attr('x', function(d, i) { return i * 55; })
                                    .attr('y', 75)
                                    .style('fill', function(d, i) { return d; });

                                  rectsWithClass.exit().remove();

  // this.squareRects = this.canvas.selectAll('rect');   // TODO probably select <g> elements (groups), and either way with a more defined selector (e.g. 'rect.pf-square') or something
  //
  // this.vcrControls = this.canvas.append('g').attr('id', 'vcr-controls').attr('width', 50).attr('height', 50).attr('transform', 'translate(15, 15)').style('fill', 'gray').append('rect').attr('width', 35).attr('height', 35);
  // this.vcrControls.style('fill', 'red');
};

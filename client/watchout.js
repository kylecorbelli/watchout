// start slingin' some d3 here.

var asteroidImage = './asteroid.png';
var heroImage = 'http://cliparts.co/cliparts/Lid/ojR/LidojRA8T.png';
var asteroidCount = 10;
var asteroids = [];

var w = window;
var width = w.innerWidth;
var height = w.innerHeight;

var drag = d3.behavior.drag()
  .on('drag', function(d) {
    var x = d3.event.x;
    var y = d3.event.y;
    d3.select(this)
      .attr('x', x)
      .attr('y', y);
  });

var ramboX = function(){
  return Math.max(Math.floor(Math.random() * width) - 200, 200);
};

var ramboY = function(){
  return Math.min(Math.floor(Math.random() * height), height - 200);
};

for(var i=0; i<asteroidCount; i++){
  var dataObject = {
    x : ramboX(),
    y : ramboY()
  };
  asteroids.push(dataObject);
}


d3.select('.board').style('width', width).style('height', height);


//Hero

var heroSelect = d3.select('svg').selectAll('.hero');

heroSelect.data([{x: Math.floor(width / 2), y: Math.floor(height / 2)}])
  .enter()
  .append('svg:image')
  .attr('x', function(d){
    return d.x;
  })
  .attr('y', function(d){
    return d.y;
  })
  .attr('xlink:href', heroImage)
  .call(drag);


//Asteroids
var select = d3.select('svg').selectAll('.asteroid');

select.data(asteroids)
  .enter()
  .append('svg:image')
  .attr('class', 'asteroid')
  .attr('x', function(d) {
    return d.x;
  })
  .attr('y', function(d) {
    return d.y;
  })
  .attr('xlink:href', asteroidImage);


var moveRocks = function() {

  var determineNextXLoc = function(){
    return ramboX();
  }
  var determineNextYLoc = function(){
    return ramboY();
  }


  var rocks = d3.select('svg').selectAll('.asteroid');

  rocks.transition()
  .attr("x", determineNextXLoc)
  .attr("y", determineNextYLoc)
  .duration(500);

};

setInterval(moveRocks, 1000);


//////////////////////////////////////////////////////////////
// testing
//////////////////////////////////////////////////////////////














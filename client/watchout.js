// start slingin' some d3 here.

var asteroidImage = './asteroid.png';
var asteroidCount = 10;
var asteroids = [];

var w = window;
var width = w.innerWidth;
var height = w.innerHeight;

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

var select = d3.select('svg').selectAll('.asteroid');

select.data(asteroids)
  .enter()
  .append('svg:image')
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


  var rocks = d3.select('svg').selectAll('image');
  rocks.transition()
  .attr("x", determineNextXLoc)
  .attr("y", determineNextYLoc)
  .duration(500);

};

setInterval(moveRocks, 1000);

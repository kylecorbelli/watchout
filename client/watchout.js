// start slingin' some d3 here.

var asteroidImage = './asteroid.png';
var asteroidCount = 10;
var asteroids = [];

var w = window;
var width = w.width;
var height = w.height;

for(var i=0; i<asteroidCount; i++){
  var dataObject = {
    x : Math.floor(Math.random() * window.innerWidth),
    y : Math.min(Math.floor(Math.random() * window.innerHeight), 900)
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
// start slingin' some d3 here.

/*

 (somewhere off in scoreboard land)
  if gCollision is true
  reset score

  if current score is greater than highScore
  highScore = Math.max(curScore, highScore)
*/


var asteroidImage = './asteroid.png';
var stanImage = 'http://cliparts.co/cliparts/Lid/ojR/LidojRA8T.png';
var asteroidCount = 1;
var asteroids = [];


var w = window;
var width = w.innerWidth;
var height = w.innerHeight;

var scoreboard = {
  highScore: 0,
  currentScore: 0,
  collision: false
};

var stanData = {
  x: Math.floor(width / 2),
  y: Math.floor(height / 2)
};

var drag = d3.behavior.drag()
  .on('drag', function(d) {
    var x = stanData.x = d3.event.x;
    var y = stanData.y = d3.event.y;
    console.log("stan x:", x, "stan y:", y);
    d3.select(this)
      .attr('x', x)
      .attr('y', y);
  });

var ramboX = function(){
  return Math.max(Math.floor(Math.random() * width) - 100, 100);
};

var ramboY = function(){
  return Math.min(Math.floor(Math.random() * height), height - 100);
};

for(var i=0; i<asteroidCount; i++){
  var dataObject = {
    x : ramboX(),
    y : ramboY(),
    closeToStan : undefined
  };
  asteroids.push(dataObject);
}


d3.select('.board').style('width', width).style('height', height);


var stanSelect = d3.select('svg').selectAll('.stan');

stanSelect.data([{x: stanData.x, y: stanData.y}])
  .enter()
  .append('svg:image')
  .attr('x', function(d){
    return d.x;
  })
  .attr('y', function(d){
    return d.y;
  })
  .attr('xlink:href', stanImage)
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
    var x = ramboX();

    scoreboard.collision = false;
    return x;
  };

  var determineNextYLoc = function(){
    var y = ramboY();

    return y;
  };


  var rocks = d3.select('svg').selectAll('.asteroid');
  rocks.transition()
  .attr("x", determineNextXLoc)
  .attr("y", determineNextYLoc)
  .duration(6000)
  .tween("custom", function(d, i) {
    var xInterp = d3.interpolate(d.x, ramboX());
    var yInterp = d3.interpolate(d.y, ramboY());
    return function(t) {
      // debugger;
      console.log(Math.abs(Math.floor(xInterp(t)) - stanData.x) + "\n" + Math.abs(stanData.y - Math.floor(yInterp(t))));
      if(Math.abs(xInterp(t) - stanData.x) < 100 && Math.abs(stanData.y - yInterp(t)) < 100){
        scoreboard.collision = true;
        scoreboard.currentScore = 0;
      }
    };
  });
};

setInterval(moveRocks, 6000);

setInterval(function(){
  //updating the data
  scoreboard.currentScore++;
  var select = d3.select('h1')
  .data([scoreboard.currentScore])
  .text(function(d){
    return "Score: "+ d;
  });
}, 100);

//////////////////////////////////////////////////////////////
// testing
//////////////////////////////////////////////////////////////


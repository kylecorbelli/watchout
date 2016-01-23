// start slingin' some d3 here.

/*

 (somewhere off in scoreboard land)
  if gCollision is true
  reset score

  if current score is greater than highScore
  highScore = Math.max(curScore, highScore)


*/


var asteroidImage = './asteroid.png';
var heroImage = 'http://cliparts.co/cliparts/Lid/ojR/LidojRA8T.png';
var asteroidCount = 10;
var asteroids = [];


var w = window;
var width = w.innerWidth;
var height = w.innerHeight;

var scoreboard = {
  highScore: 0,
  currentScore: 0,
  collision: false
};

var heroData = {
  x: Math.floor(width / 2),
  y: Math.floor(height / 2)
};

var drag = d3.behavior.drag()
  .on('drag', function(d) {
    var x = heroData.x = d3.event.x;
    var y = heroData.y = d3.event.y;
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
    y : ramboY(),
    closeToStan : undefined
  };
  asteroids.push(dataObject);
}


d3.select('.board').style('width', width).style('height', height);


//Hero

var heroSelect = d3.select('svg').selectAll('.hero');

heroSelect.data([{x: heroData.x, y: heroData.y}])
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
    var x = ramboX();

    //if x is within striking distance
    //set game.collide to true
    
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
  .duration(500)
  .tween("custom", function(d, i) {
    var xInterp = d3.interpolate(d.x, ramboX());
    var yInterp = d3.interpolate(d.y, ramboY());
    return function(t) {
      console.log(scoreboard.currentScore);
      if(Math.abs(xInterp(t) - heroData.x) < 200 && Math.abs(heroData.y - yInterp(t)) < 200){
        scoreboard.collision = true;
        scoreboard.currentScore = 0;
      }
    };
  });
};

setInterval(moveRocks, 1000);

setInterval(function(){
  //updating the data
  scoreboard.currentScore++;
  var select = d3.select('h1')
  .data([scoreboard.currentScore]);
  

  //there's no data there
  select.enter()
  .append("text")
  .text("Score" + scoreboard.currentScore);

  //removing the data
  select.exit().remove();
}, 100);

//////////////////////////////////////////////////////////////
// testing
//////////////////////////////////////////////////////////////


// start slingin' some d3 here.

/*

 (somewhere off in scoreboard land)
  if gCollision is true
  reset score

  if current score is greater than highScore
  highScore = Math.max(curScore, highScore)
*/


var asteroidImage = 'http://worldartsme.com/images/worried-people-clipart-1.jpg';
var stanImage = 'http://cliparts.co/cliparts/Lid/ojR/LidojRA8T.png';
var asteroidCount = 10;
var asteroids = [];


var w = window;
var width = w.innerWidth;
var height = w.innerHeight;

var scoreboard = {
  highScore: 0,
  currentScore: 0,
  collision: false,
  numCollisions: 0
};

var stanData = {
  x: Math.floor(width / 2),
  y: Math.floor(height / 2)
};

var drag = d3.behavior.drag()
  .origin(function(){
    var t = d3.select(this);
    return {x: t.attr("x"), y: t.attr("y")}
  })
  .on('drag', function(d) {
    var x = stanData.x = d3.event.x;
    var y = stanData.y = d3.event.y;
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

throttle = function(func, wait) {  
  var free = true;

  var setFree = function(){
    free = true;
  }

  var setWait = function(){
    setInterval(setFree, wait)
  };

  return function(){
    if(free){
      free = false;
      setWait();
      return func.apply(null,arguments);
    }
  }
};

var increaseCollisionCount = function(){
  scoreboard.numCollisions++;
};

var tamedIncreaseCollisionCount = throttle(increaseCollisionCount, 2000);


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
  .attr('class', 'stan')
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
  // .attr("x", determineNextXLoc)
  // .attr("y", determineNextYLoc)
  .duration(1000)
  .tween("custom", function(d, i) {
    
    var enemy = d3.select(this);



    var startPosition = {
      x: parseInt(enemy.attr("x")),
      y: parseInt(enemy.attr("y"))
    };

    var endPosition = {
      x: ramboX(),
      y: ramboY()
    };

    var hasCollided = false;

    return function(t) {
      if (!hasCollided) {
        if(Math.abs(enemy.attr("x") - stanData.x) < 100 && Math.abs(stanData.y - enemy.attr("y")) < 100){
          hasCollided = true;
          scoreboard.collision = true;
          tamedIncreaseCollisionCount();
          scoreboard.currentScore = 0;
        }
      }
      
       
      var updatePosition = {
        x: parseInt(startPosition.x) + (endPosition.x - startPosition.x) * t,
        y: parseInt(startPosition.y) + (endPosition.y - startPosition.y) * t
      };

      enemy.attr("x", updatePosition.x);
      enemy.attr("y", updatePosition.y);

    };
  });
};

setInterval(moveRocks, 1000);

setInterval(function(){
  //updating the data
  scoreboard.highScore = Math.max(scoreboard.currentScore, scoreboard.highScore);
  scoreboard.currentScore++;
  var select = d3.selectAll('h1')
  .data(["Conversations avoided: " + scoreboard.currentScore, "High Score: " + scoreboard.highScore, "Conversations: " + scoreboard.numCollisions])
  .text(function(d){
    return d;
  });
}, 100);

//////////////////////////////////////////////////////////////
// testing
//////////////////////////////////////////////////////////////


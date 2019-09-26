var s;
var scl = 40;

var food;
var score = 0;
var highScore = 0;
var speed = 9;

function Snake() {
  this.x =0;
  this.y =0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  this.score = 1;
  this.highscore = 1;

  this.dir = function(x,y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      this.score++;
      text(this.score, 70, 625);
      if (this.score > this.highscore) {
        this.highscore = this.score;
      }
      text(this.highscore, 540, 625);
      return true;
    } else {
      return false;
    }
  }

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total = 0;
        this.score = 0;
        this.tail = [];
      }
    }
  }

  this.update = function(){
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length-1; i++) {
        this.tail[i] = this.tail[i+1];
    }

    }
    this.tail[this.total-1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;

    this.x = constrain(this.x, 0, 600);
    this.y = constrain(this.y, 0, 600);


  }
  this.show = function(){
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
        rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }

    rect(this.x, this.y, scl, scl);
  }
}



function setup() {
    createCanvas(600, 600);
    s = new Snake();
    frameRate(10);
    pickLocation();
}

function pickLocation(){
  var cols = floor(width/scl);
  var rows = floor(height/scl);

  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(0,191,255);
  s.death();
  s.update();
  s.show();
  if (score === 0) {
    speed = 9;
    frameRate(speed);
  }
  if (s.eat(food)) {
    pickLocation();
    frameRate(speed);
    score++;
  }

  fill(255, 165, 0);
  rect(food.x, food.y, scl, scl);

  textSize(30);
  textFont('ProximaNova-Bold');
  fill(25, 25, 112);
  text("SCORE: " + score, 30, 50);
  text("HIGHSCORE: " + highScore, 30, 90);
}

function keyPressed() {
  if (keyCode === UP_ARROW && s.yspeed !== 1) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW && s.yspeed !== -1) {
    s.dir(0, 1)
  } else if (keyCode === LEFT_ARROW && s.xspeed !== 1) {
    s.dir(-1, 0)
  } else if (keyCode === RIGHT_ARROW && s.xspeed !== -1) {
    s.dir(1, 0)
  }
}
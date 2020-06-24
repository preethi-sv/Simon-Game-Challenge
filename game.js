var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

var buttonColors = ["red", "blue", "green", "yellow"];


// Start the game by pressing any key
$(document).on("keydown", function() {
  if (!gameStarted) {
    gameStarted = true;
    $("#level-title").text("Level 0");
    nextSequence();
  }
});

// Start the game by double tapping any key
$(document).on("dblclick", function() {
  if (!gameStarted) {
    setTimeout(function() {
      gameStarted = true;
      $("#level-title").text("Level 0");
      nextSequence();
    }, 100);
  }
});


// Handle User click (on buttons)
$(".btn").on("click", function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


// Create next random sound
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


// Check if the user pattern is correct
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over\n Double Tap to Restart");
    startOver();
  }

  if (currentLevel == level - 1) {
    setTimeout(function() {
      nextSequence();
      userClickedPattern = [];
    }, 1000);
  }
}


// Play sound
function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}


// Animate button for user click
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}


// Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
  userClickedPattern = [];
}

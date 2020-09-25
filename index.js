
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var started = false;
var level = 0; 


// to check for keyboard presses and to start the game by checking the keyboard presses by the user.

$(document).keydown(fucntion(){
   if(!started)
   {
     $("#level-title").text("Level"+level);
     nextSequence();
     started=true;
   }

});

// function for the next sequence by the machine. 

function nextSequence() {
    userClickedPattern = [];
    level++;
  //  to display the incremented level 0 to till the user fails.
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }


//  to store the id of the button clicked by the user.

  $(".btn").click(function(){

    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
  });
  
// to play sounds during button pressed.
    function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  // to show the animations during buttonpresses i.e. change the color of button to grey for 100 ms then back to original.
  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  

  // to check the user's answer with game's answer

  function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

// reset everything when the game is over. 

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

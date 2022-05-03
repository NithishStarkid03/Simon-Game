var gamePattern = [];

var userClickedPattern =[];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var maxScore = 0;

function playSound(name){
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}

function animatePress(currentColour){
  $('#'+currentColour).addClass("pressed");

  setTimeout(function(){
    $('#'+currentColour).removeClass("pressed");
  },100);
}

function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level+=1;
  $("#level-title").text("Level "+level);

}

  function checkAnswer(currentLevel){

  if(gamePattern[currentLevel-1] === userClickedPattern[currentLevel-1]){
      if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000)
    }
    }
    else{
      var wrong = new Audio('sounds/wrong.mp3');
      wrong.play();

      userClickedPattern = [];
      gamePattern = [];

      $("body").addClass("game-over");
      maxScore = Math.max(maxScore,level);
      $("#score").text("MAX Score : "+ maxScore);
      $("#level-title").text("Game Over, Press A Key to Restart");

      setTimeout(function(){
          $("body").removeClass("game-over");

          level = 0;
      },2000);

    }

}


$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length);
})

$(document).keypress(function(event){
  if(event.key === 'A' && level === 0){
    $("#level-title").text("Level "+level);
    nextSequence();
  }
})

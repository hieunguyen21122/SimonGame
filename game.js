var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;

function nextSequence() {
    level++;
    if (level === 6) {
        $("#level-title").text("Tối mai cho chịch <3 !!!");
        return "ok";
    }else {
        $("#level-title").text("Level " + level);
        var randomNumber = Math.floor(Math.random() * 4);
        gamePattern.push(buttonColours[randomNumber]);
        return buttonColours[randomNumber];
    }
}

$(document).keypress(function() {
    var randomChosenColour = nextSequence();
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
});

$(".btn").click(function() {
    var slectedButton = $(this);
    var userChosenColour  = slectedButton.attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    if (checkAnswer(userClickedPattern.length-1)) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                userClickedPattern = [];
                var randomChosenColour = nextSequence();
                if (randomChosenColour === "ok"){
                    getLove();
                }else {
                    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
                    playSound(randomChosenColour);
                }
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 1000);
        $("#level-title").text("Game Over, nhấn phím bất kỳ để chơi lại");
        startOver();
    }
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) return true;
    return false;
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function getLove() {
    $("body").addClass("love");
    $("#level-title").css("color", "rgb(235, 53, 53)");
    startOver();
    setTimeout(function() {
            $("#level-title").text("Nhấn phím bất kỳ để chịch tiếp <3<3<3 :)))");
    }, 5000);    
}

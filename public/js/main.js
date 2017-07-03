$("#quizform").on("submit", function(e){
    e.preventDefault();
    
    var correctAnswers = 0;
    // console.log($(this).serializeArray());
    var answersArray = $(this).serializeArray();
    console.log(answersArray);
    for (var i = 0; i < answersArray.length; i++){
        if (answersArray[i].value === 'correct'){
            correctAnswers++;

            $("input[name=" + answersArray[i].name + "]:checked", "#quizform").parent().css("background-color", "Green");
        }else{
            $("input[name=" + answersArray[i].name + "]:checked", "#quizform").parent().css("background-color", "Red");
        }
    }
    $("#scorePar").css("display", "block");
    $("#score").text(correctAnswers + "/10");
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    
})
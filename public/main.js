//When the user clicks on a trash icon

var trash = document.getElementsByClassName("fa-trash");

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const date = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('affirm', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'date': date,
            'msg': msg,
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});



//The rest of the JS , when you click on the generate quote button


$(document).ready(function() {

  //Creating varibles and getting the time for the clock

  new Date($.now());
  var dt = new Date();
  var time = dt.getHours() + ":" + dt.getMinutes();
  var compare = dt.getHours();

//Showing the time to the user on the DOM

  $("#clock").append(time);

  console.log(compare);

// Function to pick random lucky number
  function luckyNumber(){
    var luckyNumber = Math.floor(Math.random() * 100) + 1
    $(".luckyNumber").text("Your lucky Number today is " + luckyNumber)
  }

  //Variable for the audio playing during the

  var sound = document.createElement("audio");
          sound.volume=0.40;
          sound.autoPlay=false;
          sound.preLoad=true;

  //When user clicks on the button do a condtional

  $("#generate").on("click",function(){
    //Morning Quote
    if (compare > 5 && compare < 12) {

      $.ajax({
        url:"http://quotes.rest/qod.json?category=inspire ",
        success: function(r){
          sound.src="audio/SunnyDay.mp3";
            sound.play();
          $(".responseQuote").text(r.contents.quotes[0].quote + " -" + r.contents.quotes[0].author )
          $(".quote").css("background-color","yellow")
          luckyNumber();
        },
        error: function(er){
          console.log(er)
        }
      });

      //Afternoon Pick Me Up
    }else if (compare >= 12 && compare < 19) {
      $.ajax({
        url:"http://quotes.rest/qod.json?category=love ",
        success: function(r){
          sound.src="audio/H.A.T..mp3";
            sound.play();
          $(".responseQuote").text(r.contents.quotes[0].quote + " -" + r.contents.quotes[0].author )
          $(".quote").css("background-color","green")
          luckyNumber();
        },
        error: function(er){
          console.log(er)
        }
      });

      // Evening Quote
    }else if (compare >= 19 && compare <= 24) {
      $.ajax({
        url:"http://quotes.rest/qod.json?category=life ",
        success: function(r){
          sound.src="audio/Waterfall.mp3";
            sound.play();
        $(".responseQuote").text(r.contents.quotes[0].quote + " -" + r.contents.quotes[0].author )
        $(".quote").css("background-color","orange")
        luckyNumber();
        },
        error: function(er){
          console.log(er)
        }
      })

      //Funny Quote
    }else {
      $.ajax({
        url:"http://quotes.rest/qod.json?category=funny ",
        success: function(r){
          sound.src="audio/kidLaugh.mp3";
            sound.play();
          $(".responseQuote").text(r.contents.quotes[0].quote + " -" + r.contents.quotes[0].author )
          $(".quote").css("background-color","red")
          luckyNumber();
        },
        error: function(er){
          console.log(er)
        }
      })
    };
  });

});

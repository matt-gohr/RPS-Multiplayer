// Initialize Firebase
var config = {
  apiKey: "AIzaSyAIWrc7C-g6Zcd1P7yCIOBLjktV7ATU6q8",
  authDomain: "first-project-3fa4f.firebaseapp.com",
  databaseURL: "https://first-project-3fa4f.firebaseio.com",
  projectId: "first-project-3fa4f",
  storageBucket: "first-project-3fa4f.appspot.com",
  messagingSenderId: "128232668232"
};

firebase.initializeApp(config);

var database = firebase.database();
var player = 0;
var player1, player2;

function fillBlock(block, name, skip) {
  //remove the text from the block
  $('#' + block).children().remove()

  //add elements
  var NameP = $('<p>');
  NameP.text(name);
  var rock = $("<button class=\'btn btn-secondary\'> Rock </button>");
  var paper = $("<button class=\'btn btn-secondary\'> Paper </button>");
  var scissors = $("<button class=\'btn btn-secondary\'> Scissors </button>");
  var p = $('<p class=\'name\'>' + name + '</p>');
  var wins = $('<p class=\'wins\'>Wins: </p>');
  var losses = $('<p class=\'losses\'>Losses: </p>');

  //create span tags
  var spanWin = $("<span>");
  var spanLos = $("<span>");

  //add the inital score
  spanWin.text('0');
  spanLos.text('0');

  //span ids as the players name so it's easier to replace later on in the game
  spanWin.attr('id', 'wins-' + name);
  spanLos.attr('id', 'losses-' + name);

  //append span to wins and losses
  wins.append(spanWin);
  losses.append(spanLos);

  // add all the stuff to the block
  $('#' + block).append(p);

  //skip the adding of rock
  if (skip === true) {
    $('#' + block).append('')
  } else {
    $('#' + block).append(rock);
    $('#' + block).append(paper);
    $('#' + block).append(scissors);
  }
  $('#' + block).append(wins);
  $('#' + block).append(losses);
}

function mainClickEvent() {

  $("#start").on('click', function() {

    if (player === 0) {
      player++;

      player1 = $("#gamer-tag").val().trim();
      console.log(player1);

      var newPlayer = {
        1: {
          name: player1,
          wins: 0,
          losses: 0
        }
      }
      database.ref("players").update(newPlayer);
      fillBlock('left-block', player1);

    } else if (player === 1) {
      player++;

      player2 = $("#gamer-tag").val().trim();
      console.log(player2);

      var newPlayer = {
        2: {
          name: player2,
          wins: 0,
          losses: 0
        }
      }

      database.ref("players").update(newPlayer);
      fillBlock('right-block', player1);
    }
  });
}


database.ref("players").on("value", function(dataSnapshot) {

  dataSnapshot.forEach(function(data) {
    console.log("The Key is" + data.key + "and name is " + data.val().name);
  });

});




mainClickEvent();

$(document).on("click", ".btn", mainClickEvent);
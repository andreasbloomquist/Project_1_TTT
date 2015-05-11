// OOP Tic Tac Toe boilerplate code

// Execute this code only AFTER the document is ready
// Hint: use jQuery's `$(document).ready
$(document).ready(function(){

  function Game() {
    //Creates new instances of players upon creation of a new game instance
    this.player1 = new Player("luke");
    this.player2 = new Player("darth");
    
    //Set the current player to player 1 so that we can get this show on the road!
    this.currentPlayer = this.player1;
    
    //Create the board
    this.board = new Board();  
  };

  //**************************************************************
  // Prototype to update the game after a winner is found
  //**************************************************************
  // This method is invokved only after the checkWinner method has determined that a winning combination was met
  // The setWinner() method sets the game to be over (so that additional moves are disabled), and alerts who won the game.
  // In addition, the setWinner() method increments the score counter for the given team, and dynamically updates the html score counter.

  Game.prototype.setWinner = function(winner){
    this.board.gameOver = true;
    alert(winner);
    if (winner === this.player1.team){
      this.board.playerOneScore += 1;
      $('#player1').html("rebel alliance: " + this.board.playerOneScore);
    } else {
      this.board.playerTwoScore += 1;
      $('#player2').html("galactic empire: " + this.board.playerTwoScore);
    }
};
  //**************************************************************
  // Prototype to check if there's a winner
  //**************************************************************
  // This prototype, creates a method to check the possible winning combinations against an instance created using the Game constructor.
  // The team that is passed into the function to check for a winner is the team from the player that is currently playing.
  // If a winning combination is found for the given team, the setWinner method is evoked to perform the functions when a player wins the game.
  
  Game.prototype.checkWinner = function(team){
    //Check row 1 for this.currentPlayer
    if ($("#1").hasClass(team) && $("#2").hasClass(team) && $("#3").hasClass(team)) {
      return this.setWinner(team);
    //Check row 2 for this.currentPlayer
    } else if ($("#4").hasClass(team) && $("#5").hasClass(team) && $("#6").hasClass(team)) {
      return this.setWinner(team);
    //Check row 3 for this.currentPlayer
    } else if ($("#7").hasClass(team) && $("#8").hasClass(team) && $("#9").hasClass(team)) {
      return this.setWinner(team);   
    //Check column 1 for this.currentPlayer
    } else if ($("#1").hasClass(team) && $("#4").hasClass(team) && $("#7").hasClass(team)) {
      return this.setWinner(team);
    //Check column 2 for this.currentPlayer
    } else if ($("#2").hasClass(team) && $("#5").hasClass(team) && $("#8").hasClass(team)) {
      return this.setWinner(team);
    //Check column 3 for this.currentPlayer
    } else if ($("#3").hasClass(team) && $("#6").hasClass(team) && $("#9").hasClass(team)) {
      return this.setWinner(team);
    //Check Diagonals 1 for this.currentPlayer
    } else if ($("#1").hasClass(team) && $("#5").hasClass(team) && $("#9").hasClass(team) || $("#3").hasClass(team) && $("#5").hasClass(team) && $("#7").hasClass(team)) {
      return this.setWinner(team);
    };
    if (this.board.turns == 8) {
      return alert("tie");
    };
  };


  // Remember: prototypes are shared functions between all game instances
  Game.prototype.nextPlayer = function() {
    //check to see if the game is over before allowing the next player to play
      //Switch current player to player 2
      var _this = this;
      if (this.board.turns % 2 == 0) {
        this.currentPlayer = this.player2;
        return this.board.turns += 1; 
      //Switch current 
      } else {
        this.currentPlayer = this.player1;
        return this.board.turns += 1;
      };
  };

  // `Game.prototype.init` kicks off a new game with a board and two players
  Game.prototype.init = function() {
    var _this = this;
    $(".box").on("click", function(event) {
      if (!$(event.target).hasClass(_this.player1.team || _this.player2.team) && (_this.board.gameOver == false)) {
        $(event.target).addClass(_this.currentPlayer.team);
          _this.checkWinner(_this.currentPlayer.team);
          _this.nextPlayer();
      };
  });
};
  //Reset button prototype
  Game.prototype.resetGame = function(){
      var _this = this;
      $('#reset').on('click', function() {  
        $('.box').removeClass(_this.player1.team).removeClass(_this.player2.team);
        _this.board.turns = 0;
        _this.board.gameOver = false;
        _this.currentPlayer = _this.player1;
      });
  };

  // A starter Player constructor.
  function Player(team) {
      this.team = team;
};
  // A starter Board constructor.
  function Board() {
    //**************************************************************
    //Do these make sense to have in the board constructor or game?
    //**************************************************************
    this.gameOver = false;
    this.turns = 0;
    this.playerOneScore = 0;
    this.playerTwoScore = 0;

    //***************************
    // Setup HTML for game board
    //***************************
    // First create reset button
    $('#reset').append('<button>reset game</button>');

    // Second create game board
    for (var i=0; i<9; i++){
      $('#board').append("<div class='box' id='" + (i+1) + "''>&nbsp;</div>");
    };

    //Setup score section
    $('#score').append('<p class="score" id="player1">rebel alliance: 0</p>').append('<p class="score" id="player2">galactic empire: 0</p>');
  
  };

  Game.prototype.setUpBoard = function(){
    // QUESTION: I'm not sure if it makes sense to setup the html elements of the board using jquery
  };
  // Start the game!
  var game = new Game();
  game.setUpBoard();
  game.init();
  game.resetGame();

});
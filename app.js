$(document).ready(function(){
  //Variables to hold text string for winner alerts, this felt easier to read than adding the strings in the alerts themselves.
  var rebelWin = "The Rebel fighters have proven victorious against the evil Galatic Empire!";
  var darkWin = "Darth Vader and the Galatic Empire have destroyed the Rebel Alliance.";
  var tie = "Despite an epic fight, neither side can claim victory. It's a draw!";

  //**************************************************************
  // Game constructor
  //**************************************************************
  // The Game constructor is called to create a new game object
  function Game() {
    //Create the board
    this.board = new Board();

    //Creates new instances of players upon creation of a new game instance
    this.player1 = new Player("luke");
    this.player2 = new Player("darth");
    
    //Set the current player to player 1 so that we can get this show on the road!
    this.currentPlayer = this.player1;  

    this.gameOver = false;
    this.turns = 0;
    this.playerOneScore = 0;
    this.playerTwoScore = 0;
  };

  //**************************************************************
  // Prototype to update the game after a winner is found
  //**************************************************************
  // This method is invokved only after the checkWinner method has determined that a winning combination was met
  // The setWinner() method sets the game to be over (so that additional moves are disabled), and alerts who won the game.
  // In addition, the setWinner() method increments the score counter for the given team, and dynamically updates the html score counter.
  Game.prototype.setWinner = function(winner){
    this.gameOver = true;
    if (winner === this.player1.team){
      this.playerOneScore += 1;
      $('#player1').html("rebel alliance: " + this.playerOneScore);
      alert(rebelWin);
    } else {
      this.playerTwoScore += 1;
      $('#player2').html("galactic empire: " + this.playerTwoScore);
      alert(darkWin);
    };
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
    if (this.turns == 8) {
      return alert(tie);
    };
  };

  //**************************************************************
  // Prototype to set the next player
  //**************************************************************
  // The nextPlayer method is called after each turn to update the "current player" to the proper value, and to increment the turn counter.
  Game.prototype.nextPlayer = function() {
      //Switch current player to player 2
      if (this.turns % 2 == 0) {
        this.currentPlayer = this.player2;
        return this.turns += 1; 
      //Switch current player to player 1
      } else {
        this.currentPlayer = this.player1;
        return this.turns += 1;
      };
  };

  //**************************************************************
  // Prototype to initialize the game
  //**************************************************************
  // After a new Game instance is created, the init method starts to listen for clicks to start the game. 
  // When a click event occurs on an element with class="box" (aka a space on the board), a check is performed to ensure the game is not over, and to make sure the space hasn't already been clicked.
  // If the game is not over, and no one has previously clicked the square then the team of the user who clicked the square is added as a class. This class enables the css to display the background image associated with the player.
  // After adding the players name as a class to the html element, the checkWinner() and nextPlayer() methods are called.
  Game.prototype.init = function() {
    var _this = this;
    game.resetGame();
    $(".box").on("click", function(event) {
      if (!$(event.target).hasClass(_this.player1.team || _this.player2.team) && (_this.gameOver == false)) {
        $(event.target).addClass(_this.currentPlayer.team);
          _this.checkWinner(_this.currentPlayer.team);
          _this.nextPlayer();
        };
    });
    $(".box").hover(function() {
      if (_this.currentPlayer == _this.player1){
        $(this).addClass('hover1'); 
      } else if (_this.currentPlayer == _this.player2){
        $(this).addClass('hover2'); 
      }
      }, function() {
        $(this).removeClass("hover1").removeClass("hover2");
    });
  };

  //**************************************************************
  // Prototype to reset the game
  //**************************************************************
  // The resetGame() method starts an event listener on the reset button (#reset).
  // When a click occurs on the reset button, the function removes classes added when a player clicked the square.
  // In addition, the turn counter, and current player are reset and gameOver is set to false.
  Game.prototype.resetGame = function(){
      var _this = this;
      $('#reset').click(function() {
        $('.box').removeClass(_this.player1.team).removeClass(_this.player2.team);
        _this.turns = 0;
        _this.gameOver = false;
        _this.currentPlayer = _this.player1;
      });
  };

  //**************************************************************
  // Player constructor
  //**************************************************************
  // This constructor creates a new Player object, and takes the parameter "team" to set the team that the player plays on.
  function Player(team) {
      this.team = team;
};
  
  //**************************************************************
  // Board constructor
  //**************************************************************
  // This constructor creates the necessary HTML elements to play the game including the board, the reset button, and scoring section. 
  // While this constructor can create a board on the fly, some HTML elements must be hard coded to ensure the jQuery selectors know where to add the elements.
  function Board() {
    // First create reset button
    $('#reset').append('<button>reset game</button>');
    // Second create game board
    for (var i=0; i<9; i++){
      $('#board').append("<div class='box' id='" + (i+1) + "''>&nbsp;</div>");
    };
    //Setup score section
    $('#score').append('<p class="score" id="player1">rebel alliance: 0</p>').append('<p class="score" id="player2">galactic empire: 0</p>');
  };

  // Start the game!
  var game = new Game();
  game.init();

});
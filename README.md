#WDI: First Project

### Technologies Used

 - HTML/CSS
 - JavaScript
 - jQuery

###Existing features
**Basic Tic Tac Wars**
This is a Star Wars themed, basic implementation of the classic game *Tic Tac Toe*, using Object Oriented pricinples.

With this implementation, two players are made upon creation of a new game. One player for the Rebel Alliance (Luke Skywalker), and another player for the Gallactic Empire (Darth Vader). 

Upon each click of a square a player image is added to mark the players move. After a player has selected a square, no further clicks can be performed on that box.

Once a player has met a winning combination of spaces an alert is issued and the players score is updated to reflect how many wins the player has achieved. If all squares are selected and no winner is determined than a tie notification is dispatched.

Clicking the *'reset game'* button at the top of the page resets the board so that a new game can be played. 

###Planned features
1. Add jQuery animations to further customize player turns. For example, alternate hover over colors based on current player
2. Refactor JS to allow for custom player names based on user input either via prompt or form
3. Add ability to save game state and return to game
4. Add ability to select from a variety of player tokens


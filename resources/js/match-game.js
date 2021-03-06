$(document).ready(function() {
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
});

var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var cardValues = [];
  for (var i = 1; i < 9; i++) {
    cardValues.push(i);
    cardValues.push(i);
  }

  var cardValuesLength = cardValues.length;
  var randomOrder = [];
  while (randomOrder.length < cardValuesLength) {
    var randomIndex = Math.floor(Math.random() * cardValues.length);
    randomOrder.push(cardValues[randomIndex]);
    cardValues.splice(randomIndex, 1);
  }

  return randomOrder;

};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.data('flippedArray', []);
  var colors = ['hsl(25, 85%, 65%)', 'hsl(55, 85%, 65%)', 'hsl(90, 85%, 65%)', 'hsl(160, 85%, 65%)', 'hsl(220, 85%, 65%)', 'hsl(265, 85%, 65%)', 'hsl(310, 85%, 65%)', 'hsl(360, 85%, 65%)'];
  $game.empty();

  for (var i = 0; i < cardValues.length; i++) {
    var $card = $('<div class="card col-lg-3"></div>');
    $card.data('value', cardValues[i]);
    $card.data('flipped', false);
    $card.data('color', colors[cardValues[i] - 1]);
    $game.append($card);
    $card.click(function () {
      MatchGame.flipCard($(this), $game);
    });
  }

};


/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('flipped')) {
    return ;
  } else {
    $card.css('background-color', $card.data('color'));
    $card.text($card.data('value'));
    $card.data('flipped', true);
    $game.data('flippedArray').push($card);
    if ($game.data('flippedArray').length === 2) {
      var $card1 = $game.data('flippedArray')[0];
      var $card2 = $game.data('flippedArray')[1];

      if ($card1.data('value') === $card2.data('value')) {
        $card1.css('color', 'rgb(204, 204, 204)');
        $card1.css('background-color', 'rgb(153, 153, 153)');
        $card2.css('color', 'rgb(204, 204, 204)');
        $card2.css('background-color', 'rgb(153, 153, 153)');
      } else {
        setTimeout(function() {
          $card1.css('background-color', 'rgb(32, 64, 86)');
          $card1.text('');
          $card1.data('flipped', false);
          $card2.css('background-color', 'rgb(32, 64, 86)');
          $card2.text('');
          $card2.data('flipped', false);
        }, 350);

      }
      $game.data('flippedArray', []);
    }
  }
};

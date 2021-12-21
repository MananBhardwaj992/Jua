'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
let name0 = document.getElementById('name--0');
let name1 = document.getElementById('name--1');


// Starting contitions
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')
  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')

  name0.textContent = prompt('Enter the name of first player')
  name1.textContent = prompt('Enter the name of second player')

  if (!name0.textContent) {
    name0.textContent = 'Player 1'
  }
  if (!name1.textContent) {
    name1.textContent = 'Player 2'
  }
}

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0
}
// Rolling dice functionlaty
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.generating arandom dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Disply dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true,  player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // Change later
    } else {
      // switch to next player

      switchPlayer();
      diceEl.classList.add('hidden')

    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {// 1. Add current current score to active player
    scores[activePlayer] += currentScore;
    // score[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
    currentScore = 0
    diceEl.classList.add('hidden')




    // 2. Check score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish game
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      diceEl.classList.add('hidden');


    } else {
      switchPlayer();
    }
  }

  // switch to next player
})

btnNew.addEventListener('click', init)
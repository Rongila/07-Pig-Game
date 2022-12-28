'use strict';
// Selecting elements
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

//////////
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//Starting Condition
let scorc, currentScore, activPlayer, playing;
const init = function () {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  scorc = [0, 0];
  currentScore = 0;
  activPlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--winner');
  player1EL.classList.remove('player--active');
};
init();

const swichPlayer = function () {
  document.getElementById(`current--${activPlayer}`).textContent = 0;
  currentScore = 0;

  activPlayer = activPlayer == 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.generating a random num
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    //3.chack for roll 1 : if true , swich to next player
    if (dice !== 1) {
      //dice to the corrent scorc
      currentScore += dice;

      document.getElementById(`current--${activPlayer}`).textContent =
        currentScore;
    } else {
      //swice to next player
      swichPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // 1.add current scorse to acctive player scorc
  if (playing) {
    scorc[activPlayer] += currentScore;
    document.getElementById(`score--${activPlayer}`).textContent =
      scorc[activPlayer];
    //2.chack scor al least 100
    if (scorc[activPlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activPlayer}`)
        .classList.add('player--active');
      diceEL.classList.add('hidden');
    } else {
      swichPlayer();
    }
  }
  //finis game
  //3.swich player
});

btnNew.addEventListener('click', init);

'use strict';
const diceImg = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn-roll');
const player = document.querySelector('.player');
const player1 = document.querySelector('.player-0');
const player2 = document.querySelector('.player-1');
const currentScore1 = document.querySelector('#current-0');
const currentScore2 = document.querySelector('#current-1');
const HoldBtn = document.querySelector('.btn-hold');
const scoreData1 = document.querySelector('#score-0');
const scoreData2 = document.querySelector('#score-1');
let score1 = 0;
let score2 = 0;

function changeDice() {
  diceImg.style.display = 'block';
  if (player1.classList.contains('player-active')) {
    let randomNumber1 = Math.floor(Math.random() * 6) + 1;
    score1 = score1 + randomNumber1;

    diceImg.setAttribute('src', `dice-${randomNumber1}.png`);
    if (randomNumber1 === 1) {
      changingTrum();
      currentScore1.innerHTML = 0;
      score1 = 0;
      randomNumber1 = 0;
    } else {
      currentScore1.innerHTML = score1;
    }
  } else if (player2.classList.contains('player-active')) {
    let randomNumber2 = Math.floor(Math.random() * 6) + 1;
    score2 = score2 + randomNumber2;
    diceImg.setAttribute('src', `dice-${randomNumber2}.png`);
    if (randomNumber2 === 1) {
      changingTrum();
      currentScore2.innerHTML = 0;
      score2 = 0;
      randomNumber2 = 0;
    } else {
      currentScore2.innerHTML = score2;
    }
  }
}

let playerScore1 = 0;
let playerScore2 = 0;
function addScore() {
  if (
    currentScore1.innerHTML !== 0 &&
    player1.classList.contains('player-active')
  ) {
    playerScore1 += parseInt(currentScore1.innerHTML);

    scoreData1.innerHTML = playerScore1;
    currentScore1.innerHTML = 0;
    score1 = 0;
  } else if (
    currentScore2.innerHTML !== 0 &&
    player2.classList.contains('player-active')
  ) {
    playerScore2 += parseInt(currentScore2.innerHTML);

    scoreData2.innerHTML = playerScore2;
    currentScore2.innerHTML = 0;
    score2 = 0;
  }
  winner(playerScore1, playerScore2);
  changingTrum();
}

function changingTrum() {
  if (!player2.classList.contains('player-active')) {
    player2.classList.add('player-active');
    player1.classList.remove('player-active');
  } else {
    player1.classList.add('player-active');
    player2.classList.remove('player-active');
  }
}

function winner(p1, p2) {
  if (p1 >= 100) {
    player1.classList.add('player-winner');
    rollBtn.removeEventListener('click', changeDice);
    HoldBtn.removeEventListener('click', addScore);
    diceImg.style.display = 'none';
  } else if (p2 >= 100) {
    player2.classList.add('player-winner');
    rollBtn.removeEventListener('click', changeDice);
    HoldBtn.removeEventListener('click', addScore);
    diceImg.style.display = 'none';
  }
}

document.querySelector('.btn-new').addEventListener('click', () => {
  window.location.reload();
});

rollBtn.addEventListener('click', changeDice);
HoldBtn.addEventListener('click', addScore);

const moves = ['rock', 'paper', 'scissors'];
const moveButtons = document.querySelectorAll('.move');
const playerChoice = document.querySelector('#player-choice');
const computerChoice = document.querySelector('#computer-choice');
const result = document.querySelector('#result');
const playerScoreText = document.querySelector('#player-score');
const computerScoreText = document.querySelector('#computer-score');
const tieScoreText = document.querySelector('#tie-score');
const resetButton = document.querySelector('#reset-button');

let playerScore = 0;
let computerScore = 0;
let tieScore = 0;

function formatMove(move) {
  return { rock: '✊ Rock', paper: '✋ Paper', scissors: '✌️ Scissors' }[move];
}

function getWinner(player, computer) {
  if (player === computer) return 'tie';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) return 'player';
  return 'computer';
}

function playRound(playerMove) {
  const computerMove = moves[Math.floor(Math.random() * moves.length)];
  const winner = getWinner(playerMove, computerMove);

  playerChoice.textContent = formatMove(playerMove);
  computerChoice.textContent = formatMove(computerMove);
  result.classList.remove('win', 'lose', 'tie');

  if (winner === 'player') {
    playerScore += 1;
    result.textContent = `${formatMove(playerMove)} beats ${formatMove(computerMove)} — You win!`;
    result.classList.add('win');
  } else if (winner === 'computer') {
    computerScore += 1;
    result.textContent = `${formatMove(computerMove)} beats ${formatMove(playerMove)} — Computer wins!`;
    result.classList.add('lose');
  } else {
    tieScore += 1;
    result.textContent = `Both chose ${formatMove(playerMove)} — It's a tie!`;
    result.classList.add('tie');
  }

  playerScoreText.textContent = playerScore;
  computerScoreText.textContent = computerScore;
  tieScoreText.textContent = tieScore;
}

moveButtons.forEach((button) => {
  button.addEventListener('click', () => playRound(button.dataset.move));
});

resetButton.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  tieScore = 0;
  playerScoreText.textContent = '0';
  computerScoreText.textContent = '0';
  tieScoreText.textContent = '0';
  playerChoice.textContent = '—';
  computerChoice.textContent = '—';
  result.textContent = 'Make your move!';
  result.classList.remove('win', 'lose', 'tie');
});

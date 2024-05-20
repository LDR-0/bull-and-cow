const readlineSync = require('readline-sync');

function generateNumber() {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let number = '';
  for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * digits.length);
    number += digits.splice(index, 1)[0];
  }
  return number;
}

function checkGuess(secret, guess) {
  let bulls = 0;
  let cows = 0;
  for (let i = 0; i < 4; i++) {
    if (guess[i] === secret[i]) {
      bulls++;
    } else if (secret.includes(guess[i])) {
      cows++;
    }
  }
  return { bulls, cows };
}

function playGame() {
  console.log('Welcome to Bulls and Cows game!');
  console.log('Try to guess the 4-digit number. Good luck!\n');

  const secretNumber = generateNumber();
  let attempts = 0;

  while (true) {
    const guess = readlineSync.question('Enter your guess (4-digit number): ');

    if (!/^\d{4}$/.test(guess)) {
      console.log('Please enter a valid 4-digit number.\n');
      continue;
    }

    attempts++;
    const { bulls, cows } = checkGuess(secretNumber, guess);

    if (bulls === 4) {
      console.log(`Congratulations! You've guessed the number ${secretNumber} in ${attempts} attempts.`);
      break;
    } else {
      console.log(`Bulls: ${bulls}, Cows: ${cows}`);
      console.log('Try again.\n');
    }
  }
}

playGame();

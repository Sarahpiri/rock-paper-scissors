document.addEventListener("DOMContentLoaded", () => {
  const choices = document.querySelectorAll(".choice");
  const resultElement = document.getElementById("result");
  const scoreElement = document.getElementById("score");
  const rulesBtn = document.getElementById("rulesBtn");
  const rulesModal = document.getElementById("rulesModal");
  const closeBtn = document.getElementById("closeBtn");
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  const refreshBtn = document.getElementById("refreshBtn");
  const scoreValue = document.querySelector(".score-value");

  refreshBtn.addEventListener("click", () => {
    // reset game score
    scoreValue.textContent = "0";

    // reset game alert
    alert("The game has been reset! The score has returned to zero!");
  });

  let score = 0;

  // Game rules - what beats what
  const rules = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["paper", "spock"],
    spock: ["rock", "scissors"],
  };

  // Emoji mapping
  const emojis = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️",
    lizard: "🦎",
    spock: "🖖",
  };

  // Play game when a choice is clicked
  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      const playerChoice = choice.dataset.choice;
      const computerChoice = getComputerChoice();
      const winner = determineWinner(playerChoice, computerChoice);

      displayResult(playerChoice, computerChoice, winner);
      updateScore(winner);
    });
  });

  // Show rules modal
  rulesBtn.addEventListener("click", () => {
    rulesModal.style.display = "flex";
  });

  // Hide rules modal
  closeBtn.addEventListener("click", () => {
    rulesModal.style.display = "none";
  });

  // Hide modal when clicking outside
  rulesModal.addEventListener("click", (e) => {
    if (e.target === rulesModal) {
      rulesModal.style.display = "none";
    }
  });

  // Get random computer choice
  function getComputerChoice() {
    const choices = Object.keys(rules);
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  // Determine the winner
  function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      return "draw";
    }

    if (rules[playerChoice].includes(computerChoice)) {
      return "player";
    } else {
      return "computer";
    }
  }

  // Display the result
  function displayResult(playerChoice, computerChoice, winner) {
    let resultText = "";

    if (winner === "draw") {
      resultText = `It's a draw! Both chose ${playerChoice} ${emojis[playerChoice]}`;
    } else if (winner === "player") {
      resultText = `You win! ${playerChoice} ${emojis[playerChoice]} beats ${computerChoice} ${emojis[computerChoice]}`;
    } else {
      resultText = `You lose! ${computerChoice} ${emojis[computerChoice]} beats ${playerChoice} ${emojis[playerChoice]}`;
    }

    resultElement.textContent = resultText;
  }

  // Update the score
  function updateScore(winner) {
    if (winner === "player") {
      score++;
    } else if (winner === "computer" && score > 0) {
      score--;
    }

    scoreElement.textContent = score;
  }

  // dark/light mood
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    body.classList.add("dark-mode");
  }

  
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // saving mood
    const isDarkMode = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });
});

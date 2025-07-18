document.addEventListener("DOMContentLoaded", () => {
  const textToType = document.getElementById("text-to-type");
  const typingArea = document.getElementById("typing-area");
  const speedDisplay = document.getElementById("speed");
  const accuracyDisplay = document.getElementById("accuracy");
  const mistakesDisplay = document.getElementById("mistakes");
  const timeDisplay = document.getElementById("time");
  const restartBtn = document.getElementById("restart");
  const progressBar = document.getElementById("progress-bar");
  const difficultySelect = document.getElementById("difficulty");
  const definitionBox = document.getElementById("definition-box");

  let currentText = "";
  let startTime = null;
  let mistakes = 0;
  let interval = null;
  let difficulty = "easy";
  let lastFetchedWord = "";

  function getWordCountFromDifficulty(level) {
    if (level === "easy") return 25; //easy
    if (level === "medium") return 50; //medium
    return 100; // hard
  }

  async function loadNewText() {
    const wordCount = getWordCountFromDifficulty(difficulty);

    try {
      const res = await fetch(
        `https://random-word-api.herokuapp.com/word?number=${wordCount}`
      );
      const words = await res.json();

      currentText = words.join(" ");
      textToType.innerHTML = currentText
        .split("")
        .map((char) => `<span>${char}</span>`)
        .join("");

      typingArea.value = "";
      typingArea.disabled = false;
      mistakes = 0;
      mistakesDisplay.textContent = "0";
      speedDisplay.textContent = "0";
      accuracyDisplay.textContent = "100";
      timeDisplay.textContent = "0";
      progressBar.style.width = "0%";
      clearInterval(interval);
      startTime = null;
      updateHighlight();
      if (definitionBox) definitionBox.textContent = "";
    } catch (err) {
      console.error("Failed to fetch words:", err);
      textToType.textContent = "Failed to load words. Try again.";
    }
  }

  function updateHighlight() {
    const characters = textToType.querySelectorAll("span");
    const typed = typingArea.value;

    characters.forEach((char, index) => {
      char.classList.remove("correct", "incorrect", "current");
      if (index < typed.length) {
        char.classList.add(
          typed[index] === currentText[index] ? "correct" : "incorrect"
        );
      } else if (index === typed.length) {
        char.classList.add("current");
      }
    });

    const progress = (typed.length / currentText.length) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }

  async function fetchDefinition(word) {
    if (word === lastFetchedWord) return;
    lastFetchedWord = word;

    definitionBox.textContent = "Fetching definition...";
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await res.json();

      if (Array.isArray(data)) {
        const meaning =
          data[0]?.meanings?.[0]?.definitions?.[0]?.definition ||
          "No definition found.";
        definitionBox.innerHTML = `<strong>${word}</strong>: ${meaning}`;
      } else {
        definitionBox.textContent = `No definition found for "${word}"`;
      }
    } catch (err) {
      console.error("Error fetching definition:", err);
      definitionBox.textContent = "Error fetching definition.";
    }
  }

  typingArea.addEventListener("input", () => {
    const typed = typingArea.value;

    if (!startTime) {
      startTime = new Date();
      interval = setInterval(updateStats, 1000);
    }

    updateHighlight();

    let errors = 0;
    typed.split("").forEach((char, index) => {
      if (char !== currentText[index]) errors++;
    });

    mistakes = errors;
    mistakesDisplay.textContent = mistakes;

    const accuracy =
      typed.length > 0 ? ((typed.length - mistakes) / typed.length) * 100 : 100;
    accuracyDisplay.textContent = accuracy.toFixed(2);

    // Fetch definition of last typed word
    const words = typed.trim().split(/\s+/);
    const lastWord = words[words.length - 1];
    if (lastWord.length >= 3) fetchDefinition(lastWord.toLowerCase());

    if (typed === currentText) {
      clearInterval(interval);
      typingArea.disabled = true;
      updateStats();
      showSummary();
    }
  });

  function updateStats() {
    const elapsed = (new Date() - startTime) / 1000;
    timeDisplay.textContent = Math.floor(elapsed);
    const wordsTyped = typingArea.value.trim().split(/\s+/).length;
    const speed = elapsed > 0 ? Math.round((wordsTyped / elapsed) * 60) : 0;
    speedDisplay.textContent = speed;
  }

  function showSummary() {
    setTimeout(() => {
      alert(
        `🎉 Completed!\n\nSpeed: ${speedDisplay.textContent} WPM\nAccuracy: ${accuracyDisplay.textContent}%\nMistakes: ${mistakes}`
      );
    }, 300);
  }

  restartBtn.addEventListener("click", loadNewText);

  difficultySelect.addEventListener("change", (e) => {
    difficulty = e.target.value;
    loadNewText();
  });

  loadNewText();
});

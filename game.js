const gameName = "Guess Word Game";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Created By Mostafa Ahmed`;

const msg = document.querySelector(".msg");
const btnHint = document.querySelector(".hint-btn");

let guessWord = "";
const words = [
  "neck",
  "milk",
  "banana",
  "clock",
  "fire",
  "orange",
  "robot",
  "worm",
  "cookie",
  "green",
  "candle",
  "bear",
  "hair",
];
guessWord = words[Math.floor(Math.random() * words.length)].toLowerCase();

console.log(guessWord);

let numbersTries = 5;
let numbersLetters = guessWord.length;
let currentTry = 1;
let hintNumber = 2;

document.querySelector(".hint-btn span").innerHTML = hintNumber;
btnHint.addEventListener("click", getHint);

function generateInputs() {
  const inputs = document.querySelector(".inputs");

  for (let i = 1; i <= numbersTries; i++) {
    const div = document.createElement("div");
    div.classList.add(`try-${i}`);
    const span = document.createElement("span");
    span.innerHTML = `Try ${i}`;
    div.appendChild(span);

    if (i !== currentTry) {
      div.classList.add("disabled-inputs");
    }

    for (let j = 1; j <= numbersLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `try-${i}-letter-${j}`;
      input.setAttribute("maxLength", 1);
      div.appendChild(input);
    }

    inputs.appendChild(div);
  }

  inputs.children[currentTry - 1].children[1].focus();

  const disabledInputs = document.querySelectorAll(
    ".inputs .disabled-inputs input"
  );
  disabledInputs.forEach((input) => {
    input.disabled = true;
  });

  const letters = document.querySelectorAll(".inputs input");
  letters.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextLetter = letters[index + 1];
      nextLetter ? nextLetter.focus() : null;
    });

    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(letters).indexOf(this);
      if (event.key === "ArrowRight") {
        const nextLetter = currentIndex + 1;
        nextLetter < letters.length ? letters[nextLetter].focus() : null;
      }
      if (event.key === "ArrowLeft") {
        const nextLetter = currentIndex - 1;
        nextLetter >= 0 ? letters[nextLetter].focus() : null;
      }
    });
  });
}

const checkBtn = document.querySelector(".check-btn");
checkBtn.addEventListener("click", handleCheck);

function handleCheck() {
  let success = true;

  for (let i = 1; i <= guessWord.length; i++) {
    const inputField = document.querySelector(`#try-${currentTry}-letter-${i}`);
    const guessLetter = inputField.value.toLowerCase();
    const actualLetter = guessWord[i - 1];

    if (guessLetter === actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (guessWord.includes(guessLetter) && guessLetter !== "") {
      inputField.classList.add("not-in-place");
      success = false;
    } else {
      inputField.classList.add("no");
      success = false;
    }
  }

  if (success) {
    const inputsDiv = document.querySelectorAll(".inputs > div");
    inputsDiv.forEach((input) => {
      input.classList.add("disabled-inputs");
    });

    const disabledInputs = document.querySelectorAll(
      ".inputs .disabled-inputs input"
    );
    disabledInputs.forEach((input) => {
      input.disabled = true;
    });

    msg.classList.add("active");
    msg.innerHTML = `You Win After ${currentTry} ${
      currentTry > 1 ? "Tries" : "Try"
    } And The Word Is <span>${guessWord}</span>`;
    checkBtn.classList.add("disabled");
    checkBtn.disabled = true;
    btnHint.classList.add("disabled");
    btnHint.disabled = true;
  } else {
    const currentDiv = document.querySelector(`.try-${currentTry}`);
    const currentDivInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentDiv.classList.add("disabled-inputs");
    currentDivInputs.forEach((input) => (input.disabled = true));

    currentTry++;

    if (currentTry <= numbersTries) {
      const nextDiv = document.querySelector(`.try-${currentTry}`);
      const nextDivInputs = document.querySelectorAll(
        `.try-${currentTry} input`
      );
      nextDiv.classList.remove("disabled-inputs");
      nextDivInputs.forEach((input) => (input.disabled = false));
      nextDiv.children[1].focus();
    } else {
      msg.classList.add("active");
      msg.innerHTML = `You Lose The Word Is <span>${guessWord}</span>`;
      checkBtn.classList.add("disabled");
      checkBtn.disabled = true;
      btnHint.classList.add("disabled");
      btnHint.disabled = true;
    }
  }
}

function getHint() {
  if (hintNumber > 0) {
    hintNumber--;
    document.querySelector(".hint-btn span").innerHTML = hintNumber;
  }

  if (hintNumber === 0) {
    btnHint.classList.add("disabled");
    btnHint.disabled = true;
  }

  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  const emptyInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );

  if (emptyInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyInputs.length);
    const randomInput = emptyInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);

    if (indexToFill !== -1) {
      randomInput.value = guessWord[indexToFill].toUpperCase();
    }
  }
}

function handleBackSpace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}

document.addEventListener("keydown", handleBackSpace);

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function () {
  window.location.reload();
});

window.onload = function () {
  generateInputs();
};

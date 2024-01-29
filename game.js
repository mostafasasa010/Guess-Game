let gameName = "Guess Word Game";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Created By Mostafa Ahmed`;
let msg = document.querySelector(".msg");
let btnHint = document.querySelector(".hint-btn");

let guessWord = "";
let words = [
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
  let inputs = document.querySelector(".inputs");
  // Generate Tries
  for (let i = 1; i <= numbersTries; i++) {
    let div = document.createElement("div");
    div.classList.add(`try-${i}`);
    let span = document.createElement("span");
    span.innerHTML = `Try ${i}`;
    div.appendChild(span);
    if (i !== currentTry) div.classList.add(`disabled-inputs`);
    // Generate Letters
    for (let j = 1; j <= numbersLetters; j++) {
      let input = document.createElement("input");
      input.type = "text";
      input.id = `try-${i}-letter-${j}`;
      input.setAttribute("maxLength", 1);
      div.appendChild(input);
    }
    inputs.appendChild(div);
  }

  // Focus To First Input Into Current Try
  inputs.children[currentTry - 1].children[1].focus();

  // Disabled Inputs Not Included In Current Try
  let disabledInputs = document.querySelectorAll(
    ".inputs .disabled-inputs input"
  );
  disabledInputs.forEach((input) => {
    input.disabled = true;
  });

  // Manage Inputs
  let letters = document.querySelectorAll(".inputs input");
  letters.forEach((input, index) => {
    input.addEventListener("input", function () {
      // Convert Value To Uppercase
      this.value = this.value.toUpperCase();
      // Focus To Next Input When Typing Current Input
      let nextLetter = letters[index + 1];
      nextLetter ? nextLetter.focus() : null;
    });
    // Manage Arrows To Inputs
    input.addEventListener("keydown", function (event) {
      let currentIndex = Array.from(letters).indexOf(this);
      if (event.key === "ArrowRight") {
        let nextLetter = currentIndex + 1;
        nextLetter < letters.length ? letters[nextLetter].focus() : null;
      }
      if (event.key === "ArrowLeft") {
        let nextLetter = currentIndex - 1;
        nextLetter >= 0 ? letters[nextLetter].focus() : null;
      }
    });
  });
}

let checkBtn = document.querySelector(".check-btn");
checkBtn.addEventListener("click", handleCheck);

function handleCheck() {
  let succes = true;
  for (let i = 1; i <= guessWord.length; i++) {
    let inputField = document.querySelector(`#try-${currentTry}-letter-${i}`);
    let guessLetter = inputField.value.toLowerCase();
    let actualLetter = guessWord[i - 1];
    if (guessLetter === actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (guessWord.includes(guessLetter) && guessLetter !== "") {
      inputField.classList.add("not-in-place");
      succes = false;
    } else {
      inputField.classList.add("no");
      succes = false;
    }
  }

  if (succes) {
    let inputsDiv = document.querySelectorAll(".inputs > div");
    inputsDiv.forEach((input) => {
      input.classList.add("disabled-inputs");
    });
    // Disabled Inputs Not Included In Current Try
    let disabledInputs = document.querySelectorAll(
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
    let currentDiv = document.querySelector(`.try-${currentTry}`);
    let currentDivInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentDiv.classList.add("disabled-inputs");
    currentDivInputs.forEach((input) => (input.disabled = true));

    currentTry++;
    console.log(currentTry);

    if (currentTry <= numbersTries) {
      let nextDiv = document.querySelector(`.try-${currentTry}`);
      let nextDivInputs = document.querySelectorAll(`.try-${currentTry} input`);
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
  let enabledInputs = document.querySelectorAll("input:not([disabled])");
  let emptyInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );
  if (emptyInputs.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyInputs.length);
    let randomInput = emptyInputs[randomIndex];
    let indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    if (indexToFill !== -1) {
      randomInput.value = guessWord[indexToFill].toUpperCase();
    }
  }
}

window.onload = function () {
  generateInputs();
};

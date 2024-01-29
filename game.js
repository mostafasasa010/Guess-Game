let gameName = "Guess Word Game";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Created By Mostafa Ahmed`;

let numbersTries = 5;
let numbersLetters = 6;
let currentTry = 1;

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

window.onload = function () {
  generateInputs();
};

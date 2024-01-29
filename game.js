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

  inputs.children[currentTry - 1].children[1].focus();
}

window.onload = function () {
  generateInputs();
};

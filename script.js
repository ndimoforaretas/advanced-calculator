// Dark Mode Switch

document
  .querySelector("#dark-mode-switch")
  .addEventListener("change", function (e) {
    document.body.classList.toggle("dark-mode", e.target.checked);
    document
      .querySelector(".calc-container")
      .classList.toggle("dark-mode", e.target.checked);
    document
      .querySelector(".output")
      .classList.toggle("dark-mode", e.target.checked);
    Array.from(document.querySelectorAll(".btn")).forEach((btn) =>
      btn.classList.toggle("dark-mode", e.target.checked)
    );
  });

const calcContainer = document.querySelector(".calc-container");
const keys = [
  ["1", "2", "3", "+"],
  ["4", "5", "6", "-"],
  ["7", "8", "9", "*"],
  ["AC", "0", "=", "/"],
  ["sqrt", "pow"],
  ["MC", "M+", "M-", "MR"],
];
let output;
let currentOperator = "";
let currentNumber = "";
let storedNumber = "";
let memory = 0; // For memory operations

document.addEventListener("DOMContentLoaded", function () {
  output = document.createElement("div");
  output.innerHTML = "0";
  output.classList.add("output");
  calcContainer.appendChild(output);

  keys.forEach((row) => {
    let div = document.createElement("div");
    div.classList.add("row");
    row.forEach((key) => {
      let btn = document.createElement("div");
      btn.innerHTML = key;
      btn.classList.add("btn");
      btn.addEventListener("click", () => handleButtonPress(key));
      div.appendChild(btn);
    });
    calcContainer.appendChild(div);
  });

  document.addEventListener("keydown", handleKeyPress);
});

function handleButtonPress(key) {
  if (!isNaN(key) || key === ".") {
    handleNumber(key);
  } else {
    handleOperator(key);
  }
}

function handleNumber(num) {
  currentNumber += num;
  output.innerText = currentNumber;
}

function handleOperator(operator) {
  switch (operator) {
    case "+":
    case "-":
    case "*":
    case "/":
      performCalculation();
      currentOperator = operator;
      break;
    case "=":
      performCalculation();
      currentOperator = "";
      break;
    case "AC":
      currentNumber = "";
      storedNumber = "";
      currentOperator = "";
      output.innerText = "0";
      break;
    case "sqrt":
      currentNumber = Math.sqrt(parseFloat(currentNumber)).toString();
      output.innerText = currentNumber;
      break;
    case "pow":
      currentNumber = Math.pow(parseFloat(currentNumber), 2).toString();
      output.innerText = currentNumber;
      break;
    case "MC":
      memory = 0;
      break;
    case "M+":
      memory += parseFloat(currentNumber);
      break;
    case "M-":
      memory -= parseFloat(currentNumber);
      break;
    case "MR":
      currentNumber = memory.toString();
      output.innerText = currentNumber;
      break;
  }
}

function performCalculation() {
  if (!storedNumber || !currentOperator) {
    storedNumber = currentNumber;
    currentNumber = "";
    return;
  }

  switch (currentOperator) {
    case "+":
      storedNumber = (
        parseFloat(storedNumber) + parseFloat(currentNumber)
      ).toString();
      break;
    case "-":
      storedNumber = (
        parseFloat(storedNumber) - parseFloat(currentNumber)
      ).toString();
      break;
    case "*":
      storedNumber = (
        parseFloat(storedNumber) * parseFloat(currentNumber)
      ).toString();
      break;
    case "/":
      if (currentNumber === "0") {
        alert("Error: Division by zero is not allowed");
      } else {
        storedNumber = (
          parseFloat(storedNumber) / parseFloat(currentNumber)
        ).toString();
      }
      break;
  }

  output.innerText = storedNumber;
  currentNumber = "";
}

function handleKeyPress(event) {
  const key = event.key;
  if (!isNaN(key) || key === ".") {
    handleButtonPress(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    handleOperator(key);
  } else if (key === "Enter") {
    handleOperator("=");
  } else if (key === "Backspace") {
    currentNumber = currentNumber.slice(0, -1);
    output.innerText = currentNumber;
  }
}

const clear = document.getElementById("clear");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const subtract = document.getElementById("subtract");
const add = document.getElementById("add");
const equals = document.getElementById("equals");
const decimal = document.getElementById("decimal");
const zero = document.getElementById("zero");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const display = document.getElementById("display-container");
const displayHistory = document.getElementById("display-history");
const displayText = document.getElementById("display");

let currentNumber = "";
let currentOperator = null;
let history = "";
let result = 0;
let isEqualsClicked = false;

const handleNumberClick = (number) => {
  if (currentNumber.length > 10) return;
  if (isEqualsClicked) {
    history = "";
    displayHistory.innerText = history;
    isEqualsClicked = false;
  }
  if (currentNumber === "0" && number === "0") return;
  currentNumber += number;
  displayText.innerText = currentNumber;
  history += number;
  displayHistory.innerText = history;
};

const handleOperatorClick = (operator) => {
  if (isEqualsClicked) {
    history = result;
    history += operator;
    displayHistory.innerText = history;
    currentNumber = "";
    currentOperator = operator;
    displayText.innerText = currentOperator;
    isEqualsClicked = false;
  } else {
    if (history.endsWith(".")) {
      history = history.slice(0, -1);
      displayHistory.innerText = history;
    }
    if (
      (history.endsWith("+") ||
        history.endsWith("-") ||
        history.endsWith("*") ||
        history.endsWith("/"))
    ) {
      if (currentOperator === operator) return;
      if (operator === "-") {
        currentNumber = "-";
        currentOperator = operator;
        history += operator;
        displayHistory.innerText = history;
        displayText.innerText = currentOperator;
        return
      }
      if (
        history[history.length - 2] === "+" ||
        history[history.length - 2] === "-" ||
        history[history.length - 2] === "*" ||
        history[history.length - 2] === "/"
      ) {
        history = history.slice(0, -1);
        displayHistory.innerText = history;
      }
      currentNumber = "";
      currentOperator = operator;
      history = history.slice(0, -1) + operator;
      displayHistory.innerText = history;
      displayText.innerText = currentOperator;
    } else {
      if (currentOperator === operator) return;
      currentNumber = "";
      currentOperator = operator;
      history += operator;
      displayHistory.innerText = history;
      displayText.innerText = currentOperator;
    }
  }
};

const handleDecimalClick = () => {
  if (isEqualsClicked) {
    history = "";
    displayHistory.innerText = history;
    isEqualsClicked = false;
  }
  if (currentNumber) {
    if (!currentNumber.includes(".")) {
      currentNumber += ".";
      history += ".";
      displayText.innerText = currentNumber;
      displayHistory.innerText = history;
    } else return;
  } else {
    currentNumber = "0.";
    history += "0.";
    displayText.innerText = currentNumber;
    displayHistory.innerText = history;
  }
};

const handleEqualsClick = () => {
  currentNumber = "";
  if (
    history.endsWith("+") ||
    history.endsWith("-") ||
    history.endsWith("*") ||
    history.endsWith("/")
  ) {
    history = history.slice(0, -1);
  }
  if (
    history.includes("+") ||
    history.includes("-") ||
    history.includes("*") ||
    history.includes("/")
  ) {
    result = eval(history);
    displayText.innerText = result;
    displayHistory.innerText = history + "=" + result;
    history = result;
  } else {
    displayText.innerText = history;
    displayHistory.innerText = history;
  }
  isEqualsClicked = true;
};

const handleClearClick = () => {
  currentNumber = "";
  currentOperator = null;
  history = "";
  result = 0;
  displayText.innerText = "0";
  displayHistory.innerText = "0";
  isEqualsClicked = false;
};

zero.addEventListener("click", () => handleNumberClick("0"));
one.addEventListener("click", () => handleNumberClick("1"));
two.addEventListener("click", () => handleNumberClick("2"));
three.addEventListener("click", () => handleNumberClick("3"));
four.addEventListener("click", () => handleNumberClick("4"));
five.addEventListener("click", () => handleNumberClick("5"));
six.addEventListener("click", () => handleNumberClick("6"));
seven.addEventListener("click", () => handleNumberClick("7"));
eight.addEventListener("click", () => handleNumberClick("8"));
nine.addEventListener("click", () => handleNumberClick("9"));

add.addEventListener("click", () => handleOperatorClick("+"));
subtract.addEventListener("click", () => handleOperatorClick("-"));
multiply.addEventListener("click", () => handleOperatorClick("*"));
divide.addEventListener("click", () => handleOperatorClick("/"));

decimal.addEventListener("click", () => handleDecimalClick());
equals.addEventListener("click", () => handleEqualsClick());
clear.addEventListener("click", () => handleClearClick());

import $ from "jquery";
import { calculatorState } from "./state";
import { operatorMap } from "../constants/operationMap";

export const updateDisplay = (showFullExpression = false) => {
  if (showFullExpression && calculatorState.operation && !calculatorState.resetScreen) {
    $("#display").text(
      `${calculatorState.previousInput} ${calculatorState.operation} ${calculatorState.currentInput}`
    );
  } else {
    $("#display").text(calculatorState.currentInput);
  }
};

export const calculate = () => {
  let result;
  const prev = parseFloat(calculatorState.previousInput);
  const current = parseFloat(calculatorState.currentInput);

  if (isNaN(prev)) return false;

  switch (calculatorState.operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "÷":
      result = current !== 0 ? prev / current : "Inf";
      break;
    case "mod":
      result = prev % current;
      break;
    default:
      return false;
  }

  calculatorState.currentInput = result.toString();
  calculatorState.resetScreen = true;
  updateDisplay();
  return true;
};

export const setupKeyboardInput = () => {
  document.addEventListener("keydown", (e) => {
    const key = e.key;
    let button = null;

    if (key >= "0" && key <= "9") {
      button = $(`.number:contains('${key}')`).first();
    } else if (Object.keys(operatorMap).includes(key)) {
      const operatorSymbol = operatorMap[key];
      button = $(`.operator:contains('${operatorSymbol}')`)
        .not("#backspace, #pi, #square, #sqrt, #percent, #log")
        .first();
    } else {
      switch (key) {
        case "Enter":
        case "=":
          button = $("#equals");
          break;
        case "Escape":
          button = $("#clear");
          break;
        case "Backspace":
          button = $("#backspace");
          break;
        case ".":
        case ",":
          button = $("#decimal");
          break;
        case "p":
        case "P":
          if (!e.ctrlKey) button = $("#pi");
          break;
        case "^":
          button = $("#square");
          break;
        case "s":
        case "S":
          button = $("#sqrt");
          break;
        case "l":
        case "L":
          button = $("#log");
          break;
      }
    }

    if (button && button.length) {
      e.preventDefault();
      button.trigger("click");
    }
  });
};

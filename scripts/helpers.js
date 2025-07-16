import $ from "jquery";
import { calculatorState } from "./state";
import { operatorMap } from "../constants/operationMap";

export function updateDisplay(showFullExpression = false) {
  if (showFullExpression && calculatorState.operation && !calculatorState.resetScreen) {
    $("#display").text(
      `${calculatorState.previousInput} ${calculatorState.operation} ${calculatorState.currentInput}`
    );
  } else {
    $("#display").text(calculatorState.currentInput);
  }
}

export function calculate() {
  let result;
  const prev = parseFloat(calculatorState.previousInput);
  const current = parseFloat(calculatorState.currentInput);
  console.log(prev, current);

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
    case "/":
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
}

export const setupKeyboardInput = () => {
  document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key === "Shift") return;

    if (/^[0-9]$/.test(key)) {
      const number = key;
      if (calculatorState.currentInput === "0" || calculatorState.resetScreen) {
        calculatorState.currentInput = number;
        calculatorState.resetScreen = false;
      } else {
        calculatorState.currentInput += number;
      }
      updateDisplay(true);
      return;
    }

    if (operatorMap[key]) {
      const operatorId = operatorMap[key];
      const operatorElement = $(`#${operatorId}`);

      if (operatorElement.length) {
        operatorElement.trigger("click");
        if (key === "*") {
          calculatorState.operation = "×";
        }
        updateDisplay(true);
      }
      return;
    }

    switch (key) {
      case ".":
        $("#decimal").trigger("click");
        updateDisplay(true);
        break;
      case "Enter":
        $("#equals").trigger("click");
        break;
      case "Backspace":
        $("#backspace").trigger("click");
        updateDisplay(true);
        break;
      case "Escape":
        $("#clear").trigger("click");
        break;
    }
  });
};

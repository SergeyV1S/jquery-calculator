import $ from "jquery";
import { calculatorState } from "./state";
import { updateDisplay, calculate, setupKeyboardInput } from "./helpers";

$(function () {
  $(".number").on("click", function () {
    const number = $(this).text();
    if (calculatorState.currentInput === "0" || calculatorState.resetScreen) {
      calculatorState.currentInput = number;
      calculatorState.resetScreen = false;
    } else {
      calculatorState.currentInput += number;
    }
    updateDisplay(true);
  });

  $(".operator")
    .not("#backspace, #pi")
    .on("click", function () {
      if (calculatorState.operation !== null) {
        if (calculate()) {
          calculatorState.previousInput = calculatorState.currentInput;
          calculatorState.operation = $(this).text();
          calculatorState.resetScreen = true;
          updateDisplay();
          return;
        }
      }
      calculatorState.previousInput = calculatorState.currentInput;
      calculatorState.operation = $(this).text();
      calculatorState.resetScreen = true;
      updateDisplay(true);
    });

  $("#square").on("click", function () {
    calculatorState.currentInput = Math.pow(parseFloat(calculatorState.currentInput), 2).toString();
    updateDisplay();
  });

  $("#sqrt").on("click", function () {
    const num = parseFloat(calculatorState.currentInput);
    calculatorState.currentInput = num >= 0 ? Math.sqrt(num).toString() : "Ошибка";
    updateDisplay();
  });

  $("#pi").on("click", function () {
    calculatorState.currentInput = Math.PI.toString();
    updateDisplay();
  });

  $("#percent").on("click", function () {
    calculatorState.currentInput = (parseFloat(calculatorState.currentInput) / 100).toString();
    updateDisplay();
  });

  $("#log").on("click", function () {
    const num = parseFloat(calculatorState.currentInput);
    calculatorState.currentInput = num > 0 ? Math.log10(num).toString() : "Ошибка";
    updateDisplay();
  });

  $("#clear").on("click", function () {
    calculatorState.reset();
    updateDisplay();
  });

  $("#backspace").on("click", function () {
    if (calculatorState.currentInput.length === 1) {
      calculatorState.currentInput = "0";
    } else {
      calculatorState.currentInput = calculatorState.currentInput.slice(0, -1);
    }
    updateDisplay();
  });

  $("#decimal").on("click", function () {
    if (calculatorState.resetScreen) {
      calculatorState.currentInput = "0.";
      calculatorState.resetScreen = false;
      updateDisplay();
      return;
    }
    if (!calculatorState.currentInput.includes(".")) {
      calculatorState.currentInput += ".";
      updateDisplay();
    }
  });

  $("#equals").on("click", function () {
    calculate();
  });

  setupKeyboardInput();
  updateDisplay();
});

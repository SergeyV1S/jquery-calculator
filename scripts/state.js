class CalculatorState {
  constructor() {
    this._currentInput = "0";
    this._previousInput = "";
    this._operation = null;
    this._resetScreen = false;
  }

  get currentInput() {
    return this._currentInput;
  }

  get previousInput() {
    return this._previousInput;
  }

  get operation() {
    return this._operation;
  }

  get resetScreen() {
    return this._resetScreen;
  }

  set currentInput(value) {
    this._currentInput = value;
  }

  set previousInput(value) {
    this._previousInput = value;
  }

  set operation(value) {
    this._operation = value;
  }

  set resetScreen(value) {
    this._resetScreen = value;
  }

  reset() {
    this._currentInput = "0";
    this._previousInput = "";
    this._operation = null;
    this._resetScreen = false;
  }
}

export const calculatorState = new CalculatorState();

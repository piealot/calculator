import { useReducer } from 'react';
import './App.css';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  EVALUATE: 'evaluate'

}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.override) {
        return {
          ...state,
          override: false,
          currentOperand: payload.digit
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes(".")) return state;
      if (state.currentOperand === "0" && payload.digit !== ".") {
        return {
          ...state,
          currentOperand: payload.digit
        }
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CLEAR:
      return { currentOperand: "0" };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        if (payload.operation == "-") {
          return {
            ...state,
            currentOperand: "-"
          };
        } else {
          return {
            ...state,
            operation: payload.operation
          }
        }
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null

      }
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
        return state;
      }

      return {
        ...state,
        previousOperand: null,
        overrride: true,
        operation: null,
        currentOperand: evaluate(state)
      }
    default:
      return state;
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "X":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

function Calculator() {

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, { currentOperand: "0" });

  return (
    <div className="calculator">
      <div id='previousOperand'>{previousOperand} {operation}</div>
      <div id="display">{currentOperand}</div>
      <div className="buttons">
        <div
          onClick={() => dispatch({ type: ACTIONS.CLEAR, })}
          id="clear" className="button">AC</div>
        <OperationButton dispatch={dispatch} operation={"/"} />
        <OperationButton dispatch={dispatch} operation={"X"} />
        <DigitButton dispatch={dispatch} digit={"7"} />
        <DigitButton dispatch={dispatch} digit={"8"} />
        <DigitButton dispatch={dispatch} digit={"9"} />
        <OperationButton dispatch={dispatch} operation={"-"} />
        <DigitButton dispatch={dispatch} digit={"4"} />
        <DigitButton dispatch={dispatch} digit={"5"} />
        <DigitButton dispatch={dispatch} digit={"6"} />
        <OperationButton dispatch={dispatch} operation={"+"} />
        <DigitButton dispatch={dispatch} digit={"1"} />
        <DigitButton dispatch={dispatch} digit={"2"} />
        <DigitButton dispatch={dispatch} digit={"3"} />
        <div
          onClick={() => dispatch({ type: ACTIONS.EVALUATE, })}
          id="equals" className="button">=</div>
        <DigitButton dispatch={dispatch} digit={"0"} />
        <DigitButton dispatch={dispatch} digit={"."} /></div>


    </div>
  );
}

export function getIdName(type) {
  switch (type) {
    case "0":
      return "zero";
    case "1":
      return "one";
    case "2":
      return "two";
    case "3":
      return "three";
    case "4":
      return "four";
    case "5":
      return "five";
    case "6":
      return "six";
    case "7":
      return "seven";
    case "8":
      return "eight";
    case "9":
      return "nine";
    case "=":
      return "equals";
    case "AC":
      return "clear";
    case "+":
      return "add";
    case "-":
      return "subtract";
    case "X":
      return "multiply";
    case "/":
      return "divide";
    case ".":
      return "decimal";
    default:
      return undefined;
  }
}

export default Calculator;

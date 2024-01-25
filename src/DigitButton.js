import { ACTIONS } from "./App"
import { getIdName } from "./App"

export default function DigitButton({ dispatch, digit }) {
    return <div
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
        id={getIdName(digit)} className="button">{digit}</div>
}
import { ACTIONS } from "./App"
import { getIdName } from "./App"

export default function OperationButton({ dispatch, operation }) {
    return <div
        onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
        id={getIdName(operation)} className="button">{operation}</div>
}
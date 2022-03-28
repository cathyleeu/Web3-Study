import { CountProvider, useCount } from "./count-context";

function Counter() {
  const {state, increment} = useCount()
  return <button onClick={increment}>{state.count}</button>
}

function CountDisplay() {
  const {state} = useCount()
  return <div>The current counter count is {state.count}</div>
}

function CountPage() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default CountPage;
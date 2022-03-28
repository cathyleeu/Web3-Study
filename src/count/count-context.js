import { createContext, useState, useReducer, useMemo, useContext } from "react";

const CountContext = createContext();


function countReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': {
      return {count: state.count + 1}
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

function CountProvider(props) {
  // const [count, setCount] = useState(0) 
  // const value = useMemo(() => [count, setCount], [count])
  // return <CountContext.Provider value={value} {...props} />
  // -> useReducer 로 변경할 수 있음 
  const [state, dispatch] = useReducer(countReducer, {count: 0})
  const value = useMemo(() => [state, dispatch], [state])
  return <CountContext.Provider value={value} {...props} /> 
}

function useCount() {
  // hook 상태를 업데이트 하기 위한 공통 로직을 넣을 수 있다. 
  const context = useContext(CountContext);
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`)
  }
  // const [count, setCount] = context;
  // const increment = () => setCount(c => c++);

  // Reducer 로 넘길 경우
  const [state, dispatch] = context
  const increment = () => dispatch({type: 'INCREMENT'})

  return {
    state,
    dispatch,
    increment
  }
}

export { CountProvider, useCount }
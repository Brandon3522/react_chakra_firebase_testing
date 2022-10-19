import { createContext, useContext, useReducer } from "react";

// React context API
// Create data layer
export const StateContext = createContext();

// Wrap application and provide data layer
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

// Pull info from data layer
export const useStateValue = () => useContext(StateContext)
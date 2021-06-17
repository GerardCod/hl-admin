import React, { createContext, useReducer } from 'react';
import ActivityReducer, { initialState } from '../reducers/ActivityReducer';

const ActivityContext = createContext();

const ActivityProvider = ({children}) => {
  const [state, dispatch] = useReducer(ActivityReducer, initialState);

  const childrenProps = { state };

  return (
    <ActivityContext.Provider value={childrenProps}>
      { children }
    </ActivityContext.Provider>
  );
}

export default ActivityProvider;
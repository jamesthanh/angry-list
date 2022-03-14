import React, { useReducer, createContext, useCallback } from 'react';

import initialState from './initialState';
import id from 'uuid/v4';

export const GrudeContext = createContext();

const GRUDE_ADD = 'GRUDE_ADD';
const GRUDE_FORGIVE = 'GRUDE_FORGIVE';

const reducer = (state, action) => {
  if (action.type === GRUDE_ADD) {
    return [action.payload, ...state];
  }

  if (action.type === GRUDE_FORGIVE) {
    return state.map((grudge) => {
      if (grudge.id !== action.payload.id) return grudge;
      return { ...grudge, forgiven: !grudge.forgiven };
    });
  }

  return state;
};

export const GrudeProvider = ({ children }) => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = useCallback(
    ({ person, reason }) => {
      // grudge.id = id();
      // grudge.forgiven = false;
      // setGrudges([grudge, ...grudges]);
      dispatch({
        type: GRUDE_ADD,
        payload: {
          person,
          reason,
          forgive: false,
          id: id()
        }
      });
    },
    [dispatch]
  );

  const toggleForgiveness = useCallback(
    (id) => {
      // setGrudges(
      //   grudges.map((grudge) => {
      //     if (grudge.id !== id) return grudge;
      //     return { ...grudge, forgiven: !grudge.forgiven };
      //   })
      // );
      dispatch({
        type: GRUDE_FORGIVE,
        payload: { id }
      });
    },
    [dispatch]
  );

  const values = { grudges, addGrudge, toggleForgiveness };
  return (
    <GrudeContext.Provider value={values}>{children}</GrudeContext.Provider>
  );
};

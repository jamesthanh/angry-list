import React, { useReducer, useCallback } from 'react';

import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';

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

const Application = () => {
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

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;

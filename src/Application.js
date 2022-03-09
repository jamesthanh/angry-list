import React, { useReducer } from 'react';

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
  return state;
};

const Application = () => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = ({ person, reason }) => {
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
  };

  const toggleForgiveness = (id) => {
    // setGrudges(
    //   grudges.map((grudge) => {
    //     if (grudge.id !== id) return grudge;
    //     return { ...grudge, forgiven: !grudge.forgiven };
    //   })
    // );
  };

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;

import React from 'react';
import { GrudeContext } from './GrudeContext';

const Grudge = React.memo(({ grudge }) => {
  const { toggleForgiveness } = React.useContext(GrudeContext);
  const forgive = () => toggleForgiveness(grudge.id);
  console.log('Redering Grude', grudge.id);

  return (
    <article className="Grudge">
      <h3>{grudge.person}</h3>
      <p>{grudge.reason}</p>
      <div className="Grudge-controls">
        <label className="Grudge-forgiven">
          <input type="checkbox" checked={grudge.forgiven} onChange={forgive} />{' '}
          Forgiven
        </label>
      </div>
    </article>
  );
});

export default Grudge;

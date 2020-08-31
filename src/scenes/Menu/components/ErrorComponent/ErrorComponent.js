import React from 'react';
import './ErrorComponent.scss';

export function Errorcomponent({ message }) {
  return (
    <div className="errorTxtContainer">
      <h1>Whoops! Something is wrong!</h1>
      {message}
    </div>
  );
}

import React from 'react';

export const ValueContainer = props => {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
};

ValueContainer.propTypes = {};
ValueContainer.defaultProps = {};

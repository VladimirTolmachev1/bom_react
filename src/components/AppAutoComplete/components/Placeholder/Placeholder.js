import React from 'react';
import Typography from '@material-ui/core/Typography';

export const Placeholder = props => {
  return (
    <Typography
      {...props.innerProps}
      variant="subtitle1"
      className={props.selectProps.classes.placeholder}>
      {props.children}
    </Typography>
  );
};

Placeholder.propTypes = {};
Placeholder.defaultProps = {};

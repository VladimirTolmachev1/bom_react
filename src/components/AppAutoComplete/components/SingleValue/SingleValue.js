import React from 'react';
import Typography from '@material-ui/core/Typography';

export const SingleValue = props => {
  return (
    <Typography
      {...props.innerProps}
      variant="subtitle1"
      className={props.selectProps.classes.singleValue}>
      {props.children}
    </Typography>
  );
};

SingleValue.propTypes = {};
SingleValue.defaultProps = {};

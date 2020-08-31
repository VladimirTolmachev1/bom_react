import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export const NoOptionsMessage = props => {
  return (
    <Typography
      {...props.innerProps}
      variant="subtitle1"
      className={props.selectProps.classes.noOptionsMessage}>
      {props.children}
    </Typography>
  );
};

NoOptionsMessage.propTypes = {
  selectProps: PropTypes.any,
};
NoOptionsMessage.defaultProps = {};

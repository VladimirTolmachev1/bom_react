import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

export const MenuAutocomplete = ({ selectProps, innerProps, children }) => {
  return (
    <Paper square className={selectProps.classes.paper} {...innerProps}>
      {children}
    </Paper>
  );
};

MenuAutocomplete.propTypes = {
  selectProps: PropTypes.any,
};
MenuAutocomplete.defaultProps = {};

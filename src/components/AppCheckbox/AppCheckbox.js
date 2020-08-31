import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import './AppCheckbox.scss';

export const AppCheckbox = ({ value, label, onChange }) => {
  return (
    <FormControlLabel
      className="app-checkbox__wrapper"
      control={
        <Checkbox
          className="app-checkbox__control"
          checked={Boolean(value)}
          onChange={onChange}
        />
      }
      label={label}
    />
  );
};

AppCheckbox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};
AppCheckbox.defaultProps = {};

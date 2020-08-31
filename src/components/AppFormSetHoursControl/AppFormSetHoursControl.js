import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { FormControl, FormLabel, withStyles } from '@material-ui/core';

import styles from './styles';
import { TIME_FORMAT, DEFAULT_MOMENT_FORMAT } from '../../constants';

const defaultTimeValue = moment()
  .hours(8)
  .minutes(0);

const handleChange = reduxFormChangeHandler => time => {
  reduxFormChangeHandler(time ? time.format() : '');
};

const formatValue = val => {
  if (!val) return null;
  return moment(val, [DEFAULT_MOMENT_FORMAT, TIME_FORMAT]);
};

export const AppFormSetHoursControl = ({
  input,
  meta,
  label,
  classes,
  ...rest
}) => (
  <FormControl className={classes.timepickerWrapper}>
    <FormLabel className={classes.timepickerLabel}>{label}</FormLabel>

    <TimePicker
      {...input}
      use12Hours
      inputReadOnly
      format={TIME_FORMAT}
      showSecond={false}
      defaultOpenValue={defaultTimeValue}
      onChange={handleChange(input.onChange)}
      value={formatValue(input.value)}
      minuteStep={5}
      {...rest}
    />
  </FormControl>
);

AppFormSetHoursControl.propTypes = {
  label: PropTypes.node.isRequired,

  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,

  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,

  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppFormSetHoursControl);

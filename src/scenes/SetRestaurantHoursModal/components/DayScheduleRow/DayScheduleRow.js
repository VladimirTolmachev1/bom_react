import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import FormLabel from '@material-ui/core/FormLabel';
import { autobind } from 'core-decorators';

import './DayScheduleRow.scss';
import {
  AppFormSetHoursControl,
  AppSelect,
  AppFormCheckbox,
} from '../../../../components';

export class DayScheduleRow extends PureComponent {
  state = {
    sameDay: '',
  };

  @autobind
  onChangeSelect({ sameDay }) {
    const { setSameDay, starName } = this.props;
    this.setState({ sameDay });
    setSameDay({
      sameDay,
      group: starName
        .split('.')
        .slice()
        .join('.'),
    });
  }

  render() {
    const {
      label,
      starName,
      endName,
      closedName,
      daysOptions,
      isClosed,
    } = this.props;
    const { sameDay } = this.state;

    return (
      <div className="day-schedule-row">
        <FormLabel className="short-day-name">{label}</FormLabel>
        <AppSelect
          onChange={this.onChangeSelect}
          value={sameDay}
          disabled={isClosed}
          className="day-schedule-row__same-day"
          name="sameDay"
          label="Set the same day"
          variant="outlined"
          options={daysOptions}
        />
        <Field
          name={starName}
          disabled={isClosed}
          label={label}
          component={AppFormSetHoursControl}
        />
        <Field
          name={endName}
          disabled={isClosed}
          label={label}
          component={AppFormSetHoursControl}
        />
        <Field
          className="day-schedule-row__closed"
          name={closedName}
          label="Closed"
          component={AppFormCheckbox}
        />
      </div>
    );
  }
}

DayScheduleRow.propTypes = {
  label: PropTypes.string,
  starName: PropTypes.string,
  endName: PropTypes.string,
  setSameDay: PropTypes.func,
};
DayScheduleRow.defaultProps = {};

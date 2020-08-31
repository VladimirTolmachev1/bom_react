/* eslint-disable react/jsx-no-bind */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { DatePicker } from 'material-ui-pickers';
import moment from 'moment';

import './AppDateRange.scss';

export class AppDateRange extends PureComponent {
  onChange(startName, value) {
    const { onChange } = this.props;

    let date = value === null ? new Date() : value.toDate();
    date = moment(date).format('YYYY-MM-DD');
    onChange({ [startName]: date });
  }

  render() {
    const { startDate, endDate, label, startName, endName } = this.props;

    return (
      <div className="app-date-range-container ">
        <DatePicker
          keyboard
          clearable
          name={startName}
          className="app-date-range-control"
          label={`${label} start date`}
          value={startDate}
          onChange={this.onChange.bind(this, startName)}
          animateYearScrolling={false}
        />
        <DatePicker
          keyboard
          clearable
          name={endName}
          className="app-date-range-control"
          label={`${label} end date`}
          value={endDate}
          onChange={this.onChange.bind(this, endName)}
          animateYearScrolling={false}
        />
      </div>
    );
  }
}

AppDateRange.propTypes = {
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  startName: PropTypes.string,
  endName: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

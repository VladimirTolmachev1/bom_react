import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';

import { AppSelect } from '../../../../components';
import { HelperService } from '../../../../services';
import { DayScheduleRow } from '../DayScheduleRow';

import './TabContent.scss';

export class TabContent extends Component {
  state = {
    copiedGroup: '',
  };

  @autobind
  onChangeCopyFromTab({ copiedGroup }) {
    const { copyHoursFromPreviousTab, hoursGroup } = this.props;

    this.setState({ copiedGroup });
    copyHoursFromPreviousTab({ copiedGroup, hoursGroup });
  }

  getTabSelectOptions() {
    const { hoursGroup } = this.props;

    return ['working', 'away', 'delivery', 'pickup']
      .filter(group => group !== hoursGroup)
      .map(group => ({ value: group, name: HelperService.capitalize(group) }));
  }

  render() {
    const { hours, setSameDay, daysOptions, hoursGroup } = this.props;
    const { copiedGroup } = this.state;

    const rows = daysOptions.map((day, index) => {
      const isClosed = Boolean(
        hours &&
          hours[hoursGroup] &&
          hours[hoursGroup][day.value] &&
          hours[hoursGroup][day.value].isClosed,
      );

      return (
        <DayScheduleRow
          isClosed={isClosed}
          daysOptions={daysOptions.filter(
            dayOption => dayOption.value !== day.value,
          )}
          setSameDay={setSameDay}
          key={index}
          starName={`hours.${hoursGroup}.${day.value}.start`}
          endName={`hours.${hoursGroup}.${day.value}.end`}
          closedName={`hours.${hoursGroup}.${day.value}.isClosed`}
          label={day.value}
        />
      );
    });

    return (
      <Fragment>
        <AppSelect
          onChange={this.onChangeCopyFromTab}
          value={copiedGroup}
          className="set-hours__copy-tab-select"
          name="copiedGroup"
          label="Copy from tab"
          variant="outlined"
          options={this.getTabSelectOptions()}
        />
        {rows}
      </Fragment>
    );
  }
}

TabContent.propTypes = {
  hoursGroup: PropTypes.string,
  hours: PropTypes.any,
  setSameDay: PropTypes.func,
  daysOptions: PropTypes.array,
  copyHoursFromPreviousTab: PropTypes.func,
};

TabContent.defaultProps = {};

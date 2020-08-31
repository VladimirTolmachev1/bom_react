import moment from 'moment';
import { TIME_FORMAT, DEFAULT_MOMENT_FORMAT } from '../../constants';

export class DateTimeService {
  static oneDayInMs = 1000 * 60 * 60 * 24;

  static formatTime(time, config = {}) {
    const {
      invalidTime = invalidTime => invalidTime,
      format = TIME_FORMAT,
      noTime = '',
    } = config;

    if (!time) return noTime;

    const resultTime = moment(time, [format, DEFAULT_MOMENT_FORMAT]);

    if (!resultTime._isValid) {
      return typeof invalidTime === 'function'
        ? invalidTime(resultTime)
        : invalidTime;
    }

    return resultTime.format(format);
  }

  static daysBetween(date1, date2, options = {}) {
    const { abs = false } = options;

    // Convert both dates to milliseconds
    const date1InMs = date1.getTime();
    const date2InMs = date2.getTime();

    // Calculate the difference in milliseconds
    const differenceInMs = date2InMs - date1InMs;

    // calculate days difference
    let differenceInDays = Math.round(differenceInMs / this.oneDayInMs);

    if (abs) {
      differenceInDays = Math.abs(differenceInDays);
    }

    return differenceInDays;
  }
}

import { createSelector } from 'reselect';

export const setRestaurantHoursModalLoadingSelector = state =>
  state.SetRestaurantHoursModal.loading;
export const setRestaurantHoursModalOpenSelector = state =>
  state.SetRestaurantHoursModal.open;
export const setRestaurantHoursModalInitialValuesSelector = state =>
  state.SetRestaurantHoursModal.initialValues;
export const setRestaurantHoursModalIdSelector = state =>
  state.SetRestaurantHoursModal.id;

export const daysOptionsSelector = createSelector(() => {
  return [
    {
      value: 'Mon',
      name: 'Monday',
    },
    {
      value: 'Tue',
      name: 'Tuesday',
    },
    {
      value: 'Wed',
      name: 'Wednesday',
    },
    {
      value: 'Thu',
      name: 'Thursday',
    },
    {
      value: 'Fri',
      name: 'Friday',
    },
    {
      value: 'Sat',
      name: 'Saturday',
    },
    {
      value: 'Sun',
      name: 'Sunday',
    },
  ];
});

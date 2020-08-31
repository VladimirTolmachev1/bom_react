import {
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_ERROR,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_ID_ERROR,
} from '../../../modules/restaurants';

export const TOGGLE_SET_RESTAURANTS_HOURS_MODAL =
  'set-restaurant-hour-modal/toggle';
export const CLEAR_MODAL_DATA = 'set-restaurant-hour-modal/clear-data';
export const SET_SAME_DAY = 'set-restaurant-hour-modal/set-same-day';
export const SET_SAME_TAB = 'set-restaurant-hour-modal/set-same-tab';

export const getInitialState = () => ({
  loading: false,
  initialValues: {},
  error: null,
  open: false,
  id: null,
});

export function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case UPDATE_RESTAURANT_REQUEST:
    case GET_RESTAURANT_BY_ID_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case CLEAR_MODAL_DATA: {
      return {
        ...state,
        initialValues: {},
      };
    }

    case GET_RESTAURANT_BY_ID_SUCCESS: {
      return {
        ...state,
        initialValues: action.response,
        loading: false,
      };
    }

    case UPDATE_RESTAURANT_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case GET_RESTAURANT_BY_ID_ERROR:
    case UPDATE_RESTAURANT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case TOGGLE_SET_RESTAURANTS_HOURS_MODAL: {
      const { id, open } = action;
      return {
        ...state,
        open,
        id,
      };
    }

    default: {
      return state;
    }
  }
}

export function setHoursReducerPlugin(state, action) {
  switch (action.type) {
    case SET_SAME_DAY: {
      const hoursGroup = action.body.group.split('.')[1];
      const day = action.body.group.split('.')[2];

      return {
        ...state,
        values: {
          ...state.values,
          hours: {
            ...state.values.hours,
            [hoursGroup]: {
              ...(state.values.hours && state.values.hours[hoursGroup]),
              [day]:
                state.values.hours &&
                state.values.hours[hoursGroup] &&
                state.values.hours[hoursGroup][action.body.sameDay],
            },
          },
        },
      };
    }
    case SET_SAME_TAB: {
      const { copiedGroup, hoursGroup } = action;

      return {
        ...state,
        values: {
          ...state.values,
          hours: {
            ...state.values.hours,
            [hoursGroup]: state.values.hours[copiedGroup],
          },
        },
      };
    }
    default:
      return state;
  }
}

export function toggleSetRestaurantHoursModal({ id, open }) {
  return {
    type: TOGGLE_SET_RESTAURANTS_HOURS_MODAL,
    id,
    open,
  };
}

export function clearModalData() {
  return {
    type: CLEAR_MODAL_DATA,
  };
}

export function setSameDay(body) {
  return {
    type: SET_SAME_DAY,
    body,
  };
}

export function copyHoursFromPreviousTab({ copiedGroup, hoursGroup }) {
  return {
    type: SET_SAME_TAB,
    copiedGroup,
    hoursGroup,
  };
}

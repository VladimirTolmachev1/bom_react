import {
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_ERROR,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_ERROR,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_ID_ERROR,
} from '../../../modules/restaurants';
import { CALL_API } from '../../../store/middleware/api';

export const resource = 'restaurant-modal';

export const SET_RESTAURANTS_MODAL_MODE = `${resource}/setMode`;
export const TOGGLE_RESTAURANTS_MODAL = `${resource}/toggle`;
export const CLEAR_MODAL_DATA = `${resource}/clear-data`;

export const POSTALCODE_REQUEST = `${resource}/postalcode/request`;
export const POSTALCODE_SUCCESS = `${resource}/postalcode/success`;
export const POSTALCODE_ERROR = `${resource}/postalcode/error`;

export const getInitialState = () => ({
  loading: false,
  initialValues: {},
  error: null,
  open: false,
  id: null,
  mode: 'create',
});

export function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case CREATE_RESTAURANT_REQUEST:
    case UPDATE_RESTAURANT_REQUEST:
    case GET_RESTAURANT_BY_ID_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case CREATE_RESTAURANT_SUCCESS:
    case UPDATE_RESTAURANT_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case CLEAR_MODAL_DATA: {
      return getInitialState();
    }

    case GET_RESTAURANT_BY_ID_SUCCESS: {
      return {
        ...state,
        initialValues: action.response,
        loading: false,
      };
    }

    case TOGGLE_RESTAURANTS_MODAL: {
      return {
        ...state,
        initialValues: {},
        open: action.open,
      };
    }

    case SET_RESTAURANTS_MODAL_MODE: {
      const { mode, ...rest } = action;

      return {
        ...state,
        mode,
        ...rest,
      };
    }

    case CREATE_RESTAURANT_ERROR:
    case UPDATE_RESTAURANT_ERROR:
    case GET_RESTAURANT_BY_ID_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}

export function getInfoByPostalCode() {
  return {
    type: CALL_API,
    request: {
      method: 'GET',
      endpoint: `/api/zipcode`,
      types: [POSTALCODE_REQUEST, POSTALCODE_SUCCESS, POSTALCODE_ERROR],
    },
  };
}

export function setMode({ mode, ...rest }) {
  return {
    type: SET_RESTAURANTS_MODAL_MODE,
    mode,
    ...rest,
  };
}

export function toggleRestaurantsModal(open) {
  return {
    type: TOGGLE_RESTAURANTS_MODAL,
    open,
  };
}

export function clearModalData() {
  return {
    type: CLEAR_MODAL_DATA,
  };
}

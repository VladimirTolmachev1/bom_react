import { API_REQUESTS_ABORT } from '../../../modules/core';
import { CALL_API } from '../../../store/middleware/api';

export const resource = '/cuisine';

export const CUISINE_LIST_AUTOCOMPLETE_REQUEST = `${resource}/request`;
export const CUISINE_LIST_AUTOCOMPLETE_SUCCESS = `${resource}/success`;
export const CUISINE_LIST_AUTOCOMPLETE_ERROR = `${resource}/error`;
export const CUISINE_LIST_AUTOCOMPLETE_FILTERS_CHANGED = `${resource}/filters/changed`;
export const CUISINE_LIST_AUTOCOMPLETE_SET_PAGE = `${resource}/filters/set-page`;
export const CUISINE_LIST_AUTOCOMPLETE_CLEAR = `${resource}/clear`;

const getInitialState = () => ({
  loading: false,
  error: null,
  filters: {
    name: '',
    page: 1,
    limit: 10,
  },
  data: [],
  count: 0,
});

export const reducer = {
  name: resource,
  [resource](state = getInitialState(), action) {
    switch (action.type) {
      case CUISINE_LIST_AUTOCOMPLETE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CUISINE_LIST_AUTOCOMPLETE_SUCCESS:
        return {
          ...state,
          count: Number(action.response.count),
          data: state.data.concat(action.response.data),
          loading: false,
        };
      case CUISINE_LIST_AUTOCOMPLETE_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
        };
      case CUISINE_LIST_AUTOCOMPLETE_CLEAR: {
        return getInitialState();
      }
      case CUISINE_LIST_AUTOCOMPLETE_SET_PAGE:
        return {
          ...state,
          page: action.page,
        };
      case CUISINE_LIST_AUTOCOMPLETE_FILTERS_CHANGED:
        return {
          ...state,
          data: [],
          filters: {
            ...state.filters,
            ...action.filters,
          },
        };
      default:
        return state;
    }
  },
};

export function getCuisinesForAutocomplete(body) {
  return {
    type: CALL_API,
    request: {
      method: 'GET',
      endpoint: '/cuisine',
      types: [
        CUISINE_LIST_AUTOCOMPLETE_REQUEST,
        CUISINE_LIST_AUTOCOMPLETE_SUCCESS,
        CUISINE_LIST_AUTOCOMPLETE_ERROR,
      ],
      ...body,
    },
  };
}

export function updateFilters(filters) {
  return {
    type: CUISINE_LIST_AUTOCOMPLETE_FILTERS_CHANGED,
    filters,
  };
}

export function abortPageRequests() {
  return {
    type: API_REQUESTS_ABORT,
    requestTypes: [CUISINE_LIST_AUTOCOMPLETE_REQUEST],
  };
}

export function setPage(page) {
  return {
    type: CUISINE_LIST_AUTOCOMPLETE_SET_PAGE,
    page,
  };
}

export function clearAutocomplete() {
  return {
    type: CUISINE_LIST_AUTOCOMPLETE_CLEAR,
  };
}

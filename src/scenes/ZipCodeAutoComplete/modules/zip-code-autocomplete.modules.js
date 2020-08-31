import { API_REQUESTS_ABORT } from '../../../modules/core';
import { CALL_API } from '../../../store/middleware/api';

export const resource = '/dish/zipcode';

export const ZIPCODE_LIST_AUTOCOMPLETE_REQUEST = `${resource}/request`;
export const ZIPCODE_LIST_AUTOCOMPLETE_SUCCESS = `${resource}/success`;
export const ZIPCODE_LIST_AUTOCOMPLETE_ERROR = `${resource}/error`;
export const ZIPCODE_LIST_AUTOCOMPLETE_FILTERS_CHANGED = `${resource}/filters/changed`;
export const ZIPCODE_LIST_AUTOCOMPLETE_SET_PAGE = `${resource}/filters/set-page`;
export const ZIPCODE_LIST_AUTOCOMPLETE_CLEAR = `${resource}/clear`;

const getInitialState = () => ({
  loading: false,
  error: null,
  filters: {
    search: '',
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
      case ZIPCODE_LIST_AUTOCOMPLETE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ZIPCODE_LIST_AUTOCOMPLETE_SUCCESS:
        return {
          ...state,
          count: Number(action.response.count),
          data: state.data.concat(action.response.data),
          loading: false,
        };
      case ZIPCODE_LIST_AUTOCOMPLETE_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
        };
      case ZIPCODE_LIST_AUTOCOMPLETE_CLEAR: {
        return getInitialState();
      }
      case ZIPCODE_LIST_AUTOCOMPLETE_SET_PAGE:
        return {
          ...state,
          page: action.page,
        };
      case ZIPCODE_LIST_AUTOCOMPLETE_FILTERS_CHANGED:
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

export function getZipcodesForAutocomplete(body) {
  return {
    type: CALL_API,
    request: {
      method: 'GET',
      endpoint: '/zipcode',
      types: [
        ZIPCODE_LIST_AUTOCOMPLETE_REQUEST,
        ZIPCODE_LIST_AUTOCOMPLETE_SUCCESS,
        ZIPCODE_LIST_AUTOCOMPLETE_ERROR,
      ],
      ...body,
    },
  };
}

export function updateFilters(filters) {
  return {
    type: ZIPCODE_LIST_AUTOCOMPLETE_FILTERS_CHANGED,
    filters,
  };
}

export function abortPageRequests() {
  return {
    type: API_REQUESTS_ABORT,
    requestTypes: [ZIPCODE_LIST_AUTOCOMPLETE_REQUEST],
  };
}

export function setPage(page) {
  return {
    type: ZIPCODE_LIST_AUTOCOMPLETE_SET_PAGE,
    page,
  };
}

export function clearAutocomplete() {
  return {
    type: ZIPCODE_LIST_AUTOCOMPLETE_CLEAR,
  };
}

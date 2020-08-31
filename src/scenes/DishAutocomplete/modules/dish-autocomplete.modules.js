import { API_REQUESTS_ABORT } from '../../../modules/core/core.types';
import { CALL_API } from '../../../store/middleware/api';

export const resource = '/dish/autocomplete';

export const DISH_LIST_AUTOCOMPLETE_REQUEST = `${resource}/request`;
export const DISH_LIST_AUTOCOMPLETE_SUCCESS = `${resource}/success`;
export const DISH_LIST_AUTOCOMPLETE_ERROR = `${resource}/error`;
export const DISH_LIST_AUTOCOMPLETE_FILTERS_CHANGED = `${resource}/filters/changed`;
export const DISH_LIST_AUTOCOMPLETE_SET_PAGE = `${resource}/filters/set-page`;
export const DISH_LIST_AUTOCOMPLETE_CLEAR = `${resource}/clear`;

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
      case DISH_LIST_AUTOCOMPLETE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DISH_LIST_AUTOCOMPLETE_SUCCESS:
        return {
          ...state,
          count: Number(action.response.count),
          data: state.data.concat(action.response.data),
          loading: false,
        };
      case DISH_LIST_AUTOCOMPLETE_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
        };
      case DISH_LIST_AUTOCOMPLETE_CLEAR: {
        return getInitialState();
      }
      case DISH_LIST_AUTOCOMPLETE_SET_PAGE:
        return {
          ...state,
          page: action.page,
        };
      case DISH_LIST_AUTOCOMPLETE_FILTERS_CHANGED:
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

export function getDishesForAutocomplete(body) {
  return {
    type: CALL_API,
    request: {
      method: 'GET',
      endpoint: '/dish',
      types: [
        DISH_LIST_AUTOCOMPLETE_REQUEST,
        DISH_LIST_AUTOCOMPLETE_SUCCESS,
        DISH_LIST_AUTOCOMPLETE_ERROR,
      ],
      ...body,
    },
  };
}

export function updateFilters(filters) {
  return {
    type: DISH_LIST_AUTOCOMPLETE_FILTERS_CHANGED,
    filters,
  };
}

export function abortPageRequests() {
  return {
    type: API_REQUESTS_ABORT,
    requestTypes: [DISH_LIST_AUTOCOMPLETE_REQUEST],
  };
}

export function setPage(page) {
  return {
    type: DISH_LIST_AUTOCOMPLETE_SET_PAGE,
    page,
  };
}

export function clearAutocomplete() {
  return {
    type: DISH_LIST_AUTOCOMPLETE_CLEAR,
  };
}

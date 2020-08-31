import { ReduxCrudService } from '../../../services';
import { API_REQUESTS_ABORT } from '../../../modules/core';

export const resource = '/agent';

export const {
  GET: [
    GET_AGENTS_LIST_REQUEST,
    GET_AGENTS_LIST_SUCCESS,
    GET_AGENTS_LIST_ERROR,
  ],
} = ReduxCrudService.getActionCrudTypes(resource);

export const AGENTS_LIST_FILTERS_CHANGED = `${resource}/filters/changed`;

const getInitialState = () => ({
  loading: false,
  error: null,
  filters: {
    name: '',
  },
  data: [],
  count: 0,
});

export const reducer = {
  name: resource,
  [resource](state = getInitialState(), action) {
    switch (action.type) {
      case GET_AGENTS_LIST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_AGENTS_LIST_SUCCESS:
        return {
          ...state,
          count: Number(action.response.count),
          data: action.response.data,
          loading: false,
        };
      case GET_AGENTS_LIST_ERROR:
        return {
          ...state,
          error: action.error,
          loading: false,
        };
      case AGENTS_LIST_FILTERS_CHANGED:
        return {
          ...state,
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

export const getAgents = ReduxCrudService.resourceAction({
  resource,
  method: 'GET',
});

export function updateFilters(filters) {
  return {
    type: AGENTS_LIST_FILTERS_CHANGED,
    filters,
  };
}

export function abortPageRequests() {
  return {
    type: API_REQUESTS_ABORT,
    requestTypes: [GET_AGENTS_LIST_REQUEST],
  };
}

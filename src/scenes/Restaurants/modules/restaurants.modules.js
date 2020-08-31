import { ReduxCrudService } from '/services';
import { API_REQUESTS_ABORT } from '/modules/core/core.modules';
import { CALL_API } from 'store/middleware/api';

export const resource = '/restaurant';

export const {
  GET: [
    GET_RESTAURANTS_LIST_REQUEST,
    GET_RESTAURANTS_LIST_SUCCESS,
    GET_RESTAURANTS_LIST_ERROR,
  ],
  POST: [
    CREATE_RESTAURANT_REQUEST,
    CREATE_RESTAURANT_SUCCESS,
    CREATE_RESTAURANT_ERROR,
  ],
  GET_BY_ID: [
    GET_RESTAURANT_BY_ID_REQUEST,
    GET_RESTAURANT_BY_ID_SUCCESS,
    GET_RESTAURANT_BY_ID_ERROR,
  ],
  PATCH: [
    UPDATE_RESTAURANT_REQUEST,
    UPDATE_RESTAURANT_SUCCESS,
    UPDATE_RESTAURANT_ERROR,
  ],
  DELETE: [
    DELETE_RESTAURANT_REQUEST,
    DELETE_RESTAURANT_SUCCESS,
    DELETE_RESTAURANT_ERROR,
  ],
} = ReduxCrudService.getActionCrudTypes(resource);

export const BLOCK_RESTAURANT_REQUEST = `${resource}/block/request`;
export const BLOCK_RESTAURANT_SUCCESS = `${resource}/block/success`;
export const BLOCK_RESTAURANT_ERROR = `${resource}/block/error`;

export const CLEANUP_RESTAURANTS_PAGE = `${resource}/cleanup`;
export const RESTAURANTS_LIST_FILTERS_CHANGED = `${resource}/filters/changed`;
export const RESTAURANTS_LIST_FILTERS_CLEAR = `${resource}/filters/clear`;

export const getInitialFilters = () => ({
  search: '',
  limit: 10,
  sort_field: 'name',
  sort_order: 'desc',
  cuisine: '',
  revenue: '',
  subscription: '',
  deliveryMethod: '',
  status: '',
  agent_name: '',
  onboardingPeriodStart: null,
  onboardingPeriodEnd: null,
  page: 1,
});

const getInitialState = () => ({
  loading: false,
  error: null,
  filters: getInitialFilters(),
  data: [],
  count: 0,
  managedRestaurant: {},
});

export const reducer = {
  name: resource,
  [resource](state = getInitialState(), action = {}) {
    switch (action.type) {
      case GET_RESTAURANTS_LIST_REQUEST:
      case DELETE_RESTAURANT_REQUEST:
      case BLOCK_RESTAURANT_REQUEST:
      case UPDATE_RESTAURANT_REQUEST:
      case GET_RESTAURANT_BY_ID_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_RESTAURANTS_LIST_SUCCESS:
      case BLOCK_RESTAURANT_SUCCESS:
      case UPDATE_RESTAURANT_SUCCESS:
        return {
          ...state,
          count: Number(action.response.count) || 0,
          data: action.response.data || [],
          managedRestaurant: action.response,
          loading: false,
        };
      case GET_RESTAURANTS_LIST_ERROR:
        return {
          ...state,
          loading: false,
          error: action.error,
        };

      case RESTAURANTS_LIST_FILTERS_CLEAR: {
        return {
          ...state,
          filters: getInitialFilters(),
        };
      }
      case DELETE_RESTAURANT_SUCCESS:
      case DELETE_RESTAURANT_ERROR:
      case UPDATE_RESTAURANT_ERROR:
      case BLOCK_RESTAURANT_ERROR: {
        return {
          ...state,
          loading: false,
        };
      }
      case RESTAURANTS_LIST_FILTERS_CHANGED:
        return {
          ...state,
          filters: {
            ...state.filters,
            ...action.filters,
          },
        };
      case GET_RESTAURANT_BY_ID_ERROR:
        return {
          ...state,
          loading: false,
          error: action.error.status,
        };
      case CLEANUP_RESTAURANTS_PAGE:
        return getInitialState();

      case GET_RESTAURANT_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          managedRestaurant: action.response,
        };
      }

      default:
        return state;
    }
  },
};

export const getRestaurants = ReduxCrudService.resourceAction({
  resource,
  method: 'GET',
});

export const getRestaurantById = ReduxCrudService.resourceAction({
  resource,
  method: 'GET',
  byId: true,
});

export const createRestaurant = ReduxCrudService.resourceAction({
  resource,
  method: 'POST',
  logger: {
    success: 'Restaurant was successful created',
    error: 'Error during restaurant creation',
  },
});

export const updateRestaurant = ReduxCrudService.resourceAction({
  resource,
  method: 'PATCH',
  logger: {
    success: 'Restaurant was successful updated',
    error: 'Error during restaurant update',
  },
});

export const deleteRestaurant = ReduxCrudService.resourceAction({
  resource,
  method: 'DELETE',
  logger: {
    success: 'Restaurant was successful deleted',
    error: 'Error during restaurant delete',
  },
});

export function blockRestaurant(body) {
  return {
    type: CALL_API,
    request: {
      method: 'POST',
      endpoint: '/restaurant/block',
      types: [
        BLOCK_RESTAURANT_REQUEST,
        BLOCK_RESTAURANT_SUCCESS,
        BLOCK_RESTAURANT_ERROR,
      ],
      logger: {
        success: 'Restaurant was successfully blocked',
        error: 'Error during restaurant blocking',
      },
      body,
      // then: window.location.reload()
    },
  };
}

export function updateFilters(filters) {
  return {
    type: RESTAURANTS_LIST_FILTERS_CHANGED,
    filters,
  };
}

export function clearFilters() {
  return {
    type: RESTAURANTS_LIST_FILTERS_CLEAR,
  };
}

export function cleanup() {
  return {
    type: CLEANUP_RESTAURANTS_PAGE,
  };
}

export function abortPageRequests() {
  return {
    type: API_REQUESTS_ABORT,
    requestTypes: [
      GET_RESTAURANTS_LIST_REQUEST,
      CREATE_RESTAURANT_REQUEST,
      GET_RESTAURANT_BY_ID_REQUEST,
      UPDATE_RESTAURANT_REQUEST,
    ],
  };
}

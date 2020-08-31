import {
  GET_RESTAURANTS_LIST_REQUEST,
  GET_RESTAURANTS_LIST_SUCCESS,
  GET_RESTAURANTS_LIST_ERROR,
  CREATE_RESTAURANT_SUCCESS,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_ID_ERROR,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_ERROR,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_ERROR,
  BLOCK_RESTAURANT_REQUEST,
  BLOCK_RESTAURANT_SUCCESS,
  BLOCK_RESTAURANT_ERROR,
  CLEANUP_RESTAURANTS_PAGE,
  RESTAURANTS_LIST_FILTERS_CHANGED,
  RESTAURANTS_LIST_FILTERS_CLEAR,
  RESTAURANTS__CLEAR_MANAGED_RESTAURANT,
  RESTAURANTS__SET_MANAGED_RESTAURANT,
  GET_RESTAURANT_FOR_CLIENT_REQUEST,
  GET_RESTAURANT_FOR_CLIENT_SUCCESS,
  GET_RESTAURANT_FOR_CLIENT_ERROR,
} from './restaurants.types';

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

export function restaurantsReducer(state = getInitialState(), action) {
  switch (action.type) {
    case RESTAURANTS__SET_MANAGED_RESTAURANT: {
      return {
        ...state,
        managedRestaurant: action.payload,
      };
    }

    case RESTAURANTS__CLEAR_MANAGED_RESTAURANT: {
      return {
        ...state,
        managedRestaurant: {},
      };
    }

    case GET_RESTAURANT_FOR_CLIENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        managedRestaurant: action.payload,
      };
    }

    case GET_RESTAURANT_BY_ID_SUCCESS: {
      return {
        ...state,
        loading: false,
        managedRestaurant: action.response,
      };
    }

    case GET_RESTAURANT_FOR_CLIENT_REQUEST:
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

    case CREATE_RESTAURANT_SUCCESS: {
      return {
        ...state,
        count: state.count + 1,
        loading: false,
        data: [...state.data, action.response],
      };
    }

    case DELETE_RESTAURANT_SUCCESS: {
      return {
        ...state,
        count: state.count - 1,
        loading: false,
        data: state.data.filter(({ id }) => id !== action.body.id),
      };
    }

    case RESTAURANTS_LIST_FILTERS_CLEAR: {
      return {
        ...state,
        filters: getInitialFilters(),
      };
    }

    case GET_RESTAURANT_FOR_CLIENT_ERROR:
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

    default:
      return state;
  }
}

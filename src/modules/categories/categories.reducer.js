import {
  GET_CATEGORY_LIST_REQUEST,
  GET_CATEGORY_LIST_SUCCESS,
  GET_CATEGORY_LIST_ERROR,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR,
  GET_CATEGORY_BY_ID_REQUEST,
  GET_CATEGORY_BY_ID_SUCCESS,
  GET_CATEGORY_BY_ID_ERROR,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
  PATCH_CATEGORY_EXTRAS_REQUEST,
  PATCH_CATEGORY_EXTRAS_SUCCESS,
  PATCH_CATEGORY_EXTRAS_ERROR,
  SET_CATEGORY_FILTERS,
  CLEANUP_CATEGORIES,
  CHANGE_CATEGORIES_ORDERING,
  CLEAR_MANAGED_CATEGORY,
} from './categories.types';

const getInitialState = () => ({
  loading: false,
  error: null,
  filters: {
    restaurant_id: '',
  },
  data: [],
  count: 0,
  managedCategory: {},
});

const changeCategoriesOrdering = (categories, idsWithOrder) =>
  categories
    .map(item => {
      const targetObj = idsWithOrder.find(({ id }) => id === item.id);

      if (!targetObj) return item;

      return {
        ...item,
        order: targetObj.order,
      };
    })
    .sort((c1, c2) => +c1.order - +c2.order);

export function categoriesReducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case GET_CATEGORY_BY_ID_SUCCESS: {
      return {
        ...state,
        loading: false,
        managedCategory: action.response,
      };
    }

    case PATCH_CATEGORY_EXTRAS_SUCCESS: {
      return {
        ...state,
        loading: false,
        managedCategory: {
          ...state.managedCategory,
          extras: action.payload.extras || [],
          extra_lists: action.payload.extra_lists || [],
        },
      };
    }

    case CLEAR_MANAGED_CATEGORY: {
      return {
        ...state,
        managedCategory: {},
      };
    }

    case CREATE_CATEGORY_SUCCESS: {
      return {
        ...state,
        count: state.count + 1,
        data: [...state.data, action.payload],
      };
    }

    case PATCH_CATEGORY_EXTRAS_REQUEST:
    case GET_CATEGORY_BY_ID_REQUEST:
    case GET_CATEGORY_LIST_REQUEST:
    case DELETE_CATEGORY_REQUEST:
    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CHANGE_CATEGORIES_ORDERING: {
      return {
        ...state,
        data: changeCategoriesOrdering(state.data, action.payload.idsWithOrder),
      };
    }

    case GET_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        count: Number(action.response.count),
        data: action.response.data,
        loading: false,
      };

    case GET_CATEGORY_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case SET_CATEGORY_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.filters,
        },
      };

    case UPDATE_CATEGORY_SUCCESS: {
      const updatedCategory = action.payload;
      return {
        ...state,
        loading: false,
        data: state.data.map(category =>
          category.id === updatedCategory.id ? updatedCategory : category,
        ),
      };
    }

    case DELETE_CATEGORY_SUCCESS: {
      return {
        ...state,
        count: state.count - 1,
        loading: false,
        data: state.data.filter(({ id }) => id !== action.body.id),
      };
    }

    case CLEANUP_CATEGORIES: {
      return getInitialState();
    }

    case PATCH_CATEGORY_EXTRAS_ERROR:
    case GET_CATEGORY_BY_ID_ERROR:
    case CREATE_CATEGORY_ERROR:
    case DELETE_CATEGORY_ERROR:
    case UPDATE_CATEGORY_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
}

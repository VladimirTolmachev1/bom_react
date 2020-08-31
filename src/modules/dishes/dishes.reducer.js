import {
  GET_DISH_LIST_REQUEST,
  GET_DISH_LIST_SUCCESS,
  GET_DISH_LIST_ERROR,
  DELETE_DISH_REQUEST,
  DELETE_DISH_SUCCESS,
  DELETE_DISH_ERROR,
  CREATE_DISH_SUCCESS,
  UPDATE_DISH_SUCCESS,
  PATCH_DISH_EXTRAS_REQUEST,
  PATCH_DISH_EXTRAS_SUCCESS,
  PATCH_DISH_EXTRAS_ERROR,
  PATCH_DISH_SIZES_REQUEST,
  PATCH_DISH_SIZES_SUCCESS,
  PATCH_DISH_SIZES_ERROR,
  SET_DISH_FILTERS,
  SET_DISH_PAGE,
  CLEANUP_DISH,
  CLEAN_DISH_LIST,
  CHANGE_DICHES_ORDERING,
  DISHES__GET_BY_ID_REQUEST,
  DISHES__GET_BY_ID_SUCCESS,
  DISHES__GET_BY_ID_ERROR,
} from './dishes.types';

const getInitialState = () => ({
  loading: false,

  isSidngleDishLoading: false,
  error: null,

  count: 0,

  byId: {},
  allIds: [],
  managed: null,

  filters: {
    category_id: '',
    page: 1,
    limit: 10,
  },
});

const setOrderToDishesByIds = (byIds, idsWithOrderArr) => {
  const modifiedByIds = { ...byIds };

  idsWithOrderArr.forEach(({ id, order }) => {
    if (modifiedByIds[id]) {
      modifiedByIds[id].order = +order;
    }
  });

  return modifiedByIds;
};

export function dishesReducer(state = getInitialState(), action) {
  switch (action.type) {
    case PATCH_DISH_EXTRAS_REQUEST:
    case PATCH_DISH_SIZES_REQUEST:
    case DISHES__GET_BY_ID_REQUEST: {
      return {
        ...state,
        isSidngleDishLoading: true,
      };
    }

    case PATCH_DISH_EXTRAS_SUCCESS: {
      return {
        ...state,
        isSidngleDishLoading: false,
        byId: {
          ...state.byId,
          [action.payload.item_id]: {
            ...state.byId[action.payload.item_id],
            extras: action.payload.extras || [],
            extra_lists: action.payload.extra_lists || [],
          },
        },
      };
    }

    case PATCH_DISH_SIZES_SUCCESS: {
      return {
        ...state,
        isSidngleDishLoading: false,
        byId: {
          ...state.byId,
          [action.payload.item_id]: {
            ...state.byId[action.payload.item_id],
            sizes: action.payload.sizes,
          },
        },
      };
    }

    case DISHES__GET_BY_ID_SUCCESS: {
      return {
        ...state,
        mamaged: action.payload.id,
        isSidngleDishLoading: false,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    }

    case PATCH_DISH_EXTRAS_ERROR:
    case PATCH_DISH_SIZES_ERROR:
    case DISHES__GET_BY_ID_ERROR: {
      return {
        ...state,
        isSidngleDishLoading: false,
      };
    }

    case GET_DISH_LIST_REQUEST:
    case DELETE_DISH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_DISH_LIST_SUCCESS: {
      return {
        ...state,
        count: Number(action.response.count),
        byId: {
          ...state.byId,
          ...(action.response.byId || {}),
        },
        allIds: [...state.allIds, ...(action.response.allIds || [])],
        loading: false,
      };
    }

    case CREATE_DISH_SUCCESS: {
      return {
        ...state,
        count: state.count + 1,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
        allIds: [...state.allIds, action.payload.id],
        loading: false,
      };
    }

    case DELETE_DISH_SUCCESS: {
      const { id } = action.body;
      const { [id]: deleted, ...restById } = state.byId;

      return {
        ...state,
        count: state.count - 1,
        byId: restById,
        allIds: state.allIds.filter(curId => +curId !== +id),
        loading: false,
      };
    }

    case CHANGE_DICHES_ORDERING: {
      const { idsWithOrder } = action.payload;
      return {
        ...state,
        allIds: idsWithOrder.map(({ id }) => id),
        byId: setOrderToDishesByIds(state.byId, idsWithOrder),
      };
    }

    case UPDATE_DISH_SUCCESS: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    }

    case SET_DISH_FILTERS: {
      return {
        ...state,
        // data: [], maybe need to clear dishes ?
        filters: {
          page: 1,
          ...state.filters,
          ...action.filters,
        },
      };
    }

    case CLEANUP_DISH: {
      return getInitialState();
    }

    case CLEAN_DISH_LIST: {
      return {
        ...state,
        filters: {
          category_id: '',
          page: 1,
          limit: 10,
        },
        byId: {},
        allIds: [],
      };
    }

    case SET_DISH_PAGE: {
      return {
        ...state,
        filters: {
          ...state.filters,
          page: action.page,
        },
      };
    }

    case GET_DISH_LIST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case DELETE_DISH_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
}

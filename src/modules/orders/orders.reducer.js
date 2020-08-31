import {
  SET_UPDATED_ORDER_IN_STORE_DIRECTLY,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  UPDATE_ORDER_SUCCESS,
  CHECKOUT__CREATE_ORDER_REQUEST,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR,
  GET_ORDERS_TOTAL_INFO_SUCCESS,
  SET_ORDERS_TOTAL,
} from './orders.types';

const initialState = {
  byId: {},
  total: {
    ordersCompleted: 0,
    revenue: 0,
  },
  allIds: [],
  managed: null,
  isOrdersListLoading: false,
  isOrderLoading: false,
};

export function ordersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        isOrderLoading: false,
        byId: {
          ...state.byId,
          [payload.id]: payload,
        },
        allIds: [payload.id, ...state.allIds],
      };
    }
    case GET_ORDERS_SUCCESS: {
      return {
        ...state,
        ...payload,
        isOrdersListLoading: false,
      };
    }

    case UPDATE_ORDER_SUCCESS: {
      const { id } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: { ...payload },
        },
      };
    }

    case SET_ORDERS_TOTAL: {
      const { newRevenue, newOrdersCompleted } = payload;
      return {
        ...state,
        total: {
          revenue: newRevenue,
          ordersCompleted: newOrdersCompleted,
        },
      };
    }

    case SET_UPDATED_ORDER_IN_STORE_DIRECTLY: {
      const { id } = payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            ...payload,
          },
        },
      };
    }

    case GET_ORDERS_TOTAL_INFO_SUCCESS: {
      return {
        ...state,
        total: {
          ordersCompleted: payload.total_orders,
          revenue: payload.total_revenue,
        },
      };
    }

    case GET_ORDERS_REQUEST: {
      return {
        ...state,
        isOrdersListLoading: true,
      };
    }

    case GET_ORDERS_ERROR: {
      return {
        ...state,
        isOrdersListLoading: false,
      };
    }

    case CHECKOUT__CREATE_ORDER_REQUEST:
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        isOrderLoading: true,
      };
    }

    case CREATE_ORDER_ERROR: {
      return {
        ...state,
        isOrderLoading: false,
      };
    }

    default:
      return state;
  }
}

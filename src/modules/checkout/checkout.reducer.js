import { combineReducers } from 'redux';

import {
  CHECKOUT__BULK_SAVE,
  CHECKOUT__CREATE_NEW_ITEM,
  CHECKOUT__INCREASE_ITEM_AMOUNT,
  CHECKOUT__REMOVE_ITEM,
  CHECKOUT__CLEAR,
  CREATE_CHARGE_REQUEST,
  CREATE_CHARGE_SUCCESS,
  CREATE_CHARGE_ERROR,
  CHECKOUT__RESTORE_FROM_STORAGE,
  CHECKOUT__SET_UI,
  CHECKOUT__UPDATE_ITEM,
} from './checkout.types';

const initialState = {
  itemsByUuids: {},
  allUuids: [],
  uuidsByItemDecriptors: {},
  charge: {
    stripeTransactionId: null,
    isLoading: false,
  },
  ui: {
    activeStep: 0,
  },
};

export function ui(state = initialState.ui, { type, payload }) {
  switch (type) {
    case CHECKOUT__SET_UI: {
      return {
        ...state,
        ...payload,
      };
    }

    default:
      return state;
  }
}

const removeDescriptorByUuid = (uuidsByDescriptors, uuid) => {
  const toDelete = Object.keys(uuidsByDescriptors).find(
    descriptor => uuidsByDescriptors[descriptor] === uuid,
  );

  const { [toDelete]: removed, ...withourRemover } = uuidsByDescriptors;

  return withourRemover;
};

function allUuids(state = initialState.allUuids, { type, payload }) {
  switch (type) {
    case CHECKOUT__CREATE_NEW_ITEM: {
      return [...state, payload.uuid];
    }

    case CHECKOUT__REMOVE_ITEM: {
      return state.filter(id => id !== payload);
    }

    case CHECKOUT__CLEAR: {
      return initialState.allUuids;
    }

    case CHECKOUT__BULK_SAVE:
    case CHECKOUT__RESTORE_FROM_STORAGE: {
      return payload.allUuids;
    }

    default:
      return state;
  }
}

function itemsByUuids(state = initialState.itemsByUuids, { type, payload }) {
  switch (type) {
    case CHECKOUT__CREATE_NEW_ITEM: {
      return {
        ...state,
        [payload.uuid]: payload,
      };
    }

    case CHECKOUT__UPDATE_ITEM: {
      return {
        ...state,
        [payload.uuid]: payload,
      };
    }

    case CHECKOUT__REMOVE_ITEM: {
      const { [payload]: removedItem, ...newState } = state;
      return newState;
    }

    case CHECKOUT__INCREASE_ITEM_AMOUNT: {
      return {
        ...state,
        [payload.uuid]: {
          ...state[payload.uuid],
          amount: state[payload.uuid].amount + payload.amountToAdd,
        },
      };
    }

    case CHECKOUT__CLEAR: {
      return initialState.itemsByUuids;
    }

    case CHECKOUT__BULK_SAVE:
    case CHECKOUT__RESTORE_FROM_STORAGE: {
      return payload.itemsByUuids;
    }

    default:
      return state;
  }
}

function uuidsByItemDecriptors(
  state = initialState.uuidsByItemDecriptors,
  { type, payload },
) {
  switch (type) {
    case CHECKOUT__CREATE_NEW_ITEM: {
      return {
        ...state,
        [payload.descriptor]: payload.uuid,
      };
    }

    case CHECKOUT__REMOVE_ITEM: {
      return removeDescriptorByUuid(state, payload);
    }

    case CHECKOUT__CLEAR: {
      return initialState.uuidsByItemDecriptors;
    }

    case CHECKOUT__BULK_SAVE:
    case CHECKOUT__RESTORE_FROM_STORAGE: {
      return payload.uuidsByItemDecriptors;
    }

    default:
      return state;
  }
}

function charge(state = initialState.charge, action) {
  switch (action.type) {
    case CREATE_CHARGE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        stripeTransactionId: action.response.transaction_id,
      };
    }
    case CREATE_CHARGE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CREATE_CHARGE_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    default:
      return state;
  }
}

export const checkoutReducer = combineReducers({
  itemsByUuids,
  uuidsByItemDecriptors,
  allUuids,
  charge,
  ui,
});

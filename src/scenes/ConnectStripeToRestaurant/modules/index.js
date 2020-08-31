import { ReduxCrudService } from '../../../services';

const SET_STRIPE_CONNECTING_ERROR_MESSAGE =
  'SET_STRIPE_CONNECTING_ERROR_MESSAGE';

const CONNECTING_TO_STRIPE_ERR_MSG =
  'Some error has occured while connecting your restaurant to stripe';

export const resource = '/stripe/authorize';

export const {
  POST: [
    CONNECT_STRIPE_TO_RESTAURANT_REQUEST,
    CONNECT_STRIPE_TO_RESTAURANT_SUCCESS,
    CONNECT_STRIPE_TO_RESTAURANT_ERROR,
  ],
} = ReduxCrudService.getActionCrudTypes(resource);

export const isStripeConnectingSelector = state =>
  state.stripeConnection.isLoading;
export const stripeConnectionErrorSelector = state =>
  state.stripeConnection.infoMessage;

export const connectStripeToResourant = ReduxCrudService.resourceAction({
  resource,
  method: 'POST',
});

const initialState = {
  infoMessage: null,
  isLoading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_STRIPE_TO_RESTAURANT_SUCCESS: {
      return {
        ...state,
        infoMessage: '',
        isLoading: false,
      };
    }

    case CONNECT_STRIPE_TO_RESTAURANT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case SET_STRIPE_CONNECTING_ERROR_MESSAGE: {
      return {
        ...state,
        infoMessage: action.payload,
      };
    }

    case CONNECT_STRIPE_TO_RESTAURANT_ERROR: {
      return {
        ...state,
        isLoading: false,
        infoMessage: CONNECTING_TO_STRIPE_ERR_MSG,
      };
    }

    default:
      return state;
  }
};

export const setStripeConnectionErrorMessage = msg => ({
  type: SET_STRIPE_CONNECTING_ERROR_MESSAGE,
  payload: msg,
});

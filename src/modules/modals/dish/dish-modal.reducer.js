import {
  DISH_MODAL__SET_STATE,
  DISH_MODAL__FULLY_CLEAR,
} from './dish-modal.types';
import { dishModalStepsValues } from './dish-modal.utils';

const initialState = {
  open: false,
  dishId: null,
  activeStep: dishModalStepsValues.INFO,
  isEditing: false,
};

export function dishModalReducer(state = initialState, action) {
  switch (action.type) {
    case DISH_MODAL__SET_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case DISH_MODAL__FULLY_CLEAR: {
      return { ...initialState };
    }

    default:
      return state;
  }
}

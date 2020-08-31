import {
  CATEGORY_MODAL__SET_STATE,
  CATEGORY_MODAL__FULLY_CLEAR,
} from './category-modal.types';

const initialState = {
  open: false,
  categoryId: null,
  activeStep: 0,
  isEditing: false,
};

export function categoryModalReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_MODAL__SET_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case CATEGORY_MODAL__FULLY_CLEAR: {
      return { ...initialState };
    }

    default:
      return state;
  }
}

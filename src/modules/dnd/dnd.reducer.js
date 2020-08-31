import { CATEGORIES_DROPPABLE, DISHES_DROPPABLE } from './dnd.constants';

import {
  RESET_DND,
  DND_ITEMS_REORDERED,
  INITIALIZE_DROPPABLE,
  SET_DND_STATE_FOR_DROPPABLE,
  TOGGLE_DND_MODE_FOR_DROPPABLE,
} from './dnd.types';

// setDndStateForDroppable
const initialState = {
  [CATEGORIES_DROPPABLE]: {
    dragItems: [],
    isDndMode: false,
  },

  [DISHES_DROPPABLE]: {
    dragItems: [],
    isDndMode: false,
  },
};

export function dndReducer(state = initialState, { type, payload }) {
  switch (type) {
    case DND_ITEMS_REORDERED: {
      return {
        ...state,
        [payload.droppableId]: {
          ...state[payload.droppableId],
          dragItems: payload.reorderedItems,
        },
      };
    }

    case INITIALIZE_DROPPABLE: {
      const { droppableId, dragItems, isDndMode } = payload;
      return {
        ...state,
        [droppableId]: {
          dragItems,
          isDndMode,
        },
      };
    }

    case TOGGLE_DND_MODE_FOR_DROPPABLE: {
      const { droppableId } = payload;
      return {
        ...state,
        [droppableId]: {
          ...state[droppableId],
          isDndMode: !state[droppableId].isDndMode,
        },
      };
    }

    case SET_DND_STATE_FOR_DROPPABLE: {
      return {
        ...state,
        [payload.droppableId]: {
          ...state[payload.droppableId],
          ...payload,
        },
      };
    }

    case RESET_DND: {
      return initialState;
    }

    default:
      return state;
  }
}

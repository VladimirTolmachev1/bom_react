import {
  DND_DRAG_END,
  DND_ITEMS_REORDERED,
  INITIALIZE_DROPPABLE,
  TOGGLE_DND_MODE_FOR_DROPPABLE,
  MENU_RESTAURATOR__SAVE_MENU_ITEMS_REORDERING,
  RESET_DND,
} from './dnd.types';

export const toggleDndModForDroppable = droppableId => ({
  type: TOGGLE_DND_MODE_FOR_DROPPABLE,
  payload: { droppableId },
});

export const initializeDroppable = (droppableId, dragItems, isDndMode) => ({
  type: INITIALIZE_DROPPABLE,
  payload: { droppableId, dragItems, isDndMode },
});

export const dndDragEnd = dndResult => ({
  type: DND_DRAG_END,
  payload: { dndResult },
});

export const dndItemsReordered = (droppableId, reorderedItems) => ({
  type: DND_ITEMS_REORDERED,
  payload: { droppableId, reorderedItems },
});

export const saveMenuItemsReordering = () => ({
  type: MENU_RESTAURATOR__SAVE_MENU_ITEMS_REORDERING,
});

export const resetDnd = () => ({ type: RESET_DND });

import { CATEGORIES_DROPPABLE, DISHES_DROPPABLE } from './dnd.constants';

export const itemsByDroppableIdSelector = ({ dnd }, droppable) =>
  (dnd[droppable] || {}).dragItems;

export const isCategoriesInDndModeSelector = ({ dnd }) =>
  dnd[CATEGORIES_DROPPABLE].isDndMode;
export const isDishesInDndModeSelector = ({ dnd }) =>
  dnd[DISHES_DROPPABLE].isDndMode;

export const dndCategoriesSelector = ({ dnd }) =>
  dnd[CATEGORIES_DROPPABLE].dragItems;
export const dndDishesSelector = ({ dnd }) => dnd[DISHES_DROPPABLE].dragItems;

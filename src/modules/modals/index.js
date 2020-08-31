import { combineReducers } from 'redux';
import { dishOrderModalReducer } from './dish-order';
import { categoryModalReducer } from './category';
import { dishModalReducer } from './dish';
import { restauratorOrderModalReducer } from './restaurator-order';

export const modalsReducer = combineReducers({
  dishOrder: dishOrderModalReducer,
  category: categoryModalReducer,
  dish: dishModalReducer,
  restauratorOrder: restauratorOrderModalReducer,
});

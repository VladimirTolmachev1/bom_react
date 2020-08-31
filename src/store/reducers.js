import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as Form } from 'redux-form';

import { reducer as Core } from '../modules/core/core.modules';
import { restaurantsReducer } from '../modules/restaurants';

import { reducer as Designer } from '../scenes/Designer/modules/designer.modules';

import { reducer as Agents } from '../scenes/Agents/modules';
import { reducer as DishAutocompleteReducer } from '../scenes/DishAutocomplete/modules';
import { reducer as CuisineAutocompleteReducer } from '../scenes/CuisineAutoComplete/modules';

import { reducer as ZipCodeAutocompleteReducer } from '../scenes/ZipCodeAutoComplete/modules';

import { reducer as Order } from '../scenes/Order/modules';

import { reducer as RestaurantModal } from '../scenes/RestaurantModal/modules/restaurantModal.modules';
import {
  reducer as SetRestaurantHoursModal,
  setHoursReducerPlugin,
} from '../scenes/SetRestaurantHoursModal/modules';
import { reducer as AppConfirm } from '../scenes/AppConfirm/modules';
import { ToastsReducer } from '../scenes/Toasts/modules';

import { reducer as StripeConnectionReducer } from '../scenes/ConnectStripeToRestaurant/modules';
import { ordersReducer } from '../modules/orders';
import { categoriesReducer } from '../modules/categories';
import { dishesReducer } from '../modules/dishes';

import { modalsReducer } from '../modules/modals';
import { checkoutReducer } from '../modules/checkout';
import { dndReducer } from '../modules/dnd';

import { copyExtrasPlugin, copySizesPlugin } from '../modules/forms/plugins';
import * as formNames from '../components/forms/constants/form.names';

const makeRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    Core,
    [DishAutocompleteReducer.name]:
      DishAutocompleteReducer[DishAutocompleteReducer.name],
    [ZipCodeAutocompleteReducer.name]:
      ZipCodeAutocompleteReducer[ZipCodeAutocompleteReducer.name],
    [CuisineAutocompleteReducer.name]:
      CuisineAutocompleteReducer[CuisineAutocompleteReducer.name],
    [Order.name]: Order[Order.name],
    [Agents.name]: Agents[Agents.name],
    [Designer.name]: Designer[Designer.name],
    RestaurantModal,
    SetRestaurantHoursModal,
    Toasts: ToastsReducer,
    AppConfirm,
    stripeConnection: StripeConnectionReducer,
    orders: ordersReducer,

    categories: categoriesReducer,
    dishes: dishesReducer,
    modals: modalsReducer,
    checkout: checkoutReducer,
    restaurants: restaurantsReducer,
    dnd: dndReducer,
    form: Form.plugin({
      Restaurant: setHoursReducerPlugin,
      [formNames.SIZES_FORM]: copySizesPlugin,
      [formNames.EXTRAS_FORM]: copyExtrasPlugin,
    }),
  });

export default makeRootReducer;

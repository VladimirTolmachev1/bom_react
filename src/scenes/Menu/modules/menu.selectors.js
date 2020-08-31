import { createSelector } from 'reselect';
import { resource as categorySlice } from './menu.categories.modules';
import { resource as dishSlice } from './menu.dishes.modules';
import { resource as restSlice } from '../../Restaurants/modules/restaurants.modules';
import { HelperService } from '../../../services/HelperService';

export const _categorySliceSelector = state => state[categorySlice];
export const _dishSliceSelector = state => state[dishSlice];
export const _restSliceSelector = state => state[restSlice];

export const dishListSelector = createSelector(
  _dishSliceSelector,
  state => {
    return state.data.map(finalPriceDishDecorator);
  },
);
export const dishListCountSelector = state => _dishSliceSelector(state).count;
export const dishListLoadingSelector = state =>
  _dishSliceSelector(state).loading;
export const dishListFiltersSelector = state =>
  _dishSliceSelector(state).filters;

export const categoriesListSelector = state =>
  _categorySliceSelector(state).data;
export const categoriesListLoading = state =>
  _categorySliceSelector(state).loading;
export const categoriesListFiltersSelector = state =>
  _categorySliceSelector(state).filters;

export const restaurantSelector = state => _dishSliceSelector(state).restaurant;

export const restaurantLoadingSelector = state =>
  _dishSliceSelector(state).restaurantLoading;

export const restaurantErrorSelector = state => _restSliceSelector(state).error;

export const orderForCheckoutSelector = createSelector(
  _dishSliceSelector,
  state => {
    return state.order ? state.order.map(finalPriceDishDecorator) : [];
  },
);

export const orderForPaymentSelector = createSelector(
  orderForCheckoutSelector,
  order => {
    return order.map(({ id, selectedSize, selectedExtras }) => ({
      id,
      selectedSize,
      selectedExtras,
    }));
  },
);

export const totalPriceSelector = createSelector(
  orderForCheckoutSelector,
  restaurantSelector,
  (order, { sales_tax = 0, delivery_fee = 0 }) => {
    const subtotal = order.reduce((sum, dish) => {
      const sumExtra = dish.selectedExtras.reduce((extrasSum, extraId) => {
        const size = dish.extras.find(extra => extra.id === extraId);
        const extraPrice = size ? size.price : 0;
        extrasSum += Number(extraPrice);
        return extrasSum;
      }, 0);

      let dishPrice = dish.price;

      if (dish.selectedSize) {
        const size = dish.sizes.find(size => size.id === dish.selectedSize);
        dishPrice = size ? size.price : dish.price;
      }

      sum += Number(dishPrice) + Number(sumExtra);
      return sum;
    }, 0);

    const totalAll =
      subtotal +
      (subtotal / 100) * Number(delivery_fee) +
      (subtotal / 100) * Number(sales_tax);

    const total = HelperService.formatCurrency(
      Math.round(totalAll * 100) / 100,
    );

    return {
      subtotal: HelperService.formatCurrency(subtotal),
      deliveryFee: delivery_fee,
      salesTax: sales_tax,
      total,
    };
  },
);

export const restaurantLinkSelector = state => _dishSliceSelector(state).link;

function getFinalPrice(dish) {
  let price = dish.price;
  if (dish.sizes && dish.sizes.length) {
    let size;

    if (dish.selectedSize) {
      size = dish.sizes.find(size => size.id === dish.selectedSize);
    }
    price = size ? size.price : dish.sizes[0].price;
  }

  return HelperService.formatCurrency(price);
}

function finalPriceDishDecorator(dish) {
  return {
    ...dish,
    finalPrice: getFinalPrice(dish),
  };
}

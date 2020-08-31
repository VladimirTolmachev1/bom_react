/* eslint-disable no-use-before-define */
export const basePriceAndSelectedSizeDecorator = dish => {
  if (dish.selectedSize && typeof dish.selectedSize !== 'object') {
    dish.selectedSize = getDishSelectedSize(dish);
  }

  dish.price = getBaseDishOrderItemPrice(dish, dish.selectedSize);

  return dish;
};

export const dishOrderForEditindDecorator = (dish = {}) => {
  basePriceAndSelectedSizeDecorator(dish);

  dish.totalPrice = dish.price + getTotalSelectedExtrasPrice(dish.extras);
  dish.totalPrice += getTotalSelectedExtrasPriceFromLists(dish.extra_lists);
  dish.totalPrice *= dish.amount || 1;

  if (!dish.amount) {
    dish.amount = 1;
  }

  return dish;
};

export const getSelectedExtrasFromDish = dish => {
  const extrasFromLists = getExtrasFromLists(dish.extra_lists);
  const singleExtras = (dish.extras || []).filter(isExtraSelectedFilter);

  return extrasFromLists.concat(singleExtras);
};

export const dishOrderWithSelectedExtrasDecorator = oldDish => {
  const dish = basePriceAndSelectedSizeDecorator({ ...oldDish });

  const selectedExtras = getSelectedExtrasFromDish(dish);

  dish.totalPrice = dish.price + getExtrasPrice(selectedExtras);
  dish.totalPrice *= dish.amount || 1;
  dish.selectedExtras = selectedExtras;

  return dish;
};

export const getTotalSelectedExtrasPrice = (extras = []) =>
  extras.reduce(
    (sum, { amount = 1, price, selected }) =>
      selected ? sum + price * amount : sum,
    0,
  );

export const isExtraSelectedFilter = ({ selected }) => !!selected;

export const getTotalSelectedExtrasPriceFromLists = (extrasLists = []) =>
  extrasLists.reduce((sum, { allow_multiselection, items, selectedExtra }) => {
    if (!allow_multiselection && selectedExtra) {
      const { amount = 1, price } = items.find(
        ({ id }) => +id === +selectedExtra,
      );
      sum += +price * amount;
    } else {
      sum += getTotalSelectedExtrasPrice(items);
    }

    return sum;
  }, 0);

export const getBaseDishOrderItemPrice = (item, selectedSize) =>
  selectedSize && selectedSize.price ? +selectedSize.price : item.price;

function getExtrasFromLists(lists = []) {
  let extras = [];

  lists.forEach(list => {
    const { allow_multiselection, items, selectedExtra } = list;

    if (!allow_multiselection && selectedExtra) {
      const extra = list.items.find(({ id }) => +id === +selectedExtra);

      if (!extra.amount) {
        extra.amount = 1;
      }

      extras.push(extra);
    } else {
      extras = extras.concat(items.filter(isExtraSelectedFilter));
    }
  }, []);

  return extras;
}

function getDishSelectedSize({ selectedSize, sizes = [] }) {
  if (!selectedSize || !sizes.length) {
    return null;
  }

  return sizes.find(({ id }) => +id === +selectedSize);
}

export function getExtrasPrice(extras = []) {
  return extras.reduce(
    // eslint-disable-next-line no-return-assign
    (sum, { price, amount = 1 }) => (sum += price * amount),
    0,
  );
}

export const getUnicOrderItemDescriptor = (dish = {}) => {
  const { id, selectedSize } = dish;
  let sizeId;

  const selectedExtras = getSelectedExtrasFromDish(dish);
  let dishDescriptor = `dishId#${id}`;

  if (selectedSize) {
    sizeId = typeof selectedSize === 'object' ? selectedSize.id : selectedSize;

    dishDescriptor += `#sizeId${sizeId}#`;
  }

  const extrasDescriptor = generateSelectedExtraDescriptor(selectedExtras);

  dishDescriptor += extrasDescriptor;

  return dishDescriptor;
};

export const generateSelectedExtraDescriptor = (extras = []) =>
  extras.reduce(
    (descriptor, { id, amount }) => `${descriptor}${id}:${amount}`,
    'extras#',
  );

export const prepeareOrderFormPayment = orderItems => {
  const mergedItemsByDescriptors = orderItems.reduce(
    (itemsByDescriptors, item) => {
      const descriptor = getUnicOrderItemDescriptor(item);

      if (itemsByDescriptors[descriptor]) {
        itemsByDescriptors[descriptor].amount += item.amount;
      } else {
        itemsByDescriptors[descriptor] = item;
      }

      return itemsByDescriptors;
    },
    {},
  );

  return Object.values(mergedItemsByDescriptors);
};

export const generateCkeckoutStorageKeyByRestaurantId = id =>
  `CHECKOUT_FOR_RESTAURANT_WITH_ID_${id}`;

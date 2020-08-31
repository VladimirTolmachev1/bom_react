import { createSelector } from 'reselect';

import { allDishesByIdsSelector } from '../../dishes';
import { itemsByUuidsSelector, allItemsUuidsSelector } from '../../checkout';
import {
  clientInfoFormSyncErrorsSelector,
  clientInfoFormValuesSelector,
  isClientInfoFormPristineSelector,
} from '../../../components/forms/selectors';
import { ordersByIdsSelector } from '../../orders';

import { DELIVERY_METHOD } from '../../../constants';
import {
  requiredFields,
  additionalRequiredFields,
} from '../../../scenes/Checkout/modules';

export const activeOrderIdSelector = ({ modals: { restauratorOrder } }) =>
  restauratorOrder.orderId;

export const activeRestauratorOrderSelector = createSelector(
  [activeOrderIdSelector, ordersByIdsSelector],
  (id, byIds) => byIds[id],
);

export const activeOrderInfoSelector = createSelector(
  [activeRestauratorOrderSelector],
  (order = {}) => ({
    name: order.name,
    email: order.email,
    street_address: order.street_address || undefined,
    city: order.city || undefined,
    building: order.building || undefined, // TODO: return empty string instead of 0
    appartment: order.appartment || undefined, // TODO: return empty string instead of 0
    house: order.house,
    phone: order.phone,
    delivery_method: order.delivery_method,
    payment_method: order.payment_method,
  }),
);

export const restauratorOrderModalStepSelector = ({
  modals: { restauratorOrder },
}) => {
  return restauratorOrder.step;
};

export const activeOrderItemIdSelector = ({ modals: { restauratorOrder } }) => {
  return restauratorOrder.activeOrderItemId;
};

export const isRestauratorOrderCreationModalOpenSelector = ({
  modals: { restauratorOrder },
}) => {
  return restauratorOrder.open && !restauratorOrder.isEditing;
};

export const isRestauratorOrderEditingModalOpenSelector = ({
  modals: { restauratorOrder },
}) => {
  return restauratorOrder.open && restauratorOrder.isEditing;
};

const emptyObject = {};
export const activeDishForRestauratorOrderModalSelector = createSelector(
  [allDishesByIdsSelector, activeOrderItemIdSelector],
  (dishesById, id) => {
    return dishesById[id] || emptyObject;
  },
);

export const newOrderItemInitialValuesSelector = createSelector(
  [activeDishForRestauratorOrderModalSelector],
  dish => {
    const res = {
      ...dish,
      selectedSize: (dish.sizes || []).length ? dish.sizes[0].id : null,
    };

    return res;
  },
);

export const editedOrderItemInitialValuesSelector = createSelector(
  [itemsByUuidsSelector, activeOrderItemIdSelector],
  (itemsByUuids, uuid) => {
    const item = itemsByUuids[uuid];

    if (!item) return undefined;

    return {
      ...item,
      selectedSize: item.selectedSize.id || item.selectedSize,
    };
  },
);

// checking for errors of the form. If it is unmounted, isInvalid
// selector always returns false
export const isSaveOrderButtonDisabledSelector = createSelector(
  [
    clientInfoFormValuesSelector,
    clientInfoFormSyncErrorsSelector,
    allItemsUuidsSelector,
  ],
  (values, errors, ids) => {
    if (values.delivery_method && values.delivery_method === DELIVERY_METHOD) {
      const hasError = requiredFields
        .concat(additionalRequiredFields)
        .some(field => errors[field]);

      return hasError || !ids.length;
    }

    return requiredFields.some(field => errors[field]) || !ids.length;
  },
);

export const isOrderCreationDisabled = state => {
  const isPristine = isClientInfoFormPristineSelector(state);
  return isPristine || isSaveOrderButtonDisabledSelector(state);
};

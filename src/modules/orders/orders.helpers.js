import { normalize } from 'normalizr';
import { ordersSchema } from './orders.schema';

export const normalizeOrders = orders => {
  const { entities, result } = normalize(orders, ordersSchema);

  return {
    byId: entities.ordersById || {},
    allIds: result || [],
  };
};

export const orderDeliveryMethods = {
  PICKUP: 'pickup',
  DELIVERY: 'delivery',
};

export const orderStatuses = {
  NEW: 'new',
  PENDING: 'pending',
  IN_PROCESS: 'in_process',
  READY: 'ready', // for delivery or pickup
  IN_DELIVERY: 'in_delivery',
  COMPLETE: 'complete',
  REFUND: 'refund',
};

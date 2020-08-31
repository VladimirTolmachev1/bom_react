import { resource } from './order.modules';

export const _OrderSliceSelector = state => state[resource];
export const loadingCreateOrderSelector = state =>
  _OrderSliceSelector(state).loadingCreateOrder;

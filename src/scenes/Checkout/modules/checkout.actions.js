import { ReduxCrudService } from '../../../services';

export const resource = '/payment/charge';

// TODO: move to /modules/checkout
export const {
  POST: [CREATE_CHARGE_REQUEST, CREATE_CHARGE_SUCCESS, CREATE_CHARGE_ERROR],
} = ReduxCrudService.getActionCrudTypes(resource);

export const createOrderCharge = ReduxCrudService.resourceAction({
  resource,
  method: 'POST',
});

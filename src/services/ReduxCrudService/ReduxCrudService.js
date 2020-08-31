import { CALL_API } from '../../store/middleware/api';

export class ReduxCrudService {
  static getActionsTypesByHttpMethod({ method, resource }) {
    return ReduxCrudService.getActionCrudTypes(resource)[method];
  }

  static getActionCrudTypes(resource) {
    return {
      POST: [
        `${resource}/post/request`,
        `${resource}/post/success`,
        `${resource}/post/error`,
      ],
      GET: [
        `${resource}/get/request`,
        `${resource}/get/success`,
        `${resource}/get/error`,
      ],
      GET_BY_ID: [
        `${resource}/get/by-id/request`,
        `${resource}/get/by-id/success`,
        `${resource}/get/by-id/error`,
      ],
      PATCH: [
        `${resource}/patch/request`,
        `${resource}/patch/success`,
        `${resource}/patch/error`,
      ],
      PUT: [
        `${resource}/put/request`,
        `${resource}/put/success`,
        `${resource}/put/error`,
      ],
      DELETE: [
        `${resource}/delete/request`,
        `${resource}/delete/success`,
        `${resource}/delete/error`,
      ],
    };
  }

  static resourceAction({ resource, method, ...initParams }) {
    return ({ body = {}, ...rest } = {}) => {
      return {
        type: CALL_API,
        request: {
          endpoint: resource + (initParams.byId ? `/${rest.id}` : ''),
          method,
          types: ReduxCrudService.getActionsTypesByHttpMethod({
            method: initParams.byId ? 'GET_BY_ID' : method,
            resource,
          }),
          body,
          ...initParams,
          ...rest,
        },
      };
    };
  }
}

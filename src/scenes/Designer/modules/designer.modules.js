import { ReduxCrudService } from '../../../services';
import { API_REQUESTS_ABORT } from '../../../modules/core/core.types';

export const resource = '/designer';

export const {
  GET_BY_ID: [
    GET_DESIGNER_BY_ID_REQUEST,
    GET_DESIGNER_BY_ID_SUCCESS,
    GET_DESIGNER_BY_ID_ERROR,
  ],
  POST: [
    UPDATE_DESIGNER_REQUEST,
    UPDATE_DESIGNER_SUCCESS,
    UPDATE_DESIGNER_ERROR,
  ],
} = ReduxCrudService.getActionCrudTypes(resource);

export const CLEAR_PAGE_DESIGNER_PAGE = 'designer/clear-page';

export const getInitialState = () => ({
  loading: false,
  initialValues: {},
  error: null,
  id: null,
});

export const reducer = {
  name: resource,
  [resource]: function reducer(state = getInitialState(), action) {
    switch (action.type) {
      case UPDATE_DESIGNER_REQUEST:
      case GET_DESIGNER_BY_ID_REQUEST: {
        return {
          ...state,
          loading: true,
        };
      }
      case CLEAR_PAGE_DESIGNER_PAGE: {
        return getInitialState();
      }

      case GET_DESIGNER_BY_ID_SUCCESS:
      case UPDATE_DESIGNER_SUCCESS: {
        return {
          ...state,
          initialValues: action.response,
          loading: false,
        };
      }

      case GET_DESIGNER_BY_ID_ERROR:
      case UPDATE_DESIGNER_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      }

      default: {
        return state;
      }
    }
  },
};

export const updateDesigner = ReduxCrudService.resourceAction({
  resource,
  method: 'POST',
  contentType: 'multipart/form-data',
  logger: {
    success: 'Page designer was successful updated',
    error: 'Error during Page designer update',
  },
});

export const getDesignerById = ReduxCrudService.resourceAction({
  resource,
  method: 'GET',
  byId: true,
});

export function clearModalData() {
  return {
    type: CLEAR_PAGE_DESIGNER_PAGE,
  };
}

export function abortPageRequests() {
  return {
    type: API_REQUESTS_ABORT,
    requestTypes: [GET_DESIGNER_BY_ID_REQUEST, UPDATE_DESIGNER_REQUEST],
  };
}

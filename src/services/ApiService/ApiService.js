export const API_PREFIX = 'api';
export class ApiService {
  static callAPIMatix = {
    'multipart/form-data': ApiService.bodyToFormData,
    'application/json': ApiService.bodyJSONStringify,
  };

  static bodyJSONStringify(body) {
    return JSON.stringify(body);
  }

  static bodyToFormData(body) {
    const formData = new FormData();

    // eslint-disable-next-line
    for (const name in body) {
      formData.append(name, body[name]);
    }

    return formData;
  }

  static createRequestProxy(request, params) {
    let xhr;
    const promise = new Promise((resolve, reject) => {
      xhr = ApiService.createRequest(resolve, reject, request);
      xhr.send(params);
    });

    return {
      promise,
      xhr,
    };
  }

  static createRequest(resolve, reject, request) {
    const { method, body } = request;
    const xhr = new XMLHttpRequest();

    let url = request.isCustomApiEndpoint
      ? request.endpoint
      : `${process.env.REACT_APP_APINAME}/${API_PREFIX}${request.endpoint}`;

    // TEMPORARY HARD FIX BEFORE REMOVING THIS SERVICE AND LEGACY MIDDLEWARES
    if (['PATCH', 'DELETE'].includes(method) && body && body.id) {
      url = `${url}/${body.id}`;
    }

    xhr.open(request.method, url);

    ApiService._prepareHeaderByRequestParams(xhr, request);

    xhr.onload = () => {
      xhr.status >= 200 && xhr.status < 300
        ? resolve(ApiService.transformSuccessResponse(xhr))
        : reject(ApiService.transformErrorResponse(xhr));
    };

    xhr.onerror = () => reject(ApiService.transformErrorResponse(xhr));
    xhr.onabort = () => reject(ApiService.transformErrorResponse(xhr));

    return xhr;
  }

  static get(request) {
    if (request.isCustomApiEndpoint) {
      return ApiService.createRequestProxy(request);
    }

    const url = new URL(request.endpoint, document.location.origin);
    let path = '';

    if (request.body) {
      Object.keys(request.body) &&
        Object.keys(request.body).forEach(key => {
          if (typeof url.searchParams !== 'undefined') {
            request.body[key] &&
              url.searchParams.append(key, request.body[key]);
          } else {
            // Old safari version don't support searchParams, so we generating query params by this way.
            // eslint-disable-next-line no-lonely-if
            if (request.body[key]) {
              if (path === '') {
                path += `${key}=${request.body[key]}`;
              } else {
                path += `&${key}=${request.body[key]}`;
              }
            }
          }
        });
    }

    if (typeof url.searchParams !== 'undefined') {
      request.endpoint = url.pathname + url.search;
    } else {
      request.endpoint = url.pathname + (path ? `?${path}` : '');
    }

    return ApiService.createRequestProxy(request);
  }

  static post(request) {
    const params = ApiService.callAPIMatix[request.contentType](request.body);
    return ApiService.createRequestProxy(request, params);
  }

  static put(request) {
    const params = ApiService.callAPIMatix[request.contentType](request.body);
    return ApiService.createRequestProxy(request, params);
  }

  static patch(request) {
    const params = ApiService.callAPIMatix[request.contentType](request.body);
    return ApiService.createRequestProxy(request, params);
  }

  static delete(request) {
    const params = ApiService.callAPIMatix[request.contentType](request.body);
    return ApiService.createRequestProxy(request, params);
  }

  static _prepareHeaderByRequestParams(xhr, request) {
    const token = window.localStorage.getItem('token') || '';
    if (request.contentType === 'application/json') {
      xhr.setRequestHeader('Content-Type', request.contentType);
    }

    if (!request.isCustomApiEndpoint) {
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.setRequestHeader('Access-Control-Allow-Credentials', true);
      xhr.setRequestHeader('Access-Control-Allow-Methods', '*');
      xhr.setRequestHeader(
        'Access-Control-Allow-Request-Headers',
        'Authorization, Content-Type',
      );
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }
  }

  static transformErrorResponse(xhr) {
    let { response } = xhr;
    if (ApiService.isJsonString(xhr.response)) {
      response = JSON.parse(xhr.response);
    }
    return {
      response,
      status: xhr.status,
    };
  }

  static transformSuccessResponse(xhr) {
    let { response } = xhr;
    if (ApiService.isJsonString(response)) {
      response = JSON.parse(response);
    }
    return response;
  }

  static isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}

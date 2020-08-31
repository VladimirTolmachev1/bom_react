import { autobind } from 'core-decorators';

import { axiosInstance as defaultAxiosInstance } from './axiosInstance';

export class BaseApiService {
  static idField = 'id';

  static bodyToFormData(body) {
    const formData = new FormData();

    // eslint-disable-next-line
    for (const name in body) {
      formData.append(name, body[name]);
    }

    return formData;
  }

  constructor(baseEndpoint, axiosInstance = defaultAxiosInstance) {
    this.baseEndpoint = baseEndpoint;
    this.axiosInstance = axiosInstance;
  }

  @autobind
  post(body, configs, url) {
    return this.axiosInstance.post(url || this.baseEndpoint, body, configs);
  }

  // alias for post
  create = this.post;

  @autobind
  getById(id, configs, url) {
    return this.axiosInstance.get(url || `${this.baseEndpoint}/${id}`, configs);
  }

  @autobind
  get(configs, url) {
    return this.axiosInstance.get(url || this.baseEndpoint, configs);
  }

  @autobind
  patch(entity, configs, url) {
    return this.axiosInstance.patch(
      url || `${this.baseEndpoint}/${this._getId(entity)}`,
      entity,
      configs,
    );
  }

  @autobind
  put(entity, configs, url) {
    return this.axiosInstance.put(
      url || `${this.baseEndpoint}/${this._getId(entity)}`,
      entity,
      configs,
    );
  }

  @autobind
  delete(id, configs, url) {
    return this.axiosInstance.delete(
      url || `${this.baseEndpoint}/${id}`,
      configs,
    );
  }

  @autobind
  request(config) {
    return this.axiosInstance.request(config);
  }

  _getId = entity => entity[this.constructor.idField];
}

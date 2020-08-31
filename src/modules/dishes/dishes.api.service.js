import { autobind } from 'core-decorators';
import { BaseApiService } from '../../services';

export const dishsBaseEndpoint = '/dish';

class DishsApiService extends BaseApiService {
  @autobind
  patchExtras(dishId, extras) {
    return this.request({
      method: 'PATCH',
      url: `${this.baseEndpoint}/${dishId}/extras`,
      data: extras,
    });
  }

  @autobind
  patchSizes(dishId, sizes) {
    return this.request({
      method: 'PATCH',
      url: `${this.baseEndpoint}/${dishId}/sizes`,
      data: sizes,
    });
  }

  @autobind
  createDish(dishInfo) {
    return this.request({
      method: 'POST',
      data: BaseApiService.bodyToFormData(dishInfo),
      url: this.baseEndpoint,
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }

  @autobind
  updateDish(dish) {
    return this.request({
      method: 'POST',
      data: BaseApiService.bodyToFormData(dish),
      url: `${this.baseEndpoint}/${dish.id}`,
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }
}

export default new DishsApiService(dishsBaseEndpoint);

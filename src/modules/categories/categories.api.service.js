import { autobind } from 'core-decorators';
import { BaseApiService } from '../../services';

export const categorysBaseEndpoint = '/category';

class CategorysApiService extends BaseApiService {
  @autobind
  patchExtras(categoryId, extrasPayload) {
    return this.request({
      method: 'PATCH',
      url: `${this.baseEndpoint}/${categoryId}/extras`,
      data: extrasPayload,
    });
  }
}

export default new CategorysApiService(categorysBaseEndpoint);

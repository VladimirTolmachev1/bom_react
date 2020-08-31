import { autobind } from 'core-decorators';
import { BaseApiService } from '../../services';

export const restaurantsBaseEndpoint = '/restaurant';

class RestaurantsApiService extends BaseApiService {
  @autobind
  getByUrlForClient(url) {
    return this.getById(url, { params: { isClient: true } });
  }
}

export default new RestaurantsApiService(restaurantsBaseEndpoint);

import { autobind } from 'core-decorators';
import { BaseApiService } from '../../services';

class DndApiService extends BaseApiService {
  @autobind
  saveDishesOrder(items, restaurant_id) {
    return this.request({
      method: 'PATCH',
      data: { items, restaurant_id },
      url: '/sort/dish',
    });
  }

  @autobind
  saveCategoriesOrder(items, restaurant_id) {
    return this.request({
      method: 'PATCH',
      data: { items, restaurant_id },
      url: '/sort/category',
    });
  }
}

export default new DndApiService();

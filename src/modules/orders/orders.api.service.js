import { autobind } from 'core-decorators';
import { BaseApiService } from '../../services';

export const ordersBaseEndpoint = '/order';
export const ordersTotalInfoEndpoint = restaurnatId =>
  `${ordersBaseEndpoint}/total/${restaurnatId}`;

class OrdersApiService extends BaseApiService {
  @autobind
  getTotalInfo(restaurant_id) {
    return super.get(
      {
        params: { restaurant_id },
      },
      ordersTotalInfoEndpoint(restaurant_id),
    );
  }
}

export default new OrdersApiService(ordersBaseEndpoint);

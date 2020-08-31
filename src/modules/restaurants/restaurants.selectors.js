import moment from 'moment';
import { createSelector } from 'reselect';

import { agentsListSelector } from '../../scenes/Agents/modules';

const _RestaurantsSliceSelector = ({ restaurants }) => restaurants;

export const restaurantsSelector = state =>
  _RestaurantsSliceSelector(state).data;
export const filtersSelector = state =>
  _RestaurantsSliceSelector(state).filters;
export const isRestaurantsLoadingSelector = state =>
  _RestaurantsSliceSelector(state).loading;
export const restaurantsCountSelector = state =>
  _RestaurantsSliceSelector(state).count;
export const managedRestaurantSelector = state =>
  _RestaurantsSliceSelector(state).managedRestaurant;

export const managedRestaurantIdSelector = createSelector(
  managedRestaurantSelector,
  restaurant => restaurant.id,
);

export const restaurantsListTableDataSelector = createSelector(
  [restaurantsSelector, agentsListSelector],
  (restaurants, agents) => {
    return restaurants.map(
      ({
        id,
        status,
        created_at,
        subscription,
        restaurant_name,
        delivery_method,
        revenue,
        agent_name,
      }) => {
        const agent = agents.find(agent => agent.label === agent_name);
        agent_name = agent && agent.label;
        revenue = `$${revenue}`;

        return {
          name: {
            restaurant_name,
            id,
          },
          revenue,
          subscription,
          onboarded: moment(created_at).format('YYYY-MM-DD'),
          agent_name,
          delivery_method,
          actions: {
            id,
            status,
          },
        };
      },
    );
  },
);

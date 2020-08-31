import { createSelector } from 'reselect';
import { resource } from './restaurants.modules';
import moment from 'moment';

import { agentsListSelector } from '/scenes/Agents/modules';

const _RestaurantsSliceSelector = state => state[resource];

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

export const restaurantsListTableDataSelector = createSelector(
  restaurantsSelector,
  agentsListSelector,
  (restaurants, agents) => {
    return restaurants.map(
      ({
        restaurant_name,
        revenue,
        agent_name,
        subscription,
        created_at,
        delivery_method,
        id,
        status,
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

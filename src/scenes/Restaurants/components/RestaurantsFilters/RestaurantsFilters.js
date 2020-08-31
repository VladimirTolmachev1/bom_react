import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import { AppSelect, AppSearch, AppDateRange } from '../../../../components';

import { AgentsAutoComplete } from '../../../Agents';
import { getInitialFilters } from '../../../../modules/restaurants';

import './RestaurantsFilters.scss';

const statuses = [
  { name: 'Blocked', value: 'blocked' },
  { name: 'Active', value: 'active' },
];

export class RestaurantsFilters extends PureComponent {
  @autobind
  onSearchClick() {
    const { search, requestTrigger } = this.props;
    requestTrigger({ search, page: 1 });
  }

  @autobind
  onControlChange(filters) {
    const { requestTrigger, updateFilters } = this.props;
    const newFilters = { ...filters, page: 1 };
    updateFilters(newFilters);
    requestTrigger(newFilters);
  }

  @autobind
  onClearFiltersClick() {
    const { clearFilters, requestTrigger } = this.props;

    clearFilters();
    requestTrigger(getInitialFilters());
  }

  render() {
    const {
      cuisine,
      revenue,
      subscription,
      agent_name,
      search,
      updateFilters,
      deliveryMethod,
      status,
      onboardingPeriodStart,
      onboardingPeriodEnd,
      dictionary: {
        cuisine: cuisines,
        revenues,
        subscriptions,
        delivery_method,
      },
    } = this.props;

    return (
      <div className="restaurants-filters">
        <AppSelect
          label="Cuisine"
          name="cuisine"
          value={cuisine}
          onChange={this.onControlChange}
          className="restaurants-filters__select"
          options={cuisines}
        />

        <AppSelect
          label="Revenue"
          name="revenue"
          value={revenue}
          onChange={this.onControlChange}
          className="restaurants-filters__select"
          options={revenues}
        />

        <AppSelect
          label="Subscription"
          name="subscription"
          value={subscription}
          onChange={this.onControlChange}
          className="restaurants-filters__select"
          options={subscriptions}
        />

        <AgentsAutoComplete
          name="agent_name"
          className="restaurants-filters__select"
          onChange={this.onControlChange}
          value={agent_name}
        />

        <AppSearch
          label="Search for restaurant"
          search={search}
          onChange={updateFilters}
          className="restaurants-filters__search"
          onSearchClick={this.onSearchClick}
        />

        <AppSelect
          label="Delivery Method"
          name="deliveryMethod"
          value={deliveryMethod}
          onChange={this.onControlChange}
          className="restaurants-filters__select"
          options={delivery_method}
        />

        <AppSelect
          label="Status"
          name="status"
          value={status}
          onChange={this.onControlChange}
          className="restaurants-filters__select"
          options={statuses}
        />

        <AppDateRange
          onChange={this.onControlChange}
          startDate={onboardingPeriodStart}
          endDate={onboardingPeriodEnd}
          startName="onboardingPeriodStart"
          endName="onboardingPeriodEnd"
          label="Onboarding"
        />

        <Tooltip title="Clear filters">
          <IconButton
            onClick={this.onClearFiltersClick}
            aria-label="Delete"
            className="restaurants-filters__clear-btn">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

RestaurantsFilters.propTypes = {
  updateFilters: PropTypes.func,
  cuisine: PropTypes.string,
  revenue: PropTypes.string,
  subscription: PropTypes.string,
  status: PropTypes.string,
  agent_name: PropTypes.string,
  onboardingPeriodStart: PropTypes.any,
  onboardingPeriodEnd: PropTypes.any,
  search: PropTypes.string,
  dictionary: PropTypes.object,
  requestTrigger: PropTypes.func,
};

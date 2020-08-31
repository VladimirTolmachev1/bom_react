import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import { autobind } from 'core-decorators';

import {
  RestaurantsFilters,
  RestaurantsActionsFormatter,
  RestaurantsNameFormatter,
} from './components';
import { HelperService } from '../../services';
import {
  getRestaurants,
  updateFilters,
  cleanup,
  restaurantsListTableDataSelector,
  filtersSelector,
  isRestaurantsLoadingSelector,
  restaurantsCountSelector,
  abortPageRequests,
  blockRestaurant,
  deleteRestaurant,
  clearFilters,
} from '../../modules/restaurants';
import { showConfirm } from '../AppConfirm/modules';
import { dictionarySelector } from '../../modules/core/core.selectors';
import { RestaurantModal } from '../RestaurantModal';
import { SetRestaurantHoursModal } from '../SetRestaurantHoursModal';
import { toggleRestaurantsModal, setMode } from '../RestaurantModal/modules';
import { toggleSetRestaurantHoursModal } from '../SetRestaurantHoursModal/modules';
import { AppTable, AppCleanHOC } from '../../components';
import './Restaurants.scss';

const mapStateToProps = state => ({
  tableData: restaurantsListTableDataSelector(state),
  total: restaurantsCountSelector(state),
  filters: filtersSelector(state),
  loading: isRestaurantsLoadingSelector(state),
  dictionary: dictionarySelector(state),
});

const mapDispatchToProps = {
  getRestaurants,
  updateFilters,
  toggleRestaurantsModal,
  abortPageRequests,
  setMode,
  cleanup,
  blockRestaurant,
  showConfirm,
  deleteRestaurant,
  toggleSetRestaurantHoursModal,
  clearFilters,
};

export default
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@AppCleanHOC
class Restaurants extends PureComponent {
  settings = [
    {
      field: 'name',
      title: 'Name',
      formatter: this.restaurantsNameFormatter,
      sort: true,
    },
    {
      field: 'revenue',
      title: 'Revenue',
      sort: true,
    },
    {
      field: 'subscription',
      title: 'Subscription',
      sort: true,
    },
    {
      field: 'agent_name',
      title: 'Agents name',
      sort: true,
    },
    {
      field: 'onboarded',
      title: 'Onboarded',
      sort: true,
    },
    {
      field: 'delivery_method',
      title: 'Delivery Method',
      sort: true,
    },
    {
      field: 'actions',
      formatter: this.restaurantsActionsFormatter,
      title: 'Actions',
      style: {
        maxWidth: '240px',
        paddingRight: '10px',
      },
    },
  ];

  tableOptions = {
    requestTrigger: this.requestTrigger,
    updateFilters: this.props.updateFilters,
  };

  componentDidMount() {
    this.requestTrigger();
  }

  @autobind
  onEditClick(event) {
    const { toggleRestaurantsModal, setMode } = this.props;
    const { id } = event.target;
    setMode({ mode: 'edit', id });
    toggleRestaurantsModal(true);
  }

  @autobind
  restaurantsActionsFormatter(cell) {
    return (
      <RestaurantsActionsFormatter
        {...HelperService.pick(this.props, [
          'blockRestaurant',
          'showConfirm',
          'deleteRestaurant',
          'toggleSetRestaurantHoursModal',
        ])}
        {...cell}
        onEditClick={this.onEditClick}
      />
    );
  }

  @autobind
  restaurantsNameFormatter(name) {
    return (
      <RestaurantsNameFormatter {...name} onNameClick={this.onEditClick} />
    );
  }

  @autobind
  requestTrigger(filters = this.props.filters) {
    this.props.getRestaurants({ body: { ...this.props.filters, ...filters } });
  }

  renderRestaurantFilters() {
    const {
      filters: {
        cuisine,
        revenue,
        subscription,
        status,
        deliveryMethod,
        agent_name,
        onboardingPeriodStart,
        onboardingPeriodEnd,
        search,
      },
      clearFilters,
      dictionary,
      updateFilters,
    } = this.props;

    return (
      <RestaurantsFilters
        {...{
          cuisine,
          dictionary,
          revenue,
          subscription,
          status,
          search,
          deliveryMethod,
          agent_name,
          clearFilters,
          onboardingPeriodStart,
          onboardingPeriodEnd,
          updateFilters,
        }}
        requestTrigger={this.requestTrigger}
      />
    );
  }

  renderMetaRow() {
    const { total } = this.props;
    return (
      <span className="app-meta-info">
        {total || 0} are shown. You can filter them by:
      </span>
    );
  }

  @autobind
  onAddNewClick() {
    const { toggleRestaurantsModal, setMode } = this.props;
    setMode({ mode: 'add' });
    toggleRestaurantsModal(true);
  }

  renderPageHeader() {
    return (
      <div className="restaurants-header">
        <h1>Restaurants</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={this.onAddNewClick}>
          <Add />
          Add new
        </Button>
      </div>
    );
  }

  render() {
    const {
      filters: { limit, page, sort_field, sort_order },
      loading,
      total,
    } = this.props;

    return (
      <DocumentTitle title="Restaurants List auto">
        <div className="app-static-container restaurants">
          {this.renderPageHeader()}
          {this.renderMetaRow()}
          {this.renderRestaurantFilters()}
          <AppTable
            data={this.props.tableData}
            loading={loading}
            total={total}
            options={this.tableOptions}
            dataSettings={this.settings}
            {...{
              limit,
              page,
              sort_field,
              sort_order,
            }}
          />
          <RestaurantModal />
          <SetRestaurantHoursModal />
        </div>
      </DocumentTitle>
    );
  }
}

Restaurants.propTypes = {
  tableData: PropTypes.array,
  filters: PropTypes.object,
  loading: PropTypes.bool,
};

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';

import { DragDropContext } from 'react-beautiful-dnd';
import { DishOrderCreationModal } from '../modals/dish-order';
import { setDishOrderModal } from '../../modules/modals/dish-order';
import { HelperService } from '../../services';
import { RestaurantHeader, Preloader } from '../../components';
import {
  DishList,
  DishOrder,
  RestaurantInfo,
  CategoriesList,
} from './components';

import {
  getRestaurantForClient,
  managedRestaurantSelector,
  isRestaurantsLoadingSelector,
} from '../../modules/restaurants';
import { themeColorSelector } from '../../modules/core';

import {
  checkoutItemsSelector,
  totalPriceSelector,
  removeItemFromCheckout,
} from '../../modules/checkout';

import {
  getDishes,
  updateDishFilters,
  setDishPage,
  cleanupDish,
  cleanDishList,
  allDishesSelector,
  dishListCountSelector,
  dishListFiltersSelector,
  dishListLoadingSelector,
} from '../../modules/dishes';

import {
  categoriesListLoading,
  categoriesListSelector,
  categoriesListFiltersSelector,
  getCategories,
  cleanupCategories,
  updateCategoryFilters,
} from '../../modules/categories';

import './Menu.scss';
import { Errorcomponent } from './components/ErrorComponent/ErrorComponent';
import { CheckoutChangeListener } from '../CheckoutChangeListener';

const mapStateToProps = state => ({
  categories: categoriesListSelector(state),
  dishes: allDishesSelector(state),
  dishesCount: dishListCountSelector(state),
  dishesLoading: dishListLoadingSelector(state),
  dishFilters: dishListFiltersSelector(state),
  categoriesFilters: categoriesListFiltersSelector(state),
  categoriesLoading: categoriesListLoading(state),
  restaurantLoading: isRestaurantsLoadingSelector(state),
  restaurant: managedRestaurantSelector(state),
  totalPrice: totalPriceSelector(state),
  order: checkoutItemsSelector(state),
  themeColor: themeColorSelector(state),
  // REPLACE
  // restaurantError: restaurantErrorSelector(state)
  restaurantError: null, // hard fix
});

const mapDispatchToProps = {
  getCategories,
  getDishes,
  updateCategoryFilters,
  updateDishFilters,
  setDishPage,
  cleanupDish,
  cleanupCategories,
  getRestaurantForClient,
  setDishOrderModal,
  cleanDishList,
  removeItemFromCheckout,
};

export default
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class MenuClient extends PureComponent {
  state = {
    activeTab: 0,
  };

  componentWillUnmount() {
    const { cleanupCategories, cleanDishList } = this.props;

    cleanupCategories();
    cleanDishList();
  }

  componentDidMount() {
    const {
      getCategories,
      updateCategoryFilters,
      categoriesFilters,
      cleanupDish,
      getRestaurantForClient,
      history: {
        location: { pathname },
      },
    } = this.props;

    const restaurant_url = pathname.split('/')[2];
    const categoryFiltersPayload = { restaurant_url };

    const categoriesPayload = {
      body: { ...categoriesFilters, ...categoryFiltersPayload },
    };

    cleanupDish();
    getRestaurantForClient(restaurant_url);
    updateCategoryFilters(categoryFiltersPayload);
    getCategories(categoriesPayload);
    this.dishesRequest();
  }

  componentDidUpdate() {
    const {
      categories,
      categoriesLoading,
      history: {
        location: { pathname },
      },
    } = this.props;

    const restaurant_url = pathname.split('/')[2];
    let category_name = pathname.split('/')[3];

    if (
      categoriesLoading ||
      (category_name &&
        categories.find(category => category.name === category_name)) ||
      !categories.length
    ) {
      return false;
    }

    category_name = categories[0].name;

    this.dishesRequest(category_name);
    this.props.history.replace(`/r/${restaurant_url}/${category_name}`);
  }

  dishesRequest = name => {
    const {
      dishFilters,
      updateDishFilters,
      history: {
        location: { pathname },
      },
      getDishes,
    } = this.props;
    const category_name = name || pathname.split('/')[3];
    const restaurant_url = pathname.split('/')[2];

    if (!category_name) {
      return false;
    }

    const dishBody = { category_name, restaurant_url };
    updateDishFilters(dishBody);
    getDishes({ body: { ...dishFilters, ...dishBody } });
  };

  @autobind
  onBasketClick(dish) {
    const { setDishOrderModal } = this.props;
    setDishOrderModal({ open: true, id: dish.id });
  }

  renderMenu() {
    const { activeTab } = this.state;
    const {
      totalPrice,
      restaurant,
      history: {
        location: { pathname },
      },
      removeItemFromCheckout,
      cleanDishList,
    } = this.props;
    const category_name = pathname.split('/')[3];
    const restaurant_name = pathname.split('/')[2];
    const category = this.props.categories.find(
      category => category.name === category_name,
    );
    const category_id = (category && +category.id) || null;

    return (
      <div className="menu__content">
        {activeTab === 0 && (
          <>
            <div className="menu__content-aside">
              <h3>List of categories</h3>
              <CategoriesList
                {...HelperService.pick(this.props, [
                  'categories',
                  'themeColor',
                  'categoriesLoading',
                  'showConfirm',
                  'dishFilters',
                  'updateDishFilters',
                  'getDishes',
                ])}
                cleanDishList={cleanDishList}
                mode="client"
                category_id={category_id}
                restaurant_name={restaurant_name}
                category_name={category_name}
              />
            </div>
            <DishList
              category={category}
              {...{
                category_id,
              }}
              mode="client"
              onBasketClick={this.onBasketClick}
              {...HelperService.pick(this.props, [
                'dishesLoading',
                'dishesCount',
                'setDishPage',
                'dishes',
                'showConfirm',
                'addDishInOrder',
                'dishFilters',
                'getDishes',
                'setDishSize',
              ])}
            />
          </>
        )}

        {activeTab === 1 && <RestaurantInfo restaurant={restaurant} />}

        <Hidden smDown>
          <DishOrder
            totalPrice={totalPrice}
            restaurant_url={restaurant_name}
            removeDishFromOrder={removeItemFromCheckout}
            {...HelperService.pick(this.props, [
              'removeDishFromOrder',
              'order',
            ])}
          />
        </Hidden>
      </div>
    );
  }

  onChangeTab = (event, activeTab) => {
    this.setState({ activeTab });
  };

  @autobind
  getRestaurantPhones() {
    const { restaurant } = this.props;

    return [restaurant.phone_number, restaurant.phone_number2].filter(Boolean);
  }

  render() {
    const { restaurantLoading, restaurant, restaurantError } = this.props;
    const { activeTab } = this.state;

    if (restaurantLoading) {
      return <Preloader className="menu-client-loader" />;
    }

    const { restaurant_name, page_info } = restaurant;

    const { background_picture, logo } = page_info || {};

    if (restaurantError && restaurantError === 404) {
      return <Errorcomponent message="404. Page not found!" />;
    }

    if (restaurantError && restaurantError === 406) {
      return <Errorcomponent message="Sorry. This restaurant was blocked!" />;
    }

    return (
      <DragDropContext onDragEnd={() => null}>
        <CheckoutChangeListener />
        <RestaurantHeader
          background_picture={background_picture}
          address={restaurant.street_address}
          phones={this.getRestaurantPhones()}
          name={restaurant_name}
          city={restaurant.city}
          logo={logo}
        />
        <div className="app-static-container menu-container">
          <Tabs
            className="menu-client__tabs"
            value={activeTab}
            indicatorColor="primary"
            onChange={this.onChangeTab}>
            <Tab label="Menu" className="menu-client__tabs-item" />
            <Tab label="Info" className="menu-client__tabs-item" />
          </Tabs>

          {this.renderMenu()}
        </div>

        <DishOrderCreationModal />
      </DragDropContext>
    );
  }
}

MenuClient.propTypes = {
  getCategories: PropTypes.func,
  categories: PropTypes.array,
  categoriesLoading: PropTypes.bool,
};

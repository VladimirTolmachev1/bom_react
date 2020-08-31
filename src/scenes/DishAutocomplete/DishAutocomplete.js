import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { withStyles } from '@material-ui/core';

import { AppCleanHOC, AppAutoComplete } from '../../components';
import { HelperService } from '../../services';

import styles from './styles';

import {
  dishesFiltersSelector,
  dishesListSelector,
  dishesLoadingSelector,
  updateFilters,
  abortPageRequests,
  getDishesForAutocomplete,
  dishesCountSelector,
  setPage,
  clearAutocomplete,
} from './modules';

const mapStateToProps = state => ({
  dishes: dishesListSelector(state),
  filters: dishesFiltersSelector(state),
  loading: dishesLoadingSelector(state),
  count: dishesCountSelector(state),
});

const mapDispatchToProps = {
  getDishesForAutocomplete,
  updateFilters,
  abortPageRequests,
  setPage,
  clearAutocomplete,
};

export default
@withStyles(styles)
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@AppCleanHOC
class DishAutocomplete extends PureComponent {
  makeRequest(rest) {
    const {
      getDishesForAutocomplete,
      category_id,
      updateFilters,
      filters,
      restaurant_id,
      withSizes,
      withExtras,
    } = this.props;
    const body = {
      ...filters,
      category_id,
      restaurant_id,
      ...rest,
      withSizes,
      withExtras,
    };

    updateFilters(body);
    getDishesForAutocomplete({ body });
  }

  componentWillUnmount() {
    const { clearAutocomplete } = this.props;
    clearAutocomplete();
  }

  @autobind
  onInputChange(name) {
    this.makeRequest({ name });
  }

  @autobind
  onMenuScrollToBottom() {
    const {
      setPage,
      filters: { page },
      getDishesForAutocomplete,
      category_id,
      restaurant_id,
      withSizes,
      withExtras,
    } = this.props;
    const body = {
      page: page + 1,
      category_id,
      restaurant_id,
      withSizes,
      withExtras,
    };

    setPage(page + 1);
    getDishesForAutocomplete({ body });
  }

  @autobind
  onChange({ value }) {
    const { onChange, dishes } = this.props;
    const dish = dishes.find(dish => dish.value === value) || {
      label: '',
      value: '',
    };
    onChange(dish);
  }

  @autobind
  componentDidMount() {
    this.makeRequest();
  }

  render() {
    const {
      dishes,
      classes,
      wrapperClassName,
      exludeOptionsAfterSelection,
      optionFilter,
      placeholder,
      valuesToExclude,
    } = this.props;
    return (
      <div
        className={classNames(
          classes.dishAutocompleteWrapper,
          wrapperClassName,
        )}>
        <AppAutoComplete
          {...HelperService.pick(this.props, [
            'loading',
            'compareKey',
            'value',
            'count',
          ])}
          valuesToExclude={valuesToExclude}
          onMenuScrollToBottom={this.onMenuScrollToBottom}
          exludeOptionsAfterSelection={exludeOptionsAfterSelection}
          onInputChange={this.onInputChange}
          optionFilter={optionFilter}
          options={dishes}
          className="dish-autocomplete"
          onChange={this.onChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

DishAutocomplete.propTypes = {
  withSizes: PropTypes.bool,
  withExtras: PropTypes.bool,
  dishes: PropTypes.array,
  category_id: PropTypes.string,
  loading: PropTypes.bool,
  compareKey: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.object,
  wrapperClassName: PropTypes.string,
};

DishAutocomplete.defaultProps = {
  wrapperClassName: '',
  placeholder: 'Dish',
  compareKey: 'label',
  withSizes: false,
  withExtras: false,
};

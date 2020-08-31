import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { withStyles } from '@material-ui/core';
import { AppCleanHOC, AppAutoComplete } from '../../components';
import { HelperService } from '../../services';

import styles from './styles';

import {
  cuisinesFiltersSelector,
  cuisinesListSelector,
  cuisinesLoadingSelector,
  updateFilters,
  abortPageRequests,
  getCuisinesForAutocomplete,
  cuisinesCountSelector,
  setPage,
  clearAutocomplete,
} from './modules';

const clearOption = {
  value: '',
  label: '',
};

const mapStateToProps = state => ({
  cuisines: cuisinesListSelector(state),
  filters: cuisinesFiltersSelector(state),
  loading: cuisinesLoadingSelector(state),
  count: cuisinesCountSelector(state),
});

const mapDispatchToProps = {
  getCuisinesForAutocomplete,
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
class CuisineAutocomplete extends PureComponent {
  makeRequest(rest) {
    const { getCuisinesForAutocomplete, updateFilters, filters } = this.props;
    const body = { ...filters, ...rest };

    updateFilters(body);
    getCuisinesForAutocomplete({ body });
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
    if (this.state.page) {
      this.setState({ page: this.state.page + 1 });
    } else {
      this.setState({ page: 1 });
    }

    const { setPage, getCuisinesForAutocomplete } = this.props;
    const body = { page: this.state.page };

    setPage(this.state.page);
    getCuisinesForAutocomplete({ body });
  }

  @autobind
  onChange(option) {
    const { onChange } = this.props;
    onChange(option || clearOption);
  }

  @autobind
  componentDidMount() {
    this.makeRequest();
    this.setState({ page: 1 });
  }

  render() {
    const { cuisines, classes, wrapperClassName, ...rest } = this.props;
    return (
      <div
        className={`${
          classes.cuisineAutocompleteWrapper
        }  ${wrapperClassName}`}>
        <AppAutoComplete
          {...HelperService.pick(this.props, [
            'loading',
            'compareKey',
            'placeholder',
            'isClearable',
            'selectedOption',
            'value',
            'count',
          ])}
          onMenuScrollToBottom={this.onMenuScrollToBottom}
          onInputChange={this.onInputChange}
          options={cuisines}
          className="dish-autocomplete"
          onChange={this.onChange}
          {...rest}
        />
      </div>
    );
  }
}

CuisineAutocomplete.propTypes = {
  wrapperClassName: PropTypes.string,
  cuisines: PropTypes.array,
  loading: PropTypes.bool,
  compareKey: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.object,
  placeholder: PropTypes.string,
};

CuisineAutocomplete.defaultProps = {
  cuisineAutocompleteWrapper: '',
  compareKey: 'label',
  placeholder: 'Select cuisine',
  isClearable: true,
};

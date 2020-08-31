import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { withStyles } from '@material-ui/core';
import { AppCleanHOC, AppAutoComplete } from '../../components';
import { HelperService } from '../../services';

import styles from './styles';

import {
  zipcodesFiltersSelector,
  zipcodesListSelector,
  zipcodesLoadingSelector,
  updateFilters,
  abortPageRequests,
  getZipcodesForAutocomplete,
  zipcodesCountSelector,
  setPage,
  clearAutocomplete,
} from './modules';

const mapStateToProps = state => ({
  zipcodes: zipcodesListSelector(state),
  filters: zipcodesFiltersSelector(state),
  loading: zipcodesLoadingSelector(state),
  count: zipcodesCountSelector(state),
});

const mapDispatchToProps = {
  getZipcodesForAutocomplete,
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
class ZipCodeAutocomplete extends PureComponent {
  makeRequest(rest) {
    const { getZipcodesForAutocomplete, updateFilters, filters } = this.props;

    const body = { ...filters, ...rest };
    updateFilters(body);
    getZipcodesForAutocomplete({ body });
  }

  componentWillUnmount() {
    const { clearAutocomplete } = this.props;
    clearAutocomplete();
  }

  @autobind
  onInputChange(search) {
    if (search.length <= 5) {
      this.makeRequest({ search });
    }
  }

  @autobind
  onMenuScrollToBottom() {
    const {
      setPage,
      filters: { page },
      getZipcodesForAutocomplete,
    } = this.props;
    const body = { page: page + 1 };

    setPage(page + 1);
    getZipcodesForAutocomplete({ body });
  }

  @autobind
  onChange(option) {
    const { onChange, zipcodes } = this.props;
    const value = option ? option.value : '';
    const zipcode = zipcodes.find(zipcode => zipcode.value === value) || {
      label: '',
      value: '',
    };
    onChange(zipcode);
  }

  @autobind
  componentDidMount() {
    this.makeRequest();
  }

  render() {
    const { zipcodes, classes, wrapperClassName, ...rest } = this.props;

    return (
      <div
        className={`${classes.zipcodeAutocompleteWrapper} ${wrapperClassName}`}>
        <AppAutoComplete
          {...HelperService.pick(this.props, [
            'loading',
            'compareKey',
            'placeholder',
            'selectedOption',
            'withPagination',
            'value',
            'count',
          ])}
          isSearchable
          isCreatable={false}
          onMenuScrollToBottom={this.onMenuScrollToBottom}
          onInputChange={this.onInputChange}
          options={zipcodes}
          className="zipcode-autocomplete"
          onChange={this.onChange}
          {...rest}
        />
      </div>
    );
  }
}

ZipCodeAutocomplete.propTypes = {
  zipcodes: PropTypes.array,
  loading: PropTypes.bool,
  compareKey: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.object,
  wrapperClasses: PropTypes.string,
  placeholder: PropTypes.string,
};

ZipCodeAutocomplete.defaultProps = {
  placeholder: 'Select zip code',
  compareKey: 'label',
  wrapperClassName: '',
};

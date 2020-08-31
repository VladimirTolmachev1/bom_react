import React, { Component } from 'react';
import { autobind } from 'core-decorators';

import PropTypes from 'prop-types';
import { HelperService } from '../../../../services';

import './AppTableHeader.scss';

export class AppTableHeader extends Component {
  constructor(props) {
    super(props);
    this.searchTypeDebouncer = HelperService.debounce((...args) => {
      props.onSearchType(...args);
    }, props.debounceSearchTypeDelay);
  }

  @autobind
  onSearchType(event) {
    const search = event.target.value;
    this.searchTypeDebouncer(search);
  }

  render() {
    const { children, haveSearch } = this.props;

    return (
      <div className="voc-table_header-container">
        <div className="voc-table_header-custom-filters">{children}</div>
        {haveSearch ? false : null}
      </div>
    );
  }
}

AppTableHeader.propTypes = {
  haveSearch: PropTypes.bool,
  onSearchType: PropTypes.func,
  debounceSearchTypeDelay: PropTypes.number,
};
AppTableHeader.defaultProps = {
  debounceSearchTypeDelay: 500,
};

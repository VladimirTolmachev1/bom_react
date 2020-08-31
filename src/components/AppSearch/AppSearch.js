import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Search from '@material-ui/icons/Search';

import { autobind } from 'core-decorators';

import './AppSearch.scss';

export class AppSearch extends PureComponent {
  @autobind
  onChange(event) {
    const { onChange } = this.props;
    onChange({ search: event.target.value });
  }

  render() {
    const { className, label, search, onSearchClick } = this.props;

    return (
      <FormControl className={`${className} app-search-control`}>
        <InputLabel>{label}</InputLabel>
        <Input
          type="search"
          value={search}
          onChange={this.onChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={onSearchClick}>
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
  }
}

AppSearch.propTypes = {
  onSearchClick: PropTypes.func,
  onChange: PropTypes.func,
  search: PropTypes.string,
  className: PropTypes.string,
};
AppSearch.defaultProps = {};

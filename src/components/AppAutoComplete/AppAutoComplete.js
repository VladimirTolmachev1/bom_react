import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/lib/Creatable';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import { autobind } from 'core-decorators';
import { styles } from './AppAutoComplete.styles';
import { HelperService } from '../../services';

import {
  Control,
  // Option,
  MenuAutocomplete,
  NoOptionsMessage,
  Placeholder,
  SingleValue,
  ValueContainer,
  MultiValue,
} from './components';

const components = {
  Control,
  Menu: MenuAutocomplete,
  MultiValue,
  NoOptionsMessage,
  // Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

export default
@withStyles(styles, { withTheme: true })
class AppAutoComplete extends PureComponent {
  state = {
    customOptions: [],
    valuesToExclude: this.props.valuesToExclude,
  };

  constructor(props) {
    super(props);

    this.inputDebouncer = HelperService.debounce((...args) => {
      props.onInputChange(...args);
    }, 500);
  }

  @autobind
  onMenuScrollToBottom(...args) {
    // implementation of load pagination
    const { onMenuScrollToBottom, count, loading } = this.props;
    const options = this.getOptions();

    if (!loading && options.length < count) {
      onMenuScrollToBottom(...args);
    }
  }

  @autobind
  onCreateOption(option) {
    const { onChange } = this.props;
    const customValue = {
      label: option,
      value: option,
    };

    this.setState({
      customOptions: [...this.state.customOptions, customValue],
    });

    onChange(customValue);
  }

  getOptions() {
    const { options, optionFilter } = this.props;
    const { customOptions, valuesToExclude } = this.state;

    let resultOptions = options.concat(customOptions);

    if (valuesToExclude.length || optionFilter) {
      resultOptions = resultOptions.filter(option => {
        if (typeof optionFilter === 'function' && !optionFilter(option)) {
          return false;
        }

        if (
          valuesToExclude.length &&
          valuesToExclude.some(val => val === option.value)
        ) {
          return false;
        }

        return true;
      });
    }

    return resultOptions;
  }

  getSelectStyles() {
    const { theme } = this.props;

    return {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
      container: base => ({
        ...base,
        // height: '350px',
      }),
      indicatorSeparator: provided => ({
        ...provided,
        width: 0,
      }),
    };
  }

  @autobind
  handleChange(option) {
    const { onChange, exludeOptionsAfterSelection } = this.props;
    onChange(option);

    if (exludeOptionsAfterSelection) {
      this.setState({
        valuesToExclude: [...this.state.valuesToExclude, option.value],
      });
    }
  }

  getCommonSelectOptions() {
    const {
      value,
      selectedOption, // manualy set selected option from outer component
      compareKey,
      withPagination,
      textFieldProps,
      loading,
      classes,
    } = this.props;
    const options = this.getOptions();
    const selectValue =
      selectedOption ||
      options.find(item => item[compareKey] === value) ||
      null;

    const config = {
      ...HelperService.pick(this.props, [
        'onFocus',
        'isClearable',
        'placeholder',
        'isSearchable',
      ]),
      disabled: loading,
      isLoading: loading,
      onInputChange: this.inputDebouncer,
      classes,
      styles: this.getSelectStyles(),
      options,
      components,
      value: selectValue,
      formatCreateLabel: inputValue => `Select custom: ${inputValue}`,
      textFieldProps,
      onChange: this.handleChange,
    };

    if (withPagination) {
      config.onMenuScrollToBottom = this.onMenuScrollToBottom;
    }
    return config;
  }

  renderPlainSelect() {
    const { classes, autoCompleteWrpClasses } = this.props;
    return (
      <div className={`${classes.root} ${autoCompleteWrpClasses}`}>
        <Select {...this.getCommonSelectOptions()} />
      </div>
    );
  }

  render() {
    const { classes, isCreatable, autoCompleteWrpClasses } = this.props;

    if (!isCreatable) {
      return this.renderPlainSelect();
    }

    return (
      <div className={`${classes.root} ${autoCompleteWrpClasses}`}>
        <NoSsr>
          <CreatableSelect
            {...this.getCommonSelectOptions()}
            onCreateOption={this.onCreateOption}
          />
          <div className={classes.divider} />
        </NoSsr>
      </div>
    );
  }
}

AppAutoComplete.propTypes = {
  loading: PropTypes.bool,
  onFocus: PropTypes.func,
  count: PropTypes.number,
  classes: PropTypes.any,
  onInputChange: PropTypes.func,
  styles: PropTypes.any,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  isClearable: PropTypes.bool,
  onChange: PropTypes.func,
  theme: PropTypes.object,
  compareKey: PropTypes.string,
  isCreatable: PropTypes.bool,
  withPagination: PropTypes.bool,
  autoCompleteWrpClasses: PropTypes.string,
  textFieldProps: PropTypes.object,
};

AppAutoComplete.defaultProps = {
  autoCompleteWrpClasses: '',
  compareKey: 'value',
  isCreatable: true,
  withPagination: true,
  textFieldProps: {},
  valuesToExclude: [],
};

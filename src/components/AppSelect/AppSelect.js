import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { OutlinedInput } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { autobind } from 'core-decorators';

export class AppSelect extends PureComponent {
  allValues = this.props.options.map(({ value }) => value);

  mapOptions() {
    const { options } = this.props;

    return options.map(option => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {this.handleRenderOption(option)}
        </MenuItem>
      );
    });
  }

  // todo: separate renderOption and renderSelectedOption logic
  handleRenderOption(option, useGlobalOptionrender = true) {
    // if (!option) return null;

    if (typeof option.renderName === 'function') {
      return option.renderName(option);
    }

    const { renderOption } = this.props;

    if (useGlobalOptionrender && typeof renderOption === 'function') {
      return renderOption(option);
    }

    return option.name;
  }

  @autobind
  onChange(event) {
    const { onChange } = this.props;
    const { value, name } = event.target;

    onChange({ [name]: value });
  }

  @autobind
  onFocus(event) {
    const { onFocus } = this.props;
    onFocus && onFocus(event);
  }

  @autobind
  onBlur(event) {
    const { onBlur } = this.props;
    onBlur && onBlur(event);
  }

  @autobind
  getOptionPreviewByValue(val) {
    if (!val) {
      return val;
    }

    const option = this.props.options.find(({ value }) => value === val);

    return this.handleRenderOption(option, false);
  }

  @autobind
  defaultRenderValue(selected) {
    const { multiple } = this.props;

    if (!multiple) {
      return this.getOptionPreviewByValue(selected);
    }

    const toJoin = selected.map(this.getOptionPreviewByValue);

    return toJoin.join(', ');
  }

  render() {
    const {
      value,
      label,
      className,
      name,
      error,
      disabled,
      required,
      withoutNone,
      outlined,
      fullWidth,
      multiple,
      canSelectAll,
      renderValue,
      extraOptions,
      labelClassName,
      selectClasses,
      labelClasses,
      input,
    } = this.props;

    let inputComponent = input;

    if (!inputComponent && outlined) {
      inputComponent = <OutlinedInput />;
    }

    return (
      <FormControl
        required={required}
        className={className}
        fullWidth={fullWidth}>
        {label && (
          <InputLabel
            htmlFor={name}
            className={labelClassName}
            classes={labelClasses}>
            {label}
          </InputLabel>
        )}

        <Select
          error={error}
          required={required}
          disabled={disabled}
          name={name}
          value={value}
          renderValue={renderValue || this.defaultRenderValue}
          multiple={multiple}
          input={inputComponent}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          classes={selectClasses}>
          {!withoutNone && (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}

          {multiple && canSelectAll && (
            <MenuItem value="__SELECT_ALL_VALUES">
              <em>Select all</em>
            </MenuItem>
          )}

          {extraOptions}

          {this.mapOptions()}
        </Select>
      </FormControl>
    );
  }
}

AppSelect.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.any,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  withoutNone: PropTypes.bool,
};

AppSelect.defaultProps = {
  withoutNone: false,
  // eslint-disable-next-line react/default-props-match-prop-types
  options: [],
};

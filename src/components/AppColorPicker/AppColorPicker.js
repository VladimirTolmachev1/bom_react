import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import { autobind } from 'core-decorators';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import './AppColorPicker.scss';

export class AppColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
  };

  @autobind
  onSwatchClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  @autobind
  onCoverClick() {
    this.setState({ displayColorPicker: false });
  }

  @autobind
  onChange({ hex }) {
    const { onChange } = this.props;

    onChange(hex);
  }

  render() {
    const { value, label } = this.props;

    const colorStyles = {
      width: '36px',
      height: '14px',
      borderRadius: '2px',
      background: `${value}`,
    };

    return (
      <FormControlLabel
        className="color-picker__label"
        label={label}
        control={
          <div>
            <div className="color-picker__swatch" onClick={this.onSwatchClick}>
              <div style={colorStyles} />
            </div>
            {this.state.displayColorPicker ? (
              <div className="color-picker__popover">
                <div
                  className="color-picker__cover"
                  onClick={this.onCoverClick}
                />
                <SketchPicker color={value} onChange={this.onChange} />
              </div>
            ) : null}
          </div>
        }
      />
    );
  }
}

AppColorPicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  label: PropTypes.string.isRequired,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';

import './OutsideAlerter.scss';

export class OutsideAlerter extends Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  @autobind
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  @autobind
  isWrapperTarget(event) {
    return this.wrapperRef && !this.wrapperRef.contains(event.target);
  }

  @autobind
  handleClickOutside(event) {
    if (this.isWrapperTarget(event)) {
      this.props.handleClickOutside();
    }
  }

  getClassList() {
    return this.props.classList ? this.props.classList.join(' ') : '';
  }

  render() {
    return (
      <div
        ref={this.setWrapperRef}
        className={`outside-alerter ${this.getClassList()}`}>
        {this.props.children}
      </div>
    );
  }
}

OutsideAlerter.propTypes = {
  children: PropTypes.any.isRequired,
  handleClickOutside: PropTypes.func,
  classList: PropTypes.array,
};

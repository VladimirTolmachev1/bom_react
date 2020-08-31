import React from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { Toast } from '../Toast';
import './ToastList.scss';

export function ToastList({ toasts, removeToast }) {
  return (
    <TransitionGroup>
      {toasts.map(toast => {
        return (
          <CSSTransition key={toast.id} timeout={750} classNames="flip">
            <Toast {...toast} removeToast={removeToast} />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}

ToastList.propTypes = {
  removeToast: PropTypes.func,
  toasts: PropTypes.arrayOf(PropTypes.object),
};

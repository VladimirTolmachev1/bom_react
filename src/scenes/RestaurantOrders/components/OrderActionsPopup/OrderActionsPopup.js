import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import { Popup } from '../../../../components';
import {
  orderPopupActionsShape,
  orderShape,
} from '../../../../constants/propTypes';

const buildClickHandlrer = (target, handlers) => () => {
  handlers.forEach(handler => {
    handler && handler(target);
  });
};

const OrderActionsPopup = ({ actions, triggerClassName, order }) => (
  <Popup
    triggerProps={{
      className: triggerClassName,
    }}>
    {closePopup => (
      <MenuList>
        {actions.map(({ name, onClick, renderTitle, isVisible }) => {
          let shoulRender = true;
          if (typeof isVisible === 'function') {
            shoulRender = isVisible(order);
          }

          if (typeof isVisible === 'boolean') {
            shoulRender = isVisible;
          }

          if (!shoulRender) return null;

          return (
            <MenuItem
              onClick={buildClickHandlrer(order, [onClick, closePopup])}
              key={name}>
              {typeof renderTitle === 'function' ? renderTitle(order) : name}
            </MenuItem>
          );
        })}
      </MenuList>
    )}
  </Popup>
);

OrderActionsPopup.propTypes = {
  triggerClassName: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.shape(orderPopupActionsShape))
    .isRequired,
  order: PropTypes.oneOfType([PropTypes.shape(orderShape), PropTypes.object])
    .isRequired,
};

OrderActionsPopup.defaultProps = {
  triggerClassName: '',
};

export default OrderActionsPopup;

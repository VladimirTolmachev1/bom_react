import React from 'react';
import PropTypes from 'prop-types';
import { OrderCard } from '../OrderCard';

const styles = {
  display: 'inline-block',
  transform: 'rotate(5deg)',
  WebkitTransform: 'rotate(5deg)',
};

const propTypes = {
  order: PropTypes.object,
};

const OrderCardDragPreview = ({ order }) => {
  const width = `${order.originalCardWidth || 260}px`;
  const height = `${order.originalCardHeight || 260}px`;

  return (
    <div
      style={{
        ...styles,
        opacity: 1,
        width,
        height,
      }}>
      <OrderCard order={order} isPreview />
    </div>
  );
};

OrderCardDragPreview.propTypes = propTypes;

export default OrderCardDragPreview;

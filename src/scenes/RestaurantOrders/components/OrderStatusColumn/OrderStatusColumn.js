import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Typography, Grid, withStyles } from '@material-ui/core';
import { DropTarget } from 'react-dnd';

import styles from './styles';
import { dndItemTypes } from '../../../../constants';
import { DraggableOrderCard, OrderCard } from '..';
import {
  orderShape,
  orderPopupActionsShape,
} from '../../../../constants/propTypes';

const OrderStatusColumn = withStyles(styles)(
  ({
    name,
    orders,
    classes,
    orderPopupActions,
    OrderCardComponent,
    getRef,
    isOver,
    canDrop,
  }) => {
    let dropableClassName = '';

    if (canDrop) {
      dropableClassName = classes.dropTarget;
    }

    if (isOver && canDrop) {
      dropableClassName = classes.hoverForDrop;
    }

    return (
      <Grid
        className={classes.columnWrapper}
        item
        container
        direction="column"
        ref={getRef}>
        <Typography
          variant="subheading"
          align="center"
          className={classes.columnHeader}>
          {name}
        </Typography>

        <Grid
          className={`${classes.column} ${dropableClassName}`}
          direction="column"
          spacing={16}
          wrap="nowrap"
          container
          item>
          {orders.map(order => (
            <Grid item key={order.id}>
              <OrderCardComponent
                popupActions={orderPopupActions}
                order={order}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  },
);

OrderStatusColumn.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.node.isRequired,
  orders: PropTypes.arrayOf(PropTypes.shape(orderShape)),
  orderPopupActions: PropTypes.arrayOf(PropTypes.shape(orderPopupActionsShape)),
};

OrderStatusColumn.defaultProps = {
  orders: [],
  OrderCardComponent: OrderCard,
};

@DropTarget(
  dndItemTypes.ORDER,
  {
    canDrop(props, monitor) {
      const order = monitor.getItem();
      const { canDrop } = props;

      return canDrop ? canDrop(order, props) : true;
    },

    drop(props, monitor) {
      const order = monitor.getItem();
      const { handleDropOrder } = props;

      return handleDropOrder && handleDropOrder(order, props);
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)
class DropableOrderStatusColumn extends Component {
  orderStatusColumnRef = React.createRef();

  componentDidMount() {
    const { connectDropTarget } = this.props;

    // TODO: refactor
    // eslint-disable-next-line react/no-find-dom-node
    const node = ReactDOM.findDOMNode(this.orderStatusColumnRef.current);
    connectDropTarget(node);
  }

  render() {
    const {
      isOver,
      canDrop,
      connectDropTarget,
      ...orderStatusColumnProps
    } = this.props;

    return (
      <OrderStatusColumn
        {...orderStatusColumnProps}
        isDropable
        isOver={isOver}
        canDrop={canDrop}
        getRef={this.orderStatusColumnRef}
        OrderCardComponent={DraggableOrderCard}
      />
    );
  }
}

export { OrderStatusColumn, DropableOrderStatusColumn };

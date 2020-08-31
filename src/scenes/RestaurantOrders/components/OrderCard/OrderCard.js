import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Grid, Paper, withStyles, Typography } from '@material-ui/core';
import { getEmptyImage } from 'react-dnd-html5-backend';

import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { DragSource } from 'react-dnd';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import AlarmIcon from '@material-ui/icons/Alarm';
import styles from './styles';
import { OrderActionsPopup } from '../OrderActionsPopup';
import { OrderProductItem } from '../OrderProductItem';
import { orderStatuses, dndItemTypes } from '../../../../constants';
import {
  orderShape,
  orderPopupActionsShape,
} from '../../../../constants/propTypes';
import { Popup } from '../../../../components';
import { CurrencyService } from '../../../../services';

const OrderCard = withStyles(styles)(({ classes, popupActions, order }) => (
  <Paper className={classes.cardWrapper}>
    {order.status === orderStatuses.IN_DELIVERY && (
      <Typography color="textSecondary" className={classes.deliveryCaption}>
        <LocalShippingIcon className={classes.deliveryIcon} />
        (in delivery)
      </Typography>
    )}

    {(popupActions || []).length > 0 && (
      <OrderActionsPopup
        order={order}
        triggerClassName={classes.togglePopupBtn}
        actions={popupActions}
      />
    )}

    {order.products &&
      order.products.map(product => (
        <OrderProductItem key={product.id} product={product} />
      ))}

    <Grid container justify="space-between" className={classes.cardFooter}>
      <span>
        {order.comment && (
          <Popup
            triggerProps={{
              className: classes.iconBtn,
            }}
            triggerContent={<CommentIcon fontSize="inherit" />}>
            {order.comment}
          </Popup>
        )}

        {orderShape.sheduledDate && (
          <Popup
            triggerProps={{
              className: classes.iconBtn,
            }}
            triggerContent={<AlarmIcon fontSize="inherit" />}>
            {orderShape.sheduledDate}
          </Popup>
        )}
      </span>

      <span className={classes.orderPrice}>
        {`$${CurrencyService.show(order.total_price)}`}
      </span>
    </Grid>
  </Paper>
));

OrderCard.propTypes = {
  classes: PropTypes.object,
  order: PropTypes.shape(orderShape).isRequired,
  popupActions: PropTypes.arrayOf(PropTypes.shape(orderPopupActionsShape)),
};

@DragSource(
  dndItemTypes.ORDER,
  {
    beginDrag: (props, monitor, component) => {
      // eslint-disable-next-line react/no-find-dom-node
      const { clientWidth, clientHeight } = findDOMNode(component);
      return {
        ...props.order,
        originalCardHeight: clientHeight,
        originalCardWidth: clientWidth,
      };
    },
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }),
)
class DraggableOrderCard extends Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  render() {
    const {
      connectDragSource,
      isDragging,
      isPreview,
      ...orderCardProps
    } = this.props;

    const style = {
      opacity: isDragging ? 0 : 1,
    };

    return connectDragSource(
      <div style={style}>
        <OrderCard {...orderCardProps} />
      </div>,
    );
  }
}

export { OrderCard, DraggableOrderCard };

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import { withStyles } from '@material-ui/core';

import styles from './styles';
import './BookedItem.scss';
import { HelperService } from '../../../../services/HelperService';

export default
@withStyles(styles)
class BookedItem extends PureComponent {
  // TODO: MOVE IT TO PARANTS COMPONENT! Make this component stupid and simple, just a function
  onRemoveClick = event => {
    const {
      dish: { uuid },
      removeDishFromOrder,
    } = this.props;
    event.preventDefault();

    removeDishFromOrder(uuid);
  };

  render() {
    const {
      dish: { name, totalPrice, selectedSize, amount },
      classes,
    } = this.props;

    return (
      <div className="booked-item">
        <div className="booked-item__count">
          <IconButton
            color="primary"
            aria-label="Add"
            onClick={this.onRemoveClick}>
            <Clear />
          </IconButton>
        </div>
        {/* TODO: Remove all scss classes and replace spans and divs with mui Typography */}
        <div className="booked-item__description">
          <div className="booked-item__description-name">
            {(selectedSize || {}).name && (
              <span>{` ${selectedSize.name} `}</span>
            )}
            {name} X{amount}
          </div>

          <div className={classes.price}>
            $ {HelperService.formatCurrency(totalPrice)}
          </div>
        </div>
      </div>
    );
  }
}

BookedItem.propTypes = {
  dish: PropTypes.object,
  removeDishFromOrder: PropTypes.func,
};

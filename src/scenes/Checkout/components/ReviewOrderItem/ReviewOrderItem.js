import React, { PureComponent } from 'react';
import { Grid, Paper, withStyles, Typography } from '@material-ui/core';
import { autobind } from 'core-decorators';

import styles from './styles';
import { DishPicture, DishExtrasChips } from '../../../../components';
import { CurrencyService } from '../../../../services';

import { ReviewOrderItemTitle } from '../ReviewOrderItemTitle';

export default
@withStyles(styles)
class ReviewOrderItem extends PureComponent {
  @autobind
  onEditClick() {
    const { handleEditOrderItemClick, item } = this.props;
    handleEditOrderItemClick && handleEditOrderItemClick(item);
  }

  @autobind
  onRemoveClick() {
    const { handleRemoveOrderItemClick, item } = this.props;
    handleRemoveOrderItemClick && handleRemoveOrderItemClick(item);
  }

  render() {
    const {
      classes,

      item: {
        name,
        amount,
        description,
        picture,
        totalPrice,
        selectedExtras = [],
        selectedSize,
      },
    } = this.props;

    const { name: sizeName } = selectedSize || {};

    return (
      <Paper className={classes.reviewOrderItem}>
        <Grid
          container
          justify="space-between"
          spacing={16}
          wrap="nowrap"
          className={classes.reviewOrderItemGrid}>
          <Grid
            container
            item
            alignItems="flex-start"
            direction="column"
            className={classes.dishPictureWrapper}>
            <DishPicture src={picture} className={classes.dishPicture} />

            <Typography variant="title" className={classes.totalPriceCaption}>
              Total price: ${CurrencyService.show(totalPrice)}
            </Typography>
          </Grid>

          <Grid item className={classes.reviewItemBody}>
            <ReviewOrderItemTitle
              name={name}
              sizeName={sizeName}
              amount={amount}
              onEditClick={this.onEditClick}
              onRemoveClick={this.onRemoveClick}
            />

            {description && (
              <div className={classes.reviewItemDescription}>{description}</div>
            )}

            {selectedExtras.length > 0 && (
              <DishExtrasChips
                title="Selected extras:"
                extras={selectedExtras}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

ReviewOrderItem.propTypes = {};

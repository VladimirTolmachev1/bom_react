import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FieldArray, Field, reduxForm } from 'redux-form';
import { autobind } from 'core-decorators';
import { Grid, Typography, withStyles } from '@material-ui/core';

import styles from './styles';
import { ClientExtrasLists } from './components/ClientExtrasLists';
import { ClientMultiselectionExtras } from './components/ClientMultiselectionExtras';
import { DishTitle, DishSizesSelect } from '../..';
import { orderItemFormValuesSelector } from '../selectors';
import { ORDER_ITEM_FORM } from '../constants/form.names';

const mapStateToProps = state => ({
  orderItem: orderItemFormValuesSelector(state),
});

export default
@withStyles(styles)
@connect(mapStateToProps)
@reduxForm({
  form: ORDER_ITEM_FORM,
  enableReinitialize: true,
  destroyOnUnmount: false,
})
class OrderItemForm extends PureComponent {
  static propTypes = {
    change: PropTypes.func.isRequired,
    classes: PropTypes.object,
    orderItem: PropTypes.shape({
      sizes: PropTypes.array,
      selectedSize: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
      extras: PropTypes.array,
      name: PropTypes.string,
      amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      totalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  };

  @autobind
  setDishAmount(amount) {
    const { change } = this.props;
    change('amount', amount);
  }

  @autobind
  increaseDishAmount() {
    const {
      orderItem: { amount },
    } = this.props;
    const newAmount = amount + 1;
    this.setDishAmount(newAmount);
  }

  @autobind
  decreaseDishAmount() {
    const {
      orderItem: { amount },
    } = this.props;
    const newAmount = amount - 1;
    this.setDishAmount(newAmount);
  }

  render() {
    const {
      classes,
      orderItem: {
        name,
        amount,
        selectedSize,
        totalPrice,
        sizes = [],
        extras = [],
      },
    } = this.props;

    return (
      <Grid container spacing={32} wrap="wrap" direction="column">
        <DishTitle
          name={name}
          price={totalPrice}
          sizeName={(selectedSize || {}).name}
          amount={amount}
          canEdit
          onAddClick={this.increaseDishAmount}
          onSubstructClick={this.decreaseDishAmount}
          withoutDelete
        />

        {sizes.length > 0 && (
          <Grid item className={classes.sizesSelectSection}>
            <Field
              name="selectedSize"
              options={sizes}
              component={DishSizesSelect}
            />
          </Grid>
        )}

        <FieldArray
          name="extra_lists"
          component={ClientExtrasLists}
          change={this.props.change}
          selectedSizeId={(selectedSize || {}).id}
        />

        {extras.length > 0 && (
          <Grid container item direction="column">
            <Grid item>
              <Typography variant="subtitle1">
                Single extras (select multiple)
              </Typography>
            </Grid>
            <FieldArray
              name="extras"
              component={ClientMultiselectionExtras}
              selectedSizeId={(selectedSize || {}).id}
              change={this.props.change}
            />
          </Grid>
        )}
      </Grid>
    );
  }
}

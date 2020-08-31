import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, defaultShouldError } from 'redux-form';
import { Grid, withStyles, FormHelperText } from '@material-ui/core';

import { autobind } from 'core-decorators';
import { GridReduxFormField } from '../../GridReduxFormField';
import { AppDropzone } from '../../AppDropzone';
import { FormTextField } from '../../FormTextField';

import styles from './styles';
import validate from './dish-info.validations';
import { DISH_INFO_FORM } from '../constants/form.names';
import {
  dishInfoFormFieldSelector,
  sizesFormFieldSelector,
} from '../selectors';

const mapStateToProps = state => ({
  picture: dishInfoFormFieldSelector(state, 'picture'),
  sizesFormValues: sizesFormFieldSelector(state, 'sizes') || [], // required for validation
});

export default
@withStyles(styles)
@connect(mapStateToProps)
@reduxForm({
  form: DISH_INFO_FORM,
  enableReinitialize: true,
  validate,
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,

  shouldError: params => {
    const { props, nextProps } = params;

    if (nextProps && props.sizes !== nextProps.sizes) {
      return true;
    }

    return defaultShouldError(params);
  },
})
class DishInfoForm extends PureComponent {
  @autobind
  onDrop(accepted) {
    const { change } = this.props;
    change('picture', accepted);
  }

  render() {
    const { picture, sizesFormValues, classes, initialSizes } = this.props;

    const isPriceDisabled = !!initialSizes.length || !!sizesFormValues.length;

    return (
      <Grid
        container
        spacing={16}
        justify="space-between"
        alignItems="stretch"
        alignContent="stretch"
        className={classes.formWrapper}>
        <Grid
          container
          item
          direction="column"
          className={classes.infoSecrion}
          spacing={16}>
          <GridReduxFormField
            name="name"
            label="Dish name"
            component={FormTextField}
            withoutCaption
            fullWidth
            required
          />

          <Grid item>
            <Field
              name="price"
              type="number"
              rows={3}
              label="Dish price"
              component={FormTextField}
              disabled={isPriceDisabled}
              withoutCaption
              forceTouched
              fullWidth
              required
            />

            {isPriceDisabled && (
              <FormHelperText color="secondary">
                Dish price is automatically disabled when sizes are added.
              </FormHelperText>
            )}
          </Grid>

          <GridReduxFormField
            name="description"
            rows={3}
            multiline
            label="Dish description"
            component={FormTextField}
            withoutCaption
            fullWidth
          />
        </Grid>

        <Grid
          container
          item
          className={classes.imageSection}
          justify="center"
          alignItems="center">
          <AppDropzone
            wrapperClassName={classes.dropZoneWrapper}
            className={classes.dropZone}
            file={picture}
            label="Dish image"
            id="dish-modal-dropzone"
            onDrop={this.onDrop}
            accept={['image/*']}
          />
        </Grid>
      </Grid>
    );
  }
}

DishInfoForm.propTypes = {
  change: PropTypes.func,
  picture: PropTypes.any,
};
DishInfoForm.defaultProps = {
  initialSizes: [],
};

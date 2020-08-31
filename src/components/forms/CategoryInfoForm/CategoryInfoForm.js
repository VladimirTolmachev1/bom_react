import React, { PureComponent } from 'react';
import { reduxForm } from 'redux-form';
import { Grid } from '@material-ui/core';

import validate from './CategoryInfo.validation';
import { GridReduxFormField } from '../../GridReduxFormField';
import { FormTextField } from '../../FormTextField';

import { CATEGORY_INFO_FORM } from '../constants/form.names';

export default
@reduxForm({
  form: CATEGORY_INFO_FORM,
  enableReinitialize: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
  keepDirtyOnReinitialize: true,
  validate,
})
class CategoryInfoForm extends PureComponent {
  render() {
    return (
      <Grid container direction="culumn" spacing={8}>
        <GridReduxFormField
          name="name"
          label="Category name"
          component={FormTextField}
          withoutCaption
          fullWidth
          required
        />
        <GridReduxFormField
          name="description"
          rows={3}
          multiline
          label="Category description"
          component={FormTextField}
          withoutCaption
          fullWidth
        />
      </Grid>
    );
  }
}

import React, { PureComponent } from 'react';
import { reduxForm, FieldArray } from 'redux-form';

import { Grid } from '@material-ui/core';

import validate from './extras.validation';
import { ExtrasList, GroupedExtrasList } from './components';
import { EXTRAS_FORM } from '../constants/form.names';

export default
@reduxForm({
  form: EXTRAS_FORM,
  enableReinitialize: true,
  validate,
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
})
class ExtrasForm extends PureComponent {
  render() {
    const {
      sizesOptions,
      canSetTargetSize,
      GroupedExtrasListsComponent,
      extrasSectionHeader,
      extrasListsSectionHeader,
    } = this.props;
    return (
      <Grid container direction="column" alignItems="flex-start" spacing={32}>
        <Grid item container direction="column" alignItems="flex-start">
          {extrasSectionHeader}
          <FieldArray
            name="extras"
            component={ExtrasList}
            btnContent="Add single extra"
            sizesOptions={sizesOptions}
            canSetTargetSize={canSetTargetSize}
          />
        </Grid>

        <Grid item container direction="column" alignItems="flex-start">
          {extrasListsSectionHeader}
          <FieldArray
            name="extra_lists"
            component={GroupedExtrasListsComponent || GroupedExtrasList}
            sizesOptions={sizesOptions}
            canSetTargetSize={canSetTargetSize}
          />
        </Grid>
      </Grid>
    );
  }
}

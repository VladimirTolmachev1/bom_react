import React, { PureComponent } from 'react';
import { reduxForm, FieldArray } from 'redux-form';

import validate from './sizes.validation';
import { SizesList } from './components';
import { SIZES_FORM } from '../constants/form.names';

export default
@reduxForm({
  form: SIZES_FORM,
  enableReinitialize: true,
  validate,
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
})
class SizesForm extends PureComponent {
  render() {
    return (
      <>
        <FieldArray name="sizes" component={SizesList} />
      </>
    );
  }
}

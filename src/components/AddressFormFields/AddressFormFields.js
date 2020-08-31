import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { ZipCodeAutoComplete } from '../../scenes/ZipCodeAutoComplete';
import { ValidationService } from '../../services';
import { AppFormTextField } from '../AppFormTextField';

const AddressFormFields = ({ zipcode, onChangeZipCode }) => (
  <>
    <Field
      required
      type="text"
      name="street_address"
      label="Street address"
      validate={ValidationService.required}
      component={AppFormTextField}
    />

    <Field
      multiline
      type="text"
      name="building"
      label="Building"
      validate={ValidationService.required}
      component={AppFormTextField}
    />

    <Field
      multiline
      type="text"
      name="appartment"
      label="Apartment"
      component={AppFormTextField}
    />

    <ZipCodeAutoComplete
      value={zipcode}
      compareKey="value"
      onChange={onChangeZipCode}
    />

    <Field
      required
      multiline
      type="text"
      name="city"
      label="City"
      validate={ValidationService.required}
      component={AppFormTextField}
    />
  </>
);

AddressFormFields.propTypes = {
  zipcode: PropTypes.string,
  onChangeZipCode: PropTypes.func.isRequired,
};

export default AddressFormFields;

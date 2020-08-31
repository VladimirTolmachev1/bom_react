import React from 'react';
import { Field } from 'redux-form';

import { FormRadio } from '../../../../FormRadio';

const SingleExtraRadioOption = ({ input, radioFieldName, label, ...rest }) => {
  return (
    <Field
      name={radioFieldName}
      component={FormRadio}
      radioValue={input.value}
      {...rest}
      label={label}
    />
  );
};

export default SingleExtraRadioOption;

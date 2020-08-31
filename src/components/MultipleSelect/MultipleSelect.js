import React from 'react';
import { Checkbox, ListItemText } from '@material-ui/core';

import { AppSelect } from '../AppSelect';

const MultipleSelect = props => {
  const {
    classes,
    value,
    onChange,
    renderValue,

    input,

    fields,
    inputComponent,

    ...rest
  } = props;

  return (
    <AppSelect
      renderOption={({ name, value }) => (
        <>
          <Checkbox checked={input.value.includes(value)} />
          <ListItemText primary={name} />
        </>
      )}
      {...rest}
      {...input}
      input={inputComponent}
      value={input.value || []}
      onChange={data => {
        input.onChange(data[input.name]);
      }}
      multiple
    />
  );
};

export default MultipleSelect;

import React from 'react';
import TextField from '@material-ui/core/TextField';

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

export const Control = props => {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
          ...((props.selectProps.textFieldProps || {}).inputProps || {}),
        },
      }}
      {...props.selectProps.textFieldProps || {}}
    />
  );
};

Control.propTypes = {};
Control.defaultProps = {};

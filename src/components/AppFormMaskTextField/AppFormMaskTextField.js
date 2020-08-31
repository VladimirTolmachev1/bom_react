import React from 'react';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';

import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const TextMaskCustom = props => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      // keepCharPositions
      // placeholderChar={'\u2000'}
      ref={inputRef}
      // showMask
    />
  );
};

export const AppFormMaskTextField = ({
  input,
  onChangeInterseptor,
  className,
  label,
  required,
  mask,
  meta: { touched, error },
}) => {
  return (
    <div className={`${className} app-form-control__container`}>
      <FormControl className="app-form-control">
        {label && (
          <InputLabel htmlFor="formatted-text-mask-input">
            {label + (required ? ' * ' : '')}
          </InputLabel>
        )}
        <Input
          type="text"
          required={required}
          variant="outlined"
          id="formatted-text-mask-input"
          error={Boolean(touched && error)}
          inputComponent={TextMaskCustom}
          inputProps={{
            mask,
          }}
          {...input}
          onChange={(...args) => {
            const { value } = args[0].target;
            input.onChange(...args);
            onChangeInterseptor && onChangeInterseptor(value);
          }}
          value={input.value || ' '}
        />
      </FormControl>
      {touched && error ? (
        <FormHelperText className="app-form-control__error">
          {error}
        </FormHelperText>
      ) : (
        false
      )}
    </div>
  );
};

AppFormMaskTextField.propTypes = {
  className: PropTypes.string,
};

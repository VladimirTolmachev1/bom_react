import React from 'react';
import classNames from 'classnames';
import { Input, MenuItem, withStyles } from '@material-ui/core';

import styles from './styles';
import { MultipleSelect } from '../../../../MultipleSelect';
import { GridReduxFormField } from '../../../../GridReduxFormField';

export const SizesRestrictionsSelect = ({
  options,
  name,
  label,
  explainText,
  classes,
  wrapperClassName,
}) => (
  <GridReduxFormField
    name={name}
    withoutCaption
    component={MultipleSelect}
    options={options}
    fullWidth
    withoutNone
    label={label}
    gridProps={{
      className: classNames(classes.selectWrapper, wrapperClassName),
    }}
    inputComponent={
      <Input
        classes={{
          root: classes.sizesRestrictionsSelect,
        }}
      />
    }
    labelClasses={{
      root: classes.sizesRestrictionsSelectLabelRoot,
      shrink: classes.sizesRestrictionsSelectLabelShrink,
    }}
    extraOptions={[
      <MenuItem key="default_selected" value="" disabled>
        <em> {explainText} </em>
      </MenuItem>,
    ]}
  />
);

SizesRestrictionsSelect.defaultProps = {
  label: 'Sizes restrictions',
  explainText: 'Sizes restrictions',
};

export default withStyles(styles)(SizesRestrictionsSelect);

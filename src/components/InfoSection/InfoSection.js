import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, withStyles } from '@material-ui/core';

import { FormTextField } from '../FormTextField';
import { GridReduxFormField } from '../GridReduxFormField';

import styles from './styles';

const renderInfoBlock = ({ label, value, name }) => (
  <Grid item key={label + value + name}>
    <Typography variant="caption"> {label} </Typography>
    <Typography> {value} </Typography>
  </Grid>
);

const renderEditingInfoClock = (
  { label, value, name, component, renderEditing, ...itemProps },
  generalItemProps,
) => {
  if (typeof renderEditing === 'function') {
    return renderEditing();
  }

  return (
    <GridReduxFormField
      key={label + name}
      label={label}
      name={name}
      value={value}
      component={component || FormTextField}
      withoutCaption
      {...generalItemProps}
      {...itemProps || {}}
    />
  );
};

const InfoSection = ({
  header,
  items,
  classes,
  className,
  isEditing,
  editingItemsProps,
}) => {
  const renderItem = isEditing ? renderEditingInfoClock : renderInfoBlock;

  return (
    <>
      <Grid
        container
        item
        spacing={16}
        className={`${classes.itemsWrapper} ${className}`}
        direction="column">
        <Typography variant="subheading">{header}</Typography>
        {items.map(item => renderItem(item, editingItemsProps))}
      </Grid>
    </>
  );
};

InfoSection.propTypes = {
  header: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string, // value to display when isEditing === false
      renderEditing: PropTypes.func, // custom item render when isEditing === true
    }),
  ).isRequired,
  classes: PropTypes.object,
  className: PropTypes.string,
  editingItemsProps: PropTypes.object, // props, that applies to each default items when isEditing === true
};

InfoSection.defaultProps = {
  className: '',
  editingItemsProps: {},
};

export default withStyles(styles)(InfoSection);

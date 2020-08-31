import React from 'react';
import classNames from 'classnames';
import AddIcon from '@material-ui/icons/Add';
import SubstructIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles, Grid, IconButton } from '@material-ui/core';

import styles from './styles';

const makeHandler = (target, handler) =>
  handler ? () => handler(target) : undefined;

const EditActions = ({
  addBtnProps,
  removeBtnProps,
  substractBtnProps,
  onAddClick,
  onSubstructClick,
  wrapperClassName,
  onRemoveClick,
  gridProps,
  withoutDelete,
  classes,
  disabled,
  target,
}) => (
  <Grid
    container
    wrap="nowrap"
    justify="center"
    alignItems="center"
    className={classNames(classes.actionsWrapper, wrapperClassName)}
    {...gridProps}>
    <IconButton
      className={classes.actionBtn}
      onClick={makeHandler(target, onAddClick)}
      disabled={disabled}
      {...addBtnProps}>
      <AddIcon fontSize="inherit" />
    </IconButton>
    <IconButton
      className={classes.actionBtn}
      onClick={makeHandler(target, onSubstructClick)}
      disabled={disabled}
      {...substractBtnProps}>
      <SubstructIcon fontSize="inherit" />
    </IconButton>

    {!withoutDelete && (
      <IconButton
        className={classes.actionBtn}
        onClick={makeHandler(target, onRemoveClick)}
        disabled={disabled}
        {...removeBtnProps}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    )}
  </Grid>
);

EditActions.defaultProps = {
  addBtnProps: {},
  substractBtnProps: {},
  removeBtnProps: {},
  gridProps: {},
  disabled: false,
};
export default withStyles(styles)(EditActions);

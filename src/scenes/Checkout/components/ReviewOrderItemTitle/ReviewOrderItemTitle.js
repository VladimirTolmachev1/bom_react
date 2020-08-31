import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';
import { Grid, withStyles, Typography, IconButton } from '@material-ui/core';

import styles from './styles';

const ReviewOrderItemTitle = ({
  name,
  amount,
  classes,
  sizeName,
  onRemoveClick,
  onEditClick,
}) => (
  <Grid container justify="space-between" alignItems="flex-start" wrap="nowrap">
    <Grid container item>
      <Typography
        className={classNames(classes.dishDialogTitle)}
        variant="title">
        {sizeName && `${sizeName} `}
        {name} {amount && <span className={classes.amount}>({amount})</span>}
      </Typography>
    </Grid>

    <Grid
      item
      container
      alignItems="center"
      justify="flex-end"
      className={classes.widthAuto}
      wrap="nowrap">
      <IconButton onClick={onEditClick} className={classes.actionBtn}>
        <EditIcon fontSize="inherit" />
      </IconButton>

      <IconButton onClick={onRemoveClick} className={classes.actionBtn}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Grid>
  </Grid>
);

ReviewOrderItemTitle.propTypes = {
  name: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  sizeName: PropTypes.string,
  onEditClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default withStyles(styles)(ReviewOrderItemTitle);

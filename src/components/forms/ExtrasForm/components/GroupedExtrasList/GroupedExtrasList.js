import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import { FieldArray } from 'redux-form';
import { Grid, IconButton, Button, withStyles } from '@material-ui/core';

import styles from './styles';
import { ExtrasList } from '../ExtrasList';
import {
  GridReduxFormField,
  FormCheckbox,
  SmallGridReduxFormInput,
} from '../../../..';

const GroupedExtrasList = ({
  fields,
  classes,
  canSetTargetSize,
  sizesOptions,
}) => (
  <Grid
    container
    direction="column"
    alignItems="flex-start"
    spacing={32}
    className={classes.groupedExtrasLists}>
    {fields.map((field, index) => (
      <Grid
        item
        container
        justify="space-between"
        className={classes.groupedExtrasListItem}
        spacing={8}>
        <SmallGridReduxFormInput
          label="List name"
          name={`${field}.name`}
          gridClassName={classes.extrasListName}
        />
        <GridReduxFormField
          name={`${field}.multi_selection`}
          label="Allow multiselection"
          gridProps={{
            className: classes.multiselectionCheckbox,
            justify: 'flex-start',
          }}
          component={FormCheckbox}
          withoutCaption
        />
        <Grid
          item
          container
          className={classes.deleteIconWrapper}
          justify="flex-end"
          alignItems="center">
          <IconButton onClick={() => fields.remove(index)}>
            <ClearIcon />
          </IconButton>
        </Grid>

        <Grid item className={classes.extrasList}>
          <FieldArray
            name={`${field}.items`}
            component={ExtrasList}
            addBtnClassName={classes.addExtraBtn}
            btnContent={
              <>
                {' '}
                <AddIcon fontSize="inherit" /> add extra{' '}
              </>
            }
            sizesOptions={sizesOptions}
            canSetTargetSize={canSetTargetSize}
          />
        </Grid>
      </Grid>
    ))}

    <Button
      onClick={() => fields.push({ multi_selection: false })}
      color="primary">
      Add extras list
    </Button>
  </Grid>
);

export default withStyles(styles)(GroupedExtrasList);

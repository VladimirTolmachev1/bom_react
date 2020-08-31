import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import { FieldArray, Field } from 'redux-form';
import { Grid, IconButton, Typography, withStyles } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import styles from './styles';
import { SizesRestrictionsSelect } from '../../../../../../components/forms/ExtrasForm/components';

import {
  ReduxFieldPreview,
  ReduxCheckboxFieldPreview,
} from '../../../../../../components/forms/common/redux-field-previews';

import { SmallCell } from '../../../../../../components/tables';

const ExtrasPreview = ({ fields, sizesOptions }) => (
  <Table container padding="none">
    <TableBody>
      {fields.map(field => (
        <TableRow>
          <SmallCell>
            <Field name={`${field}.name`} component={ReduxFieldPreview} />
          </SmallCell>

          <SmallCell>
            <Field
              name={`${field}.price`}
              component={ReduxFieldPreview}
              transformValue={price => `$ ${price}`}
            />
          </SmallCell>

          <SmallCell align="right">
            <Grid container justify="flex-end" alignItems="center">
              <SizesRestrictionsSelect
                name={`${field}.sizes`}
                options={sizesOptions}
              />
            </Grid>
          </SmallCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const ExtrasListsPreview = ({ fields, classes, sizesOptions }) => (
  <>
    {fields.length > 0 && (
      <Typography variant="subtitle1">Attached extra lists:</Typography>
    )}

    <Grid
      container
      alignItems="flex-start"
      spacing={32}
      className={classes.extrasListsWrapper}>
      {fields.map((field, index) => (
        <Grid
          item
          container
          justify="space-between"
          alignItems="center"
          className={classes.extrasListItem}
          spacing={8}>
          <Grid
            item
            container
            alignItems="center"
            className={classes.extraListInfo}
            spacing={16}>
            <Field name={`${field}.name`} component={ReduxFieldPreview} />

            <Field
              name={`${field}.multi_selection`}
              component={ReduxCheckboxFieldPreview}
              checkedText="( with multiselection )"
              uncheckedText="( without multiselection )"
            />
          </Grid>

          <Grid
            item
            className={classes.deleteIconWrapper}
            justify="flex-end"
            alignItems="center">
            <IconButton onClick={() => fields.remove(index)}>
              <ClearIcon />
            </IconButton>
          </Grid>

          <Grid item container className={classes.extraItem}>
            <FieldArray
              name={`${field}.items`}
              component={ExtrasPreview}
              sizesOptions={sizesOptions}
            />
          </Grid>
        </Grid>
      ))}
    </Grid>
  </>
);

export default withStyles(styles)(ExtrasListsPreview);

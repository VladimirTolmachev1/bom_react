import React from 'react';
import { Field } from 'redux-form';
import { TableRow, Typography, withStyles } from '@material-ui/core';

import styles from './styles';
import { EditActions, FormCheckbox } from '../../../..';
import { SmallCell } from '../../../../tables';
import { CurrencyService } from '../../../../../services';

const ExtrasFormTableRow = ({ field, extra, change, classes }) => (
  <TableRow key={field}>
    <SmallCell className={classes.controlCell}>
      <Field
        name={`${field}.selected`}
        component={FormCheckbox}
        onChange={(e, value, _, name) => {
          change(name, value);
          change(`${field}.amount`, value ? 1 : 0);
        }}
      />
    </SmallCell>

    <SmallCell>
      <Typography>
        {extra.name} {extra.selected && `(${extra.amount})`}
      </Typography>
    </SmallCell>

    <SmallCell className={classes.priceCell}>
      <Typography align="right">
        $ {CurrencyService.show(+extra.price * (extra.amount || 1))}
      </Typography>
    </SmallCell>

    <SmallCell align="right" className={classes.controlCell}>
      <EditActions
        withoutDelete
        disabled={!extra.selected}
        onAddClick={() => change(`${field}.amount`, extra.amount + 1)}
        onSubstructClick={() => change(`${field}.amount`, extra.amount - 1)}
        substractBtnProps={{
          disabled: !extra.selected || !extra.amount || extra.amount <= 1,
        }}
        gridProps={{
          justify: 'flex-end',
        }}
      />
    </SmallCell>
  </TableRow>
);

export default withStyles(styles)(ExtrasFormTableRow);

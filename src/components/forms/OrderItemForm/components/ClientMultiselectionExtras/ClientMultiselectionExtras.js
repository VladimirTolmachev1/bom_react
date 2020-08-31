import React from 'react';
import { Table, TableBody } from '@material-ui/core';

import { ExtrasFormTableRow } from '../ExtrasFormTableRow';
import { isNotSatisfiesSizesLimits } from '../../../../../modules/dishes';

const ClientMultiselectionExtras = ({ fields, change, selectedSizeId }) => (
  <Table padding="none">
    <TableBody>
      {fields.map((field, index) => {
        const extra = fields.get(index);

        if (isNotSatisfiesSizesLimits(extra, selectedSizeId)) {
          extra.selected && change(`${field}.selected`, false);
          return null;
        }

        return (
          <ExtrasFormTableRow
            key={field}
            field={field}
            extra={extra}
            change={change}
          />
        );
      })}
    </TableBody>
  </Table>
);

export default ClientMultiselectionExtras;

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import styles from './styles';
import { EditActions } from '../EditActions';
import { CurrencyService } from '../../services';

const Cell = withStyles(theme => ({
  root: {
    padding: '2% 4% 2% 4%',
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px !important',
      padding: '3% 1% 3% 2%',
    },

    '&:last-child': {
      paddingRight: '4%',
    },
  },
}))(TableCell);

const DishTableRow = withStyles({
  root: {
    height: 'auto',
  },
})(TableRow);

const DishExtrasTable = ({
  title,
  extras,
  classes,
  onAddClick,
  onSubstructClick,
  wrapperClassName,
  onRemoveClick,
  noExtras,
}) => {
  const isSm = useMediaQuery('screen and (max-width: 400px)');

  if (!extras.length) {
    return noExtras;
  }

  return (
    <Paper className={wrapperClassName}>
      <Typography
        variant="subtitle1"
        id="tableTitle"
        className={classes.tableTitle}>
        {title}
      </Typography>

      <Table className={classes.dishTable}>
        <TableHead>
          <DishTableRow>
            <Cell> Name </Cell>
            <Cell align="right"> {isSm ? 'X' : 'Amount'}</Cell>
            <Cell align="right"> Price </Cell>
            <Cell align="center"> Edit </Cell>
          </DishTableRow>
        </TableHead>
        <TableBody>
          {extras.map(extra => (
            <DishTableRow key={extra.id}>
              <Cell component="th" scope="row">
                {extra.name}
              </Cell>

              <Cell align="right">{extra.amount}</Cell>

              <Cell align="right" className={classes.priceCell}>
                $ {CurrencyService.show(extra.price)}
              </Cell>

              <Cell align="right">
                <EditActions
                  onAddClick={onAddClick}
                  onSubstructClick={onSubstructClick}
                  onRemoveClick={onRemoveClick}
                  target={extra}
                  substractBtnProps={{
                    disabled: extra.amount <= 1,
                  }}
                />
              </Cell>
            </DishTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(DishExtrasTable);

DishExtrasTable.defaultProps = {
  title: 'Selected extras',
  wrapperClassName: '',
  noExtras: null,
  extras: [],
};

DishExtrasTable.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.object,
  extras: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.number,
      amount: PropTypes.number,
    }),
  ),
  onAddClick: PropTypes.func,
  onSubstructClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
  wrapperClassName: PropTypes.string,
  noExtras: PropTypes.node,
};

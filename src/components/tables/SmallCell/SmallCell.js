import { withStyles, TableCell } from '@material-ui/core';

const SmallCell = withStyles(theme => ({
  root: {
    border: 'none',
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px !important',
    },

    // '&:last-child': {
    //     paddingRight: '4%'
    // }
  },
}))(TableCell);

export default SmallCell;

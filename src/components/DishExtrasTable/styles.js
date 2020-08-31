export default theme => ({
  tableTitle: {
    padding: '2% 4% 0 2%',
    fontWeight: '500',
  },

  dishTable: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px !important',
    },
  },

  priceCell: {
    whiteSpace: 'nowrap',
  },
});

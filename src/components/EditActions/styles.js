export default theme => ({
  actionsWrapper: {
    width: 'auto',
  },

  actionBtn: {
    padding: 0,
    marginLeft: '0.5rem',
    fontSize: '1.3rem',
    '&:hover': {
      color: theme.palette.primary.main,
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
});

export default theme => ({
  modalBtn: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem',
    },
  },
  submitBtn: {
    marginLeft: theme.spacing.unit * 2,
  },

  closeBtn: {
    position: 'absolute',
    right: 5,
    top: 12,
  },

  title: {
    paddingRight: 55,
  },
});

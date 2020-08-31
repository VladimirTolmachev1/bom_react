export default theme => ({
  amount: {
    color: theme.palette.text.secondary,
  },

  widthAuto: {
    width: 'auto',
  },

  actionBtn: {
    padding: 0,
    marginLeft: '0.5rem',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '@media screen and (max-width: 600px)': {
      fontSize: '1.2rem !important',
    },
  },

  dishDialogTitle: {
    paddingBottom: '1.2rem',

    '@media screen and (max-width: 600px)': {
      fontSize: '1rem !important',
    },
  },
});

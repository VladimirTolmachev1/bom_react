export default theme => ({
  mainWrapper: {
    '@media screen and (max-width: 600px)': {
      alignItems: 'flex-start',
    },
  },

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
      fontSize: '1.1rem !important',
    },
  },

  dishDialogTitle: {
    '@media screen and (max-width: 600px)': {
      fontSize: '0.9rem !important',
    },
  },

  mainSection: {
    alignSelf: 'stretch',
    alignContent: 'center',
  },
});

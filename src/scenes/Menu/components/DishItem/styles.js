export default theme => ({
  dishImageWrapper: {
    width: 'auto',
  },

  dishTitleText: {
    fontWeight: 'bold',
  },

  addToCartBtn: {
    marginLeft: 10,
    fontSize: '1.2rem',

    '@media screen and (max-width: 768px)': {
      width: 35,
      height: 35,
      fontSize: '1rem',
    },

    '@media screen and (max-width: 400px)': {
      width: 30,
      height: 30,
      minHeight: 30,
      fontSize: '0.8rem',
    },
  },

  dishImage: {
    [theme.breakpoints.up('xs')]: {
      width: 200,
      height: 200,
    },

    [theme.breakpoints.down('xs')]: {
      width: 100,
      height: 100,
    },
  },

  dishBodyWrapper: {
    width: '100%',
  },

  dishDescription: {
    paddingRight: 10,
  },

  descriptionPopper: {
    boxSizing: 'border-box',
    padding: '0 5px 0 16px',
  },

  showDescriptionBtn: {
    padding: 2,
    textTransform: 'none',
  },
});

export default theme => ({
  widthAuto: {
    width: 'auto',
  },

  totalPriceCaption: {
    paddingTop: '0.9rem',
  },

  sizesAndExtrasControls: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 300,
    minWidth: 150,

    '@media screen and (max-width: 460px)': {
      maxWidth: 'none',
    },
  },

  reviewOrderItem: {
    padding: 15,

    [theme.breakpoints.up('xs')]: {
      padding: '3%',
    },
  },

  reviewOrderItemGrid: {
    '@media screen and (max-width: 500px)': {
      flexWrap: 'wrap',
    },
  },

  deleteItemBtn: {
    marginLeft: -15,
  },

  reviewItemBody: {
    flexGrow: 1,
  },

  reviewItemDescription: {
    paddingLeft: '20px',
    flexGrow: 1,
    width: '100%',
    marginBottom: '20px',
  },

  dishExtrasSection: {
    width: '100%',
    margin: '3% 0 0 0',

    '@media screen and (max-width: 690px)': {
      margin: '8% 0 6% 0',
    },
  },

  dishPictureWrapper: {
    width: 'auto',
    minWidth: 216,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  dishPicture: {
    width: '100%',
    maxWidth: 200,
    height: 200,
    display: 'inline-block',
    objectFit: 'cover',
    objectPosition: 'center center',

    '@media screen and (max-width: 460px)': {
      width: '100%',
      maxWidth: 'none',
      height: 'auto',
    },
  },
});

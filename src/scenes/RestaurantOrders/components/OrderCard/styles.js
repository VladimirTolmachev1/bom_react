export default theme => ({
  cardWrapper: {
    maxWidth: 300,
    position: 'relative',
  },

  deliveryCaption: {
    padding: 5,
    display: 'flex',
    alignItems: 'center',
  },

  deliveryIcon: {
    fontSize: '1rem',
    paddingRight: 5,
  },

  togglePopupBtn: {
    position: 'absolute',
    color: theme.palette.primary.main,
    right: 0,
    zIndex: 1,
    top: 5,
    fontSize: 20,
    padding: 3,
  },

  cardFooter: {
    fontSize: 13,
    padding: 10,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },

  orderPrice: {
    fontWeight: 'bold',
  },

  iconBtn: {
    padding: 0,
    color: 'white',
    marginRight: 5,
    fontSize: 15,
  },
});

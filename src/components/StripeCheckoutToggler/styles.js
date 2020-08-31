const styles = theme => ({
  // remove padding in outer Button and do same padding on inner "div", that wraps checkout children
  // look for ComponentClass prop from StripeCheckout
  // REASON: click on outer padding don't trigger Stripe popup
  checkoutBtn: {
    padding: 0,
    '& div': {
      paddingTop: theme.spacing.unit * 0.75,
      paddingBottom: theme.spacing.unit * 0.75,
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      height: '100%',
      width: '100%',
    },
  },
});

export default styles;

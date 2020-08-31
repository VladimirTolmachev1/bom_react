import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  saveCheckoutToStorage,
  checkoutSelector,
} from '../../modules/checkout';

const mapStateToProps = state => ({
  checkout: checkoutSelector(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      saveCheckoutToStorage,
    },
    dispatch,
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class CheckoutChangeListener extends Component {
  componentWillReceiveProps(nextProps) {
    const { actions, checkout } = this.props;

    if (checkout !== nextProps.checkout) {
      actions.saveCheckoutToStorage(nextProps.checkout);
    }
  }

  shouldComponentUpdate() {
    // prevent rerender
    return false;
  }

  render() {
    return null;
  }
}

export default CheckoutChangeListener;

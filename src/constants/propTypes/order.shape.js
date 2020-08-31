import PropTypes from 'prop-types';

export const dishExtraShape = {
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export const orderProductShape = {
  dish_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size_price: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  selectedExtra: PropTypes.arrayOf(PropTypes.shape(dishExtraShape)),
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export const orderShape = {
  status: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape(orderProductShape)).isRequired,
  restaurant_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,

  // joined customer info
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  city: PropTypes.string,
  street_address: PropTypes.string,
  building: PropTypes.string,
  appartament: PropTypes.string,
  zipcode: PropTypes.string,
  //

  payment_method: PropTypes.string,
  delivery_method: PropTypes.string,
  // TODO: FIX PRICE TO NUMBER ON BACK!!
  total_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

// UTILS SHAPES

export const orderPopupActionsShape = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  renderTitle: PropTypes.func,
};

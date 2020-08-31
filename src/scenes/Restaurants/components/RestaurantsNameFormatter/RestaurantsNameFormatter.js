/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './RestaurantsNameFormatter.scss';

const RestaurantsNameFormatter = ({ restaurant_name, id, onNameClick }) => {
  return (
    <a
      href="#"
      className="restaurants-list__name"
      onClick={onNameClick}
      id={id}>
      {restaurant_name}
    </a>
  );
};

RestaurantsNameFormatter.propTypes = {
  restaurant_name: PropTypes.string,
  onNameClick: PropTypes.func.isRequired,
};
RestaurantsNameFormatter.defaultProps = {};

export default memo(RestaurantsNameFormatter);

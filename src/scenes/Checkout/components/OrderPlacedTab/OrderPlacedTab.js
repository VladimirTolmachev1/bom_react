import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import './OrderPlacedTab.scss';

export const OrderPlacedTab = ({ onBackToMenuClick }) => (
  <div className="order-placed-container">
    <h2>Your order was successfully placed!</h2>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut corrupti
      labore voluptate ipsam asperiores! Quam hic voluptatum ipsum saepe omnis,
      illo rerum odit. Alias, nihil ea quo sequi repellat ratione!
    </p>
    <h5>Bon Appetit!</h5>

    <Button variant="contained" color="primary" onClick={onBackToMenuClick}>
      Back to menu
    </Button>
  </div>
);

OrderPlacedTab.propTypes = {
  onBackToMenuClick: PropTypes.func.isRequired,
};

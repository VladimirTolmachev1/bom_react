import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import './RestaurantHeader.scss';

export function RestaurantHeader({
  logo,
  background_picture,
  name,
  city,
  address,
  region,
  phones,
}) {
  const headerStyle = {
    height: '300px',
    position: 'relative',
    backgroundImage: `url("${background_picture}")`,
  };

  return (
    <div className="restaurant-header" style={headerStyle}>
      <div className="restaurant-header__meta">
        <div className="restaurant-header__meta-container">
          <div className="header-static-container">
            <img src={logo} alt="" className="restaurant-header__logo" />
            <Typography
              variant="subtitle1"
              gutterBottom
              className="restaurant-header__name">
              {name}
            </Typography>
            <div className="restaurant-header__address">
              {address && <span className="phone-number">{address},</span>}

              {city && <span className="header_city"> {city},</span>}

              {region && <span> {region}</span>}

              {phones.length > 0 && (
                <span className="phone-number"> Phone: </span>
              )}

              {phones.map(phone => (
                <span className="phone"> {phone} </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

RestaurantHeader.propTypes = {
  logo: PropTypes.string,
  background_picture: PropTypes.string,
  name: PropTypes.string,
};
RestaurantHeader.defaultProps = {
  phones: [],
  name: 'Some cool restaurant',
};

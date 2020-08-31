import React from 'react';
import PropTypes from 'prop-types';
import { RestaurantHeader } from '../../../../components';
import { HelperService } from '../../../../services';

export function DesignerPreview(props) {
  return (
    <div>
      <RestaurantHeader
        {...HelperService.pick(props, ['logo', 'background_picture', 'name'])}
      />
    </div>
  );
}

DesignerPreview.propTypes = {
  logo: PropTypes.string,
  background_picture: PropTypes.string,
  name: PropTypes.string,
};
DesignerPreview.defaultProps = {};

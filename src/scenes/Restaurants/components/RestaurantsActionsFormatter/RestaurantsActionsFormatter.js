import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import RestaurantMenu from '@material-ui/icons/RestaurantMenu';
import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import Tooltip from '@material-ui/core/Tooltip';
import AccessTime from '@material-ui/icons/AccessTime';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import FormatPaint from '@material-ui/icons/FormatPaint';
import IconButton from '@material-ui/core/IconButton';

import { Link } from 'react-router-dom';

export class RestaurantsActionsFormatter extends PureComponent {
  @autobind
  onBlockCLick() {
    const { id, status, showConfirm, blockRestaurant } = this.props;
    const status_action = status === 'blocked' ? 'activate' : 'block';
    showConfirm({
      data: { id, status },
      onSuccess: blockRestaurant,
      content: `Are you sure you want to ${status_action} restaurant?`,
    });
  }

  @autobind
  onEditClick() {
    const { id, onEditClick } = this.props;
    onEditClick({ target: { id } });
  }

  @autobind
  onDeleteCLick() {
    const { id, deleteRestaurant, showConfirm } = this.props;
    showConfirm({
      data: { body: { id } },
      onSuccess: deleteRestaurant,
      content: 'Are you sure you want to delete restaurant?',
    });
  }

  @autobind
  onSetHoursClick() {
    const { id, toggleSetRestaurantHoursModal } = this.props;
    toggleSetRestaurantHoursModal({ id, open: true });
  }

  render() {
    const { id, status } = this.props;
    const isRestaurantBlocked = status === 'blocked';
    const lockIcon = isRestaurantBlocked ? <Lock /> : <LockOpen />;
    const lockTitle = isRestaurantBlocked ? 'Activate' : 'Block';

    return (
      <div className="table-actions">
        <Tooltip title="Set working hours">
          <IconButton onClick={this.onSetHoursClick}>
            <AccessTime />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton onClick={this.onEditClick}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit menu">
          <Link to={`/menu?restaurant_id=${id}`}>
            <IconButton>
              <RestaurantMenu />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Page designer">
          <Link to={`/designer?restaurant_id=${id}`}>
            <IconButton>
              <FormatPaint />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title={lockTitle}>
          <IconButton onClick={this.onBlockCLick}>{lockIcon}</IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton onClick={this.onDeleteCLick}>
            <Delete />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

RestaurantsActionsFormatter.propTypes = {
  id: PropTypes.any,
  onEditClick: PropTypes.func,
  blockRestaurant: PropTypes.func,
  showConfirm: PropTypes.func,
  deleteRestaurant: PropTypes.func,
};

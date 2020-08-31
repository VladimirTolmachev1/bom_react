import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import ChipIcon from '@material-ui/core/Chip';
import { Grid, Typography } from '@material-ui/core';

import { HelperService, DateTimeService } from '../../../../services';

import './RestaurantInfo.scss';

export class RestaurantInfo extends Component {
  mapHourRows(section) {
    return Object.keys(section).map((day, index) => {
      if (section[day].isClosed) {
        return (
          <Typography className="info__hours-row" key={index}>
            <strong>{day}</strong>
            <strong>Closed</strong>
          </Typography>
        );
      }

      return (
        <Typography
          className="info__hours-row"
          color={day === 'Sat' || day === 'Sun' ? 'primary' : ''}
          key={index}>
          <strong className="info__hours-row-day">{day}</strong>
          <span>{DateTimeService.formatTime(section[day].start)}</span>
          {'-'}
          <span>{DateTimeService.formatTime(section[day].end)}</span>
        </Typography>
      );
    });
  }

  mapHourSections() {
    const {
      restaurant: { hours },
    } = this.props;

    if (!hours) {
      return null;
    }

    return Object.keys(hours).map(section => {
      return (
        <div className="info__hours-panel">
          <h3>{`${HelperService.capitalize(section)} Hours`}</h3>
          <div className="info__hours-details">
            {this.mapHourRows(hours[section])}
          </div>
        </div>
      );
    });
  }

  renderInfoItems(itemsValues, ItemsIcon) {
    return itemsValues.filter(Boolean).map(text => (
      <div className="info__description-item-contact">
        <ItemsIcon color="primary" />
        <span>{text}</span>
      </div>
    ));
  }

  tagsSection() {
    const {
      restaurant: { tags },
    } = this.props;

    if (!tags) {
      return null;
    }
    return (
      <div className="info__description-item">
        {tags.split(' ').map(tag => {
          return <ChipIcon label={tag} className="info__tag" />;
        })}
      </div>
    );
  }

  render() {
    const {
      restaurant: {
        restaurant_name,
        street_address,
        state,
        zipcode,
        delivery_email,
        manager_email,
        phone_number,
        phone_number2,
      },
    } = this.props;

    const phones = [phone_number, phone_number2];
    const emails = [manager_email, delivery_email];

    return (
      <div className="restaurant-info">
        <h1>{restaurant_name}</h1>
        <div className="info__description">
          <div className="info__description-item">
            {street_address}, {state}, {zipcode}
          </div>
          <div className="info__description-item">
            <Grid container direction="column">
              {this.renderInfoItems(phones, PhoneIcon)}
            </Grid>

            {this.renderInfoItems(emails, EmailIcon)}
          </div>
          {this.tagsSection()}
        </div>
        <div className="info__hour-sections">{this.mapHourSections()}</div>
      </div>
    );
  }
}

RestaurantInfo.propTypes = {
  restaurant: PropTypes.object,
};

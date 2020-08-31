import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, Divider } from '@material-ui/core';

const RestaurantInfoHeader = ({ currentTab, handleTabChange }) => (
  <>
    <h1> Restaurant Info </h1>

    <Tabs value={currentTab} onChange={handleTabChange}>
      <Tab label="Contacts & settings" />
      <Tab label="Billing information" />
      <Tab label="Payment information" />
    </Tabs>

    <Divider />
  </>
);

RestaurantInfoHeader.propTypes = {
  currentTab: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
};

export default RestaurantInfoHeader;

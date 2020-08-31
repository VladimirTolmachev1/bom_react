import React from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Tabs,
  Grid,
  Button,
  Divider,
  withStyles,
  Typography,
} from '@material-ui/core';

import { TabLabelWithNumber } from '../../../../components';
import { CurrencyService } from '../../../../services';

import styles from './styles';

const OrdersPageHeader = ({
  currentTab,
  handleTabChange,
  totalOrdersCompleted,
  processingOrdersAmount,
  completedOrdersAmount,
  newOrdersAmount,
  totalRevenue,
  classes,
  onNewOrderClick,
}) => (
  <>
    <Grid container wrap="nowrap" className={classes.headerWrapper}>
      <Grid container alignItems="center" wrap="nowrap">
        <span className={classes.title}>My orders</span>

        {newOrdersAmount > 0 && (
          <span className={classes.newOrdersAmount}>
            {` (${newOrdersAmount} new)`}
          </span>
        )}

        <Button
          color="primary"
          variant="contained"
          className={classes.newOrderBtn}
          onClick={onNewOrderClick}>
          New Order
        </Button>
      </Grid>

      <Grid container alignItems="center" justify="flex-end" spacing={32}>
        <Grid
          item
          container
          alignItems="center"
          className={classes.metaInfoWrapper}>
          <Typography color="textSecondary" component="span">
            Total Orders Completed:
          </Typography>

          <span className={classes.margenedCaption}>
            {totalOrdersCompleted}
          </span>
        </Grid>

        <Grid
          item
          container
          alignItems="center"
          className={classes.metaInfoWrapper}>
          <Typography color="textSecondary" component="span">
            Total Revenue:
          </Typography>

          <span className={classes.margenedCaption}>
            ${CurrencyService.show(totalRevenue)}
          </span>
        </Grid>
      </Grid>
    </Grid>

    <Tabs value={currentTab} onChange={handleTabChange}>
      <Tab
        label={<TabLabelWithNumber text="Inbox" number={newOrdersAmount} />}
      />
      <Tab
        label={
          <TabLabelWithNumber
            text="Processing"
            number={processingOrdersAmount}
          />
        }
      />
      <Tab
        label={
          <TabLabelWithNumber text="Completed" number={completedOrdersAmount} />
        }
      />
    </Tabs>

    <Divider />
  </>
);

OrdersPageHeader.propTypes = {
  currentTab: PropTypes.number.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrdersPageHeader);

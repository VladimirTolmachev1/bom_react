import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './SetRestaurantHoursModal.scss';

import { autobind } from 'core-decorators';
import { HelperService } from '../../services';
import {
  setRestaurantHoursModalLoadingSelector,
  toggleSetRestaurantHoursModal,
  clearModalData,
  setRestaurantHoursModalOpenSelector,
  setRestaurantHoursModalInitialValuesSelector,
  setRestaurantHoursModalIdSelector,
  daysOptionsSelector,
  copyHoursFromPreviousTab,
  setSameDay,
} from './modules';

import { AppPreloaderSmall, AppCleanHOC } from '../../components';

import {
  updateRestaurant,
  getRestaurantById,
  abortPageRequests,
} from '../../modules/restaurants';

import { TabContent } from './components';

const formFieldsSelector = formValueSelector('Restaurant');

const mapStateToProps = state => ({
  loading: setRestaurantHoursModalLoadingSelector(state),
  open: setRestaurantHoursModalOpenSelector(state),
  initialValues: setRestaurantHoursModalInitialValuesSelector(state),
  id: setRestaurantHoursModalIdSelector(state),
  hours: formFieldsSelector(state, 'hours'),
  daysOptions: daysOptionsSelector(),
});

const mapDispatchToProps = {
  toggleSetRestaurantHoursModal,
  clearModalData,
  updateRestaurant,
  getRestaurantById,
  abortPageRequests,
  setSameDay,
  copyHoursFromPreviousTab,
};

export default
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@reduxForm({
  form: 'Restaurant',
  enableReinitialize: true,
})
@AppCleanHOC
class SetRestaurantHoursModal extends Component {
  state = {
    activeTab: 0,
  };

  @autobind
  onEntered() {
    const { id, getRestaurantById } = this.props;
    getRestaurantById({ id });
  }

  @autobind
  onClose() {
    const { toggleSetRestaurantHoursModal, reset, clearModalData } = this.props;
    toggleSetRestaurantHoursModal({ open: false });
    reset();
    clearModalData();
  }

  @autobind
  async onSaveClick() {
    const { hours, updateRestaurant, id } = this.props;

    try {
      await updateRestaurant({ body: { hours, id } });
      this.onClose();
    } catch (error) {
      // todo: error notification
      console.error(error);
    }
  }

  @autobind
  onChangeTab(event, activeTab) {
    this.setState({ activeTab });
  }

  renderDialogActions() {
    const { loading, invalid } = this.props;

    return (
      <div className="set-restaurant-modal__actions">
        <Button
          onClick={this.onClose}
          variant="contained"
          disabled={loading}
          className="set-restaurant-modal__actions-cancel">
          Cancel
        </Button>
        <Button
          onClick={this.onSaveClick}
          variant="contained"
          color="primary"
          disabled={loading || invalid}
          className="set-restaurant-modal__actions-save">
          Save and update all
        </Button>
      </div>
    );
  }

  render() {
    const { loading, open } = this.props;
    const { activeTab } = this.state;

    const tabProps = HelperService.pick(this.props, [
      'hours',
      'setSameDay',
      'daysOptions',
      'copyHoursFromPreviousTab',
    ]);

    return (
      <Dialog
        open={open}
        onEntered={this.onEntered}
        onClose={this.onClose}
        fullWidth
        maxWidth="md"
        className="restaurant-modal">
        {loading && <AppPreloaderSmall />}
        <DialogTitle>Working schedule</DialogTitle>
        <DialogContent>
          <Tabs
            value={activeTab}
            centered
            indicatorColor="primary"
            className="set-restaurant-modal-hours__tabs"
            onChange={this.onChangeTab}>
            <Tab label="Working hours" />
            <Tab label="Away hours" />
            <Tab label="Delivery hours" />
            <Tab label="Pickup hours" />
          </Tabs>

          {activeTab === 0 && <TabContent hoursGroup="working" {...tabProps} />}
          {activeTab === 1 && <TabContent hoursGroup="away" {...tabProps} />}
          {activeTab === 2 && (
            <TabContent hoursGroup="delivery" {...tabProps} />
          )}
          {activeTab === 3 && <TabContent hoursGroup="pickup" {...tabProps} />}
        </DialogContent>
        <Divider />
        <DialogActions>{this.renderDialogActions()}</DialogActions>
      </Dialog>
    );
  }
}

SetRestaurantHoursModal.propTypes = {
  loading: PropTypes.bool,
  hours: PropTypes.any,
  initialValues: PropTypes.object,
};
SetRestaurantHoursModal.defaultProps = {};

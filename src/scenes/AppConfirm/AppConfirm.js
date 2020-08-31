import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { autobind } from 'core-decorators';

import { confirmDataSelector, closeConfirm } from './modules';

const mapStateToProps = state => ({
  confirmData: confirmDataSelector(state),
});

const mapDispatchToProps = {
  closeConfirm,
};

export default
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class AppConfirm extends Component {
  @autobind
  onConfirmClicked() {
    const {
      confirmData: { onSuccess, data },
      closeConfirm,
    } = this.props;

    onSuccess(data);
    closeConfirm();
  }

  renderDialogActions() {
    const { closeConfirm } = this.props;

    return (
      <DialogActions>
        <Button onClick={closeConfirm} color="primary">
          Cancel
        </Button>
        <Button onClick={this.onConfirmClicked} color="primary">
          Ok
        </Button>
      </DialogActions>
    );
  }

  render() {
    const {
      confirmData: { content, open },
    } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        open={open}
        aria-labelledby="confirmation-dialog-title">
        <DialogContent>{content}</DialogContent>
        {this.renderDialogActions()}
      </Dialog>
    );
  }
}

AppConfirm.propTypes = {
  confirmData: PropTypes.shape({
    successCallback: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    content: PropTypes.any.isRequired,
    header: PropTypes.any.isRequired,
  }),
};
AppConfirm.defaultProps = {};

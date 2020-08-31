import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import { autobind } from 'core-decorators';

import styles from './styles';
import { AppPreloaderSmall } from '../../../components';

export default
@withStyles(styles)
class BaseModal extends PureComponent {
  @autobind
  renderDialogActions() {
    const {
      classes,
      actions,
      isLoading,
      secondaryBtnText,
      isSubmitDisabled,
      submitBtnText,
      onSubmit,
      onSecondaryAction,
    } = this.props;

    if (actions) {
      return actions;
    }

    return (
      <Grid container justify="space-between" wrap="nowrap">
        <Button
          onClick={onSecondaryAction}
          variant="contained"
          className={classes.modalBtn}>
          {secondaryBtnText}
        </Button>

        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          className={classes.modalBtn}
          disabled={isLoading || isSubmitDisabled}>
          {submitBtnText}
        </Button>
      </Grid>
    );
  }

  render() {
    const {
      classes,
      title,
      content,
      children,
      isLoading,
      dialogProps,
      open,
      onClose,
      onEnter,
      customModalBody,
      closeBtnClassName,
      closeWithACross,
    } = this.props;

    return (
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={onClose}
        onEnter={onEnter}
        {...dialogProps}>
        {isLoading && <AppPreloaderSmall />}
        {title && (
          <DialogTitle
            className={classNames({ [classes.title]: closeWithACross })}>
            <Grid container justify="space-between">
              {title}
              {closeWithACross && (
                <IconButton
                  onClick={onClose}
                  className={classNames(classes.closeBtn, closeBtnClassName)}>
                  <CloseIcon />
                </IconButton>
              )}
            </Grid>
          </DialogTitle>
        )}

        <DialogContent>{customModalBody || children || content}</DialogContent>

        <Divider />
        <DialogActions>{this.renderDialogActions()}</DialogActions>
      </Dialog>
    );
  }
}

BaseModal.propTypes = {
  onSubmitAndClose: PropTypes.func,
  content: PropTypes.node.isRequired,
  title: PropTypes.node,
  actions: PropTypes.node,

  secondaryBtnText: PropTypes.string,
  submitBtnText: PropTypes.string,
  isSubmitDisabled: PropTypes.bool,
  closeWithACross: PropTypes.bool,

  dialogProps: PropTypes.object,
};

BaseModal.defaultProps = {
  secondaryBtnText: 'Reset',
  submitBtnText: 'Save',

  isSubmitDisabled: false,
  dialogProps: {},
  closeWithACross: true,
};

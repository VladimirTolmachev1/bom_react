import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';
import { autobind } from 'core-decorators';

import styles from './styles';

@withStyles(styles)
class Popup extends React.Component {
  static propTypes = {
    content: PropTypes.node,
    classes: PropTypes.object,
    triggerContent: PropTypes.node,
    triggerProps: PropTypes.object,
    anchorEl: PropTypes.oneOfType([
      PropTypes.shape({ render: PropTypes.func.isRequired }),
      PropTypes.func,
      PropTypes.node,
    ]),
    TriggerComponent: PropTypes.oneOfType([
      PropTypes.shape({ render: PropTypes.func.isRequired }),
      PropTypes.func,
      PropTypes.node,
    ]),
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    placement: PropTypes.string,
    popperClass: PropTypes.string,
  };

  static defaultProps = {
    triggerProps: {},
  };

  state = {
    anchorEl: null,
  };

  @autobind
  handleClickTrigger(event) {
    let custumAnchor = this.props.anchorEl;

    if (typeof custumAnchor === 'function') {
      custumAnchor = custumAnchor();
    }

    this.setState({
      anchorEl: custumAnchor || event.currentTarget,
    });
  }

  @autobind
  handleClose() {
    this.setState({
      anchorEl: null,
    });
  }

  getPopupContent() {
    const { content, children } = this.props;

    if (content) return content;

    if (typeof children === 'function') {
      return children(this.handleClose);
    }

    return children || null;
  }

  render() {
    const {
      placement: contentPlacement,
      popperClass,
      TriggerComponent,
      triggerContent,
      triggerProps,
      classes,
    } = this.props;

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const Trigger = TriggerComponent || IconButton;
    return (
      <>
        <Trigger
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          {...triggerProps || {}}
          onClick={this.handleClickTrigger}>
          {triggerContent || <MoreVertIcon fontSize="inherit" />}
        </Trigger>

        <Popper
          open={open}
          anchorEl={anchorEl}
          className={classNames(classes.tooltipWrapper, popperClass)}
          transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  contentPlacement || placement === 'bottom'
                    ? 'center top'
                    : 'center bottom',
              }}>
              <Paper className={classes.contentWrapper}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  {this.getPopupContent()}
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  }
}

export default Popup;

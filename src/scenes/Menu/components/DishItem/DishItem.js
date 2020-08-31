import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Fab from '@material-ui/core/Fab';
import {
  Grid,
  withStyles,
  Typography,
  Hidden,
  Button,
} from '@material-ui/core';
import { autobind } from 'core-decorators';

import styles from './styles';
import { Popup, DishTitle, DishPicture } from '../../../../components';

import './DishItem.scss';

export default
@withStyles(styles)
class DishItem extends PureComponent {
  state = {
    anchorEl: null,
  };

  static propTypes = {
    removeDish: PropTypes.func,
    dish: PropTypes.object,
    showConfirm: PropTypes.func,
    publishDishes: PropTypes.func,
    mode: PropTypes.string,
  };

  dishCardRef = React.createRef();

  @autobind
  onClickMenuOpen(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  @autobind
  onCloseMenuClick() {
    this.setState({ anchorEl: null });
  }

  @autobind
  onRemoveClick() {
    const {
      showConfirm,
      removeDish,
      dish: { id },
    } = this.props;

    showConfirm({
      data: { body: { id } },
      onSuccess: removeDish,
      content: 'Are you sure you want to delete dish?',
    });
    this.onCloseMenuClick();
  }

  @autobind
  onPublishCLick() {
    const {
      showConfirm,
      publishDishes,
      dish: { id },
    } = this.props;

    showConfirm({
      data: { dish_items: [id] },
      onSuccess: publishDishes,
      content: 'Are you sure you want to publish dish?',
    });
    this.onCloseMenuClick();
  }

  @autobind
  onUnpublishCLick() {
    const {
      showConfirm,
      unpublishDishes,
      dish: { id },
    } = this.props;

    showConfirm({
      data: { dish_items: [id] },
      onSuccess: unpublishDishes,
      content: 'Are you sure you want to unpublish dish?',
    });
    this.onCloseMenuClick();
  }

  @autobind
  onClickMenuItem(event) {
    const {
      target: {
        dataset: { action },
      },
    } = event;

    switch (action) {
      case 'Publish': {
        return this.onPublishCLick(event);
      }

      case 'Unpublish': {
        return this.onUnpublishCLick(event);
      }

      case 'Edit': {
        return this.props.onEditClick();
      }

      case 'Remove': {
        return this.onRemoveClick(event);
      }

      default: {
        return false;
      }
    }
  }

  renderMenuItems() {
    const {
      dish: { isPublished },
    } = this.props;

    return ['Publish', 'Unpublish', 'Edit', 'Remove'].map((item, id) => {
      if (isPublished && item === 'Publish') return null;
      if (!isPublished && item === 'Unpublish') return null;

      return (
        <MenuItem key={id} onClick={this.onClickMenuItem} data-action={item}>
          {item}
        </MenuItem>
      );
    });
  }

  @autobind
  onBasketClick() {
    const { onBasketClick, dish } = this.props;

    onBasketClick && onBasketClick(dish);
  }

  renderExtra = () => {
    const { anchorEl } = this.state;
    const {
      dish: { isPublished },
      mode,
      classes,
    } = this.props;
    const open = Boolean(anchorEl);

    // eslint-disable-next-line eqeqeq
    if (mode == 'client') {
      return (
        <Fab
          className={classes.addToCartBtn}
          color="primary"
          aria-label="Add"
          onClick={this.onBasketClick}
          size="small">
          <AddShoppingCart fontSize="inherit" />
        </Fab>
      );
    }

    return (
      <>
        {isPublished && (
          <Tooltip title="Published">
            <CheckCircle className="dish-list__item-published-mark" />
          </Tooltip>
        )}
        <Menu
          anchorEl={anchorEl}
          open={open}
          id="dish-list__item-menu"
          onClose={this.onCloseMenuClick}>
          {this.renderMenuItems()}
        </Menu>
        <IconButton
          className="dish-list__item-menu-btn"
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.onClickMenuOpen}>
          <MoreVertIcon />
        </IconButton>
      </>
    );
  };

  renderDescription() {
    const {
      dish: { description },
      classes,
    } = this.props;

    return (
      <Grid item>
        <Hidden xsDown>
          <Typography variant="subtitle2" className={classes.dishDescription}>
            {description}
          </Typography>
        </Hidden>

        {description && (
          <Hidden smUp>
            <Popup
              placement="left bottom"
              anchorEl={this.getDishCardAnchor}
              popperClass={classes.descriptionPopper}
              TriggerComponent={Button}
              triggerContent="Show description"
              triggerProps={{
                className: classes.showDescriptionBtn,
                color: 'primary',
              }}>
              <Typography
                variant="subtitle2"
                className={classes.dishDescription}>
                {description}
              </Typography>
            </Popup>
          </Hidden>
        )}
      </Grid>
    );
  }

  @autobind
  getDishCardAnchor() {
    return this.dishCardRef.current;
  }

  render() {
    const {
      dish: { name, picture, price },
      classes,
    } = this.props;

    return (
      <div ref={this.dishCardRef}>
        <Paper className="dish-list__item">
          <Grid container justify="space-between" spacing={16} wrap="nowrap">
            <Grid item container className={classes.dishImageWrapper}>
              <DishPicture src={picture} className={classes.dishImage} />
            </Grid>

            <Grid
              item
              container
              direction="column"
              className={classes.dishBodyWrapper}
              spacing={8}>
              <Grid item>
                <DishTitle
                  name={name}
                  price={price}
                  typographyVariant="subtitle1"
                  extraPart={this.renderExtra()}
                  typographyClass={classes.dishTitleText}
                />
              </Grid>

              {this.renderDescription()}
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

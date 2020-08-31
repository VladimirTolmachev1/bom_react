import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { DEFAULT_DISH_IMAGE } from '../../constants/config';

import styles from './styles';

const DishPicture = ({
  src,
  circled,
  classes,
  defaultSrc,
  className,
  withDefaultImage,
}) => (
  <img
    className={classNames(
      classes.dishPicture,
      { [classes.hidden]: !src && !withDefaultImage },
      { [classes.circled]: circled },
      className,
    )}
    src={src || (withDefaultImage && defaultSrc)}
    alt=""
  />
);

DishPicture.defaultProps = {
  withDefaultImage: false,
  defaultSrc: DEFAULT_DISH_IMAGE,
};

export default withStyles(styles)(DishPicture);

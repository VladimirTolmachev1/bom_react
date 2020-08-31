import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link as DomLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './styles';

const Link = ({ classes, className, children, ...rest }) => (
  <DomLink className={classNames(classes.link, className)} {...rest}>
    {children}
  </DomLink>
);

export default withStyles(styles)(Link);

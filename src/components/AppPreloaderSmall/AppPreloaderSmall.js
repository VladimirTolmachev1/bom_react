import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import './AppPreloaderSmall.scss';

const AppPreloaderSmall = ({ className, children }) => {
  return (
    <Grid
      className={`app-preloader-small ${className}`}
      alignItems="center"
      direction="column"
      justify="center"
      container>
      {children}
      <div>
        <span />
        <span />
        <span />
        <span />
      </div>
    </Grid>
  );
};

export default memo(AppPreloaderSmall);

AppPreloaderSmall.propTypes = {
  className: PropTypes.string,
};

AppPreloaderSmall.defaultProps = {
  className: '',
};

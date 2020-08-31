import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import classNames from 'classnames';

import { Grid, withStyles, Typography } from '@material-ui/core';

import styles from './styles';

import 'react-image-crop/lib/ReactCrop.scss';

export default
@withStyles(styles)
class AppDropzone extends PureComponent {
  @autobind
  onDrop(accepted) {
    const { onDrop } = this.props;
    onDrop(accepted && accepted[0]);
  }

  renderPreview(src) {
    const { crop, onChange, useCrop, file, classes, previewClass } = this.props;

    if (!useCrop || !(file instanceof File)) {
      return (
        <img
          src={src}
          alt=""
          className={classNames(classes.imgagePreview, previewClass)}
        />
      );
    }

    return (
      <ReactCrop
        {...{
          src,
          crop,
          onChange,
        }}
      />
    );
  }

  render() {
    const {
      id,
      file,
      accept,
      label,
      wrapperClassName,
      className,
      classes,
    } = this.props;
    const src = file instanceof File ? URL.createObjectURL(file) : file;

    return (
      <div className={classNames(classes.dropzoneWrapper, wrapperClassName)}>
        {src && this.renderPreview(src)}
        <Dropzone
          {...{
            id,
            accept,
          }}
          className={classNames(classes.dropzoneArea, className)}
          onDrop={this.onDrop}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classNames(classes.dropzoneContent, {
              [classes.showOnlyOnHower]: !!src,
            })}>
            <Typography variant="subtitle1">{label} </Typography>
            <Typography variant="subtitle2">
              Drag and drop picture to add it
            </Typography>
            <div id="chosen-files">{file && <div>{file.name}</div>}</div>
          </Grid>
        </Dropzone>
      </div>
    );
  }
}

AppDropzone.propTypes = {
  id: PropTypes.string,
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  accept: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
  useCrop: PropTypes.bool,
  onChange: PropTypes.func,
  crop: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

AppDropzone.defaultProps = {
  wrapperClassName: '',
  className: '',
};

import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import { Grid, Typography, Button } from '@material-ui/core';
import {
  AppFormTextField,
  AppFormColorPicker,
  AppPreloaderSmall,
  AppDropzone,
} from '../../../../components';

export class DesignerForm extends PureComponent {
  render() {
    const {
      handleSaveRestaurantLink,
      loading,
      background_pictureCrop,
      logoCrop,
      onDropBackgroundImage,
      onDropLogo,
      onBackgroundCrop,
      onLogoCrop,
      onUpdateCLick,
      invalid,
      logo,
      background_picture,
      url,
    } = this.props;

    return (
      <Grid className="designer__form" container direction="column">
        {loading && <AppPreloaderSmall />}
        <Typography variant="title" paragraph>
          Main Settings
        </Typography>
        <Field
          name="url"
          required
          type="text"
          className="designer__control"
          label="Page url address"
          component={AppFormTextField}
          onBlur={handleSaveRestaurantLink}
        />

        <Typography>Your restaurant link is</Typography>
        {/* <h4>Your restaurant link is: </h4> */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${process.env.REACT_APP_HOSTNAME}/r/${url}`}>
          {`${process.env.REACT_APP_HOSTNAME}/r/${url}`}
        </a>
        <br />
        <br />
        <Field
          name="menu_page_name"
          className="designer__control"
          required
          type="text"
          label="Menu page name"
          component={AppFormTextField}
        />

        <Typography variant="title" paragraph>
          Theming
        </Typography>

        <Field
          name="menu_navigation_color"
          className="designer__control"
          label="Menu theme color"
          component={AppFormColorPicker}
        />

        <Field
          name="menu_background_color"
          className="designer__control"
          label="Menu background color"
          component={AppFormColorPicker}
        />

        <AppDropzone
          file={logo}
          useCrop
          label="Menu restaurant logo"
          accept={['image/*']}
          crop={logoCrop}
          onDrop={onDropLogo}
          onChange={onLogoCrop}
          previewClass="logo-preview"
        />

        <AppDropzone
          file={background_picture}
          useCrop
          label="Menu restaurant background"
          accept={['image/*']}
          crop={background_pictureCrop}
          onDrop={onDropBackgroundImage}
          onChange={onBackgroundCrop}
        />

        <Button
          onClick={onUpdateCLick}
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading || invalid}
          className="designer__update-btn">
          Update page designer
        </Button>
      </Grid>
    );
  }
}

DesignerForm.propTypes = {};
DesignerForm.defaultProps = {};

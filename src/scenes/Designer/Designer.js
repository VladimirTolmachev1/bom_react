/* eslint-disable prefer-const */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';

import { autobind } from 'core-decorators';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { HelperService } from '../../services';
import { DesignerForm, DesignerPreview } from './components';

import { AppCleanHOC } from '../../components';

import {
  loadingsSelector,
  initialValuesSelector,
  abortPageRequests,
  getDesignerById,
  updateDesigner,
  designerValidation,
  formFieldNamesSelector,
} from './modules';

import './Designer.scss';

const formFieldsSelector = formValueSelector('Designer');

const mapStateToProps = state => ({
  loading: loadingsSelector(state),
  initialValues: initialValuesSelector(state),
  formValues: formFieldsSelector(state, ...formFieldNamesSelector()),
});

const mapDispatchToProps = {
  abortPageRequests,
  getDesignerById,
  updateDesigner,
  designerValidation,
};

export default
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@reduxForm({
  form: 'Designer',
  enableReinitialize: true,
  validate: designerValidation,
})
@AppCleanHOC
class Designer extends Component {
  state = {
    activeTab: 0,
    logoPixelCrop: {},
    background_picturePixelCrop: {},
    logoCrop: {
      x: 0,
      y: 0,
      width: 30,
      height: 30,
    },
    background_pictureCrop: {
      x: 0,
      y: 0,
      width: 30,
      height: 30,
    },
  };

  async getCroppedImages({ logo, background_picture }) {
    const { logoPixelCrop, background_picturePixelCrop } = this.state;
    let croppedLogo = logo;
    let corppedBgImage = background_picture;

    if (logo && typeof logo !== 'string') {
      croppedLogo = await HelperService.getCroppedImg({
        file: logo,
        pixelCrop: logoPixelCrop,
      });
    }

    if (background_picture && typeof background_picture !== 'string') {
      corppedBgImage = await HelperService.getCroppedImg({
        file: background_picture,
        pixelCrop: background_picturePixelCrop,
      });
    }

    return {
      logo: croppedLogo,
      background_picture: corppedBgImage,
    };
  }

  @autobind
  handleSaveRestaurantLink() {
    const {
      formValues: { url },
      updateDesigner,
    } = this.props;

    const { restaurant_id } = this.getSearch();

    const body = {
      url,
      restaurant_id,
    };

    updateDesigner({ body });
  }

  @autobind
  async onUpdateCLick(event) {
    let {
      formValues,
      updateDesigner,
      formValues: { logo, background_picture } = {},
    } = this.props;
    const { restaurant_id } = this.getSearch();

    event.preventDefault();

    ({ logo, background_picture } = await this.getCroppedImages({
      logo,
      background_picture,
    }));

    const body = {
      ...formValues,
      restaurant_id,
    };

    delete body.restaurant_name;

    if (typeof logo !== 'string') {
      body.logo = logo;
    }

    if (background_picture && typeof background_picture !== 'string') {
      body.background_picture = background_picture;
    }

    updateDesigner({ body });
  }

  @autobind
  onLogoCrop(crop, pixelCrop) {
    this.setState({
      logoCrop: crop,
      logoPixelCrop: pixelCrop,
    });
  }

  @autobind
  onBackgroundCrop(crop, pixelCrop) {
    this.setState({
      background_pictureCrop: crop,
      background_picturePixelCrop: pixelCrop,
    });
  }

  @autobind
  onDropLogo(accepted) {
    const { change } = this.props;
    change('logo', accepted);
  }

  @autobind
  onDropBackgroundImage(accepted) {
    const { change } = this.props;
    change('background_picture', accepted);
  }

  @autobind
  onChangeTab(event, activeTab) {
    this.setState({ activeTab });
  }

  getSearch() {
    const {
      location: { search },
    } = this.props;
    return HelperService.parseSearch(search);
  }

  componentDidMount() {
    const { getDesignerById } = this.props;
    const { restaurant_id } = this.getSearch();

    getDesignerById({ id: restaurant_id });
  }

  @autobind
  getPreviews() {
    const { formValues: { logo, background_picture } = {} } = this.props;

    const logoForPreview =
      logo instanceof File || logo instanceof Blob
        ? URL.createObjectURL(logo)
        : logo;
    const bgForPreview =
      background_picture instanceof File || background_picture instanceof Blob
        ? URL.createObjectURL(background_picture)
        : background_picture;

    return {
      logo: logoForPreview,
      background_picture: bgForPreview,
    };
  }

  render() {
    const { activeTab, background_pictureCrop, logoCrop } = this.state;

    const {
      formValues: { logo, url, background_picture, restaurant_name },
    } = this.props;

    return (
      <DocumentTitle title="Page designer">
        <div className="app-static-container designer">
          <h1>Restaurant page designer</h1>

          <Tabs
            value={activeTab}
            indicatorColor="primary"
            className="designer__tabs"
            onChange={this.onChangeTab}>
            <Tab label="Configuration" />
            <Tab label="Restaurant header preview" />
          </Tabs>

          <div className="designer__tabs-content">
            {activeTab === 0 && (
              <DesignerForm
                {...{
                  background_pictureCrop,
                  logoCrop,
                  logo,
                  background_picture,
                  url,
                }}
                onDropBackgroundImage={this.onDropBackgroundImage}
                onDropLogo={this.onDropLogo}
                onBackgroundCrop={this.onBackgroundCrop}
                onLogoCrop={this.onLogoCrop}
                onUpdateCLick={this.onUpdateCLick}
                handleSaveRestaurantLink={this.handleSaveRestaurantLink}
                {...HelperService.pick(this.props, [
                  'loading',
                  'invalid',
                  'change',
                ])}
              />
            )}
            {activeTab === 1 && (
              <DesignerPreview {...this.getPreviews()} name={restaurant_name} />
            )}
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

Designer.propTypes = {
  abortPageRequests: PropTypes.func,
};
Designer.defaultProps = {};

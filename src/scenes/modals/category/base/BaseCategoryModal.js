import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, Divider, Grid, withStyles } from '@material-ui/core';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';

import styles from './styles';
import { BaseModal } from '../../BaseModal';
import { CategoryInfoForm, ExtrasForm } from '../../../../components/forms';
import {
  categoryModalStepsValues as steps,
  categoryModalStepsNamesByValues as stepNamesByValues,
} from '../../../../modules/modals/category/category-modal.utils';
import {
  categoryModalActiveStepSelector,
  isCategoryFormInvalidSelector,
  isCategoryFormPristineSelector,
  setCategoryModal,
  clearCategoryModal,
  resetCategoryModalForms,
} from '../../../../modules/modals/category';

import { categoriesListLoading } from '../../../../modules/categories';

const mapStateToProps = (state, props) => ({
  initialValues: props.initialValues,
  isLoading: categoriesListLoading(state),
  isInvalid: isCategoryFormInvalidSelector(state),
  isPristine: isCategoryFormPristineSelector(state),
  activeStep: categoryModalActiveStepSelector(state),
});

const mapDispatchToProps = dispatch => ({
  changeActiveStep: (_, activeStep) =>
    dispatch(setCategoryModal({ activeStep })),
  onClose: () => dispatch(clearCategoryModal()),
  onSecondaryAction: () => dispatch(resetCategoryModalForms()),
});

export default
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@withStyles(styles)
class BaseCategoryModal extends PureComponent {
  bodyRenderByActiveStep = {
    [steps.INFO]: this.renderInfoSection,
    [steps.EXTRAS]: this.renderExtrasSection,
  };

  @autobind
  renderExtrasSection() {
    return (
      <ExtrasForm initialValues={this.props.initialValues.categoryExtrasForm} />
    );
  }

  @autobind
  renderTitle() {
    const {
      activeStep,
      changeActiveStep,
      header,
      isExtrasTabDisabled,
    } = this.props;

    return (
      <Grid container direction="column" spacing={8}>
        <Grid item> {header} </Grid>
        <Grid item>
          <Tabs value={activeStep} onChange={changeActiveStep}>
            <Tab label="Info" />
            <Tab label="Extras" disabled={isExtrasTabDisabled} />
          </Tabs>
          <Divider />
        </Grid>
      </Grid>
    );
  }

  @autobind
  renderInfoSection() {
    return (
      <CategoryInfoForm
        initialValues={this.props.initialValues.categoryInfoForm}
      />
    );
  }

  @autobind
  getSubmitBtnText() {
    const { activeStep, customSubmitBtnText } = this.props;
    return customSubmitBtnText || `Save ${stepNamesByValues[activeStep]}`;
  }

  render() {
    const {
      open,
      onClose,
      onSecondaryAction,
      isInvalid,
      isLoading,
      onEnter,
      isPristine,
      activeStep,
      onFormSubmit,
      customModalBody,
      isSubmitDisabled,
      ...baseModalProps
    } = this.props;

    const submitBtnText = this.getSubmitBtnText();

    return (
      <BaseModal
        title={this.renderTitle()}
        isLoading={isLoading}
        onSubmit={onFormSubmit}
        isSubmitDisabled={
          isSubmitDisabled || isLoading || isInvalid || isPristine
        }
        onClose={onClose}
        onEnter={onEnter}
        open={open}
        onSecondaryAction={onSecondaryAction}
        submitBtnText={submitBtnText}
        {...baseModalProps || {}}>
        {customModalBody || this.bodyRenderByActiveStep[activeStep]()}
      </BaseModal>
    );
  }
}

BaseCategoryModal.propTypes = {
  onSubmit: PropTypes.func,
  restaurant_id: PropTypes.string,
  isInvalid: PropTypes.bool,
};

BaseCategoryModal.defaultProps = {
  initialValues: {
    categoryInfoForm: {
      name: '',
      description: '',
    },
    categoryExtrasForm: {},
  },
};

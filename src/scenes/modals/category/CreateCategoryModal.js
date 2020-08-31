/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { connect } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';

import { BaseCategoryModal } from './base';
import {
  createCategoryFromModal,
  patchCategoryExtrasFromModal,
  categoryModalOpenSelector,
  categoryModalActiveStepSelector,
  managedCategoryIdSelector,
  categoryModalStepsValues as steps,
} from '../../../modules/modals/category';

const CATEGORY_CREATED_MSG = (
  <Grid container justify="center" alignItems="center" direction="column">
    <Typography variant="subtitle1" paragraph>
      The category has been created sucessfuly!
    </Typography>
    <Typography align="center">
      Now you can customize it by adding extras on "Extras" tab.
    </Typography>
    <Typography align="center">
      For creating new category click on "Reset" button
    </Typography>
  </Grid>
);

const mapStateToProps = state => ({
  open: categoryModalOpenSelector(state),
  activeStep: categoryModalActiveStepSelector(state),
  isCategoryCreated: !!managedCategoryIdSelector(state),
});

const mapDispatchToProps = {
  createCategoryFromModal,
  patchCategoryExtrasFromModal,
};

const CreateCategoryModal = ({
  createCategoryFromModal,
  patchCategoryExtrasFromModal,
  isCategoryCreated,
  activeStep,
  open,
}) => {
  const shouldRenderMsgInsteadInfoForm =
    isCategoryCreated && activeStep === steps.INFO;
  let submitHandler = createCategoryFromModal;

  if (activeStep === steps.EXTRAS) {
    submitHandler = patchCategoryExtrasFromModal;
  }

  return (
    <BaseCategoryModal
      open={open}
      header="Add category"
      isExtrasTabDisabled={!isCategoryCreated}
      onFormSubmit={submitHandler}
      customModalBody={shouldRenderMsgInsteadInfoForm && CATEGORY_CREATED_MSG}
      isSubmitDisabled={shouldRenderMsgInsteadInfoForm}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateCategoryModal);

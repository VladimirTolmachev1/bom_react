/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { connect } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';

import { BaseDishModal } from './base';
import {
  createDishFromModal,
  patchDishExtrasFromModal,
  patchDishSizesFromModal,
  isDishCreationModalOpenSelector,
  dishModalActiveStepSelector,
  managedDishIdSelector,
  dishModalStepsValues as steps,
} from '../../../modules/modals/dish';

const DISH_CREATED_MSG = (
  <Grid container justify="center" alignItems="center" direction="column">
    <Typography variant="subtitle1" color="primary" paragraph align="center">
      The dish has been created sucessfuly!
    </Typography>
    <Typography align="center">
      Now you can customize it by adding extras on "Extras" tab or sizes on
      "Sizes" tab
    </Typography>
    <Typography align="center">
      For creating new dish click on "Reset" button
    </Typography>
  </Grid>
);

const mapStateToProps = state => ({
  open: isDishCreationModalOpenSelector(state),
  activeStep: dishModalActiveStepSelector(state),
  isDishCreated: !!managedDishIdSelector(state),
});

const mapDispatchToProps = {
  createDishFromModal,
  patchDishExtrasFromModal,
  patchDishSizesFromModal,
};

const CreateDishModal = ({
  createDishFromModal,
  patchDishExtrasFromModal,
  patchDishSizesFromModal,
  isDishCreated,
  activeStep,
  open,
}) => {
  let submitHandler = createDishFromModal;
  const shouldRenderMsgInsteadInfoForm =
    isDishCreated && activeStep === steps.INFO;

  if (activeStep === steps.EXTRAS) {
    submitHandler = patchDishExtrasFromModal;
  }

  if (activeStep === steps.SIZES) {
    submitHandler = patchDishSizesFromModal;
  }

  return (
    <BaseDishModal
      open={open}
      header="Add dish"
      isExtrasTabDisabled={!isDishCreated}
      onFormSubmit={submitHandler}
      customModalBody={shouldRenderMsgInsteadInfoForm && DISH_CREATED_MSG}
      isSubmitDisabled={shouldRenderMsgInsteadInfoForm}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateDishModal);

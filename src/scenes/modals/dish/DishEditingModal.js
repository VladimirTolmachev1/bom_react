import React from 'react';
import { connect } from 'react-redux';

import { BaseDishModal } from './base';
import {
  updateDishFromModal,
  patchDishExtrasFromModal,
  patchDishSizesFromModal,
  dishModalActiveStepSelector,
  isDishEditingModalOpenSelector,
  dishModalStepsValues as steps,
  managedDishIdSelector,
} from '../../../modules/modals/dish';
import { getDishById } from '../../../modules/dishes';

const mapStateToProps = state => ({
  open: isDishEditingModalOpenSelector(state),
  activeStep: dishModalActiveStepSelector(state),
  dishId: managedDishIdSelector(state),
});

const mapDispatchToProps = {
  updateDishFromModal,
  patchDishExtrasFromModal,
  patchDishSizesFromModal,
  getDishById,
};

const DishEditingModal = ({
  dishId,
  activeStep,
  updateDishFromModal,
  patchDishExtrasFromModal,
  patchDishSizesFromModal,
  getDishById,
  open,
}) => {
  let submitHandler = updateDishFromModal;

  if (activeStep === steps.EXTRAS) {
    submitHandler = patchDishExtrasFromModal;
  }

  if (activeStep === steps.SIZES) {
    submitHandler = patchDishSizesFromModal;
  }

  return (
    <BaseDishModal
      open={open}
      onEnter={() => getDishById(dishId)}
      header="Editing dish"
      onFormSubmit={submitHandler}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DishEditingModal);

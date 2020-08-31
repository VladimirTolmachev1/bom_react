import React from 'react';
import { connect } from 'react-redux';

import { BaseCategoryModal } from './base';
import {
  updateCategoryFromModal,
  patchCategoryExtrasFromModal,
  categoryModalOpenSelector,
  categoryModalIsEditingSelector,
  categoryModalActiveStepSelector,
  initialCategoryFormsValuesSelector,
  categoryModalStepsValues as steps,
  managedCategoryIdSelector,
} from '../../../modules/modals/category';
import { getCategoryById } from '../../../modules/categories';

const mapStateToProps = state => ({
  open:
    categoryModalOpenSelector(state) && categoryModalIsEditingSelector(state),
  activeStep: categoryModalActiveStepSelector(state),
  categoryId: managedCategoryIdSelector(state),
  initialValues: initialCategoryFormsValuesSelector(state),
});

const mapDispatchToProps = {
  updateCategoryFromModal,
  patchCategoryExtrasFromModal,
  getCategoryById,
};

const UpdateCategoryModal = ({
  categoryId,
  activeStep,
  updateCategoryFromModal,
  patchCategoryExtrasFromModal,
  getCategoryById,
  initialValues,
  open,
}) => {
  let submitHandler = updateCategoryFromModal;

  if (activeStep === steps.EXTRAS) {
    submitHandler = patchCategoryExtrasFromModal;
  }

  return (
    <BaseCategoryModal
      open={open}
      onEnter={() => getCategoryById({ id: categoryId })}
      header="Editing category"
      initialValues={initialValues}
      onFormSubmit={submitHandler}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateCategoryModal);

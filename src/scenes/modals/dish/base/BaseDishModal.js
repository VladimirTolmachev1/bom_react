import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, Divider, Grid, Typography } from '@material-ui/core';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';

import { BaseModal } from '../../BaseModal';
import {
  DishInfoForm,
  ExtrasForm,
  SizesForm,
} from '../../../../components/forms';
import {
  DishAutocompleteSection,
  ExtrasListsPreview,
  ExtrasSuggestionSection,
} from './components';

import {
  dishModalStepsValues as steps,
  dishModalStepsNamesByValues as stepNamesByValues,
} from '../../../../modules/modals/dish/dish-modal.utils';

import {
  extrasFromCategorySuggestionsSelector,
  initialDishFormsValuesSelector,
  dishModalActiveStepSelector,
  isDishFormInvalidSelector,
  isDishFormPristineSelector,
  managedDishIdSelector,
  setDishModal,
  clearDishModal,
  resetDishModalForms,
} from '../../../../modules/modals/dish';

import {
  dishListFiltersSelector,
  hasExtras,
  hasSizes,
  isSidngleDishLoadingSelector,
} from '../../../../modules/dishes';

import {
  copySizesToForm,
  lastSizesCopiedFromNameSelector,
  lastExtrasCopiedFromNameSelector,
  copyExtrasToForm,
} from '../../../../modules/forms/plugins';

import { getCategoryById } from '../../../../modules/categories';

const mapSizesToOptions = sizes =>
  sizes.map(({ id, name }) => ({
    name,
    value: id,
  }));

const mapStateToProps = state => ({
  isLoading: isSidngleDishLoadingSelector(state),
  isInvalid: isDishFormInvalidSelector(state),
  isPristine: isDishFormPristineSelector(state),
  activeStep: dishModalActiveStepSelector(state),
  category_id: dishListFiltersSelector(state).category_id,
  lastSizesCopiedFrom: lastSizesCopiedFromNameSelector(state),
  lastExtrasCopiedFrom: lastExtrasCopiedFromNameSelector(state),
  extrasSuggestions: extrasFromCategorySuggestionsSelector(state),
  initialValues: initialDishFormsValuesSelector(state),
  dishId: managedDishIdSelector(state),
});

const mapDispatchToProps = dispatch => ({
  changeActiveStep: (_, activeStep) => dispatch(setDishModal({ activeStep })),
  onClose: () => dispatch(clearDishModal()),
  onSecondaryAction: () => dispatch(resetDishModalForms()),
  copyExtrasToForm: extras => dispatch(copyExtrasToForm(extras)),
  copySizesToForm: sizes => dispatch(copySizesToForm(sizes)),
  getCategoryById: id => dispatch(getCategoryById({ id })),
});

export default
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class BaseDishModal extends PureComponent {
  bodyRenderByActiveStep = {
    [steps.INFO]: this.renderInfoSection,
    [steps.SIZES]: this.renderSizesSection,
    [steps.EXTRAS]: this.renderExtrasSection,
  };

  @autobind
  renderInfoSection() {
    const { initialValues } = this.props;

    return (
      <DishInfoForm
        initialValues={initialValues.dishInfoForm}
        initialSizes={initialValues.dishSizesForm.sizes}
      />
    );
  }

  @autobind
  handleCopyExtrasFromDish(dish) {
    const { copyExtrasToForm } = this.props;
    const {
      extras: extrasToCopy,
      extra_lists: extrasListsToCopy,
      label: copiedFrom,
    } = dish;

    copyExtrasToForm({ extrasToCopy, extrasListsToCopy, copiedFrom });
  }

  @autobind
  handleCopySizesFromDish(dish) {
    const { copySizesToForm } = this.props;

    copySizesToForm(dish.sizes, dish.label);
  }

  @autobind
  renderSizesSection() {
    const {
      category_id,
      lastSizesCopiedFrom,
      initialValues,
      dishId,
    } = this.props;

    return (
      <Grid container spacing={32}>
        <DishAutocompleteSection
          withSizes
          valuesToExclude={[dishId]}
          placeholder="Copy sizes from..."
          onChange={this.handleCopySizesFromDish}
          category_id={category_id}
          value={lastSizesCopiedFrom}
          optionFilter={hasSizes}
        />

        <Grid item container>
          <SizesForm initialValues={initialValues.dishSizesForm} />
        </Grid>
      </Grid>
    );
  }

  @autobind
  onModalEnter() {
    const { onEnter, getCategoryById, category_id } = this.props;
    category_id && getCategoryById(category_id);
    onEnter && onEnter();
  }

  @autobind
  renderExtrasSection() {
    const {
      initialValues,
      extrasFormProps,
      lastExtrasCopiedForm,
      extrasSuggestions,
      copyExtrasToForm,
      dishId,
    } = this.props;
    const { category_id } = this.props;

    return (
      <Grid container spacing={32}>
        <Grid item container>
          <DishAutocompleteSection
            withExtras
            valuesToExclude={[dishId]}
            placeholder="Copy extras from ..."
            onChange={this.handleCopyExtrasFromDish}
            category_id={category_id}
            value={lastExtrasCopiedForm}
            optionFilter={hasExtras}
          />

          <ExtrasSuggestionSection
            suggestions={extrasSuggestions}
            onExtraSelect={extra => copyExtrasToForm({ extrasToCopy: [extra] })}
            onExtraListSelect={list =>
              copyExtrasToForm({ extrasListsToCopy: [list] })
            }
          />
        </Grid>

        <Grid item container>
          <ExtrasForm
            GroupedExtrasListsComponent={ExtrasListsPreview}
            initialValues={initialValues.dishExtrasForm}
            extrasSectionHeader={
              <Typography variant="subtitle1">Single extras:</Typography>
            }
            canSetTargetSize
            sizesOptions={mapSizesToOptions(initialValues.dishSizesForm.sizes)}
            {...extrasFormProps}
          />
        </Grid>
      </Grid>
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
            <Tab label="Sizes" disabled={isExtrasTabDisabled} />
            <Tab label="Extras" disabled={isExtrasTabDisabled} />
          </Tabs>
          <Divider />
        </Grid>
      </Grid>
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
        open={open}
        onSecondaryAction={onSecondaryAction}
        submitBtnText={submitBtnText}
        {...baseModalProps || {}}
        onEnter={this.onModalEnter}>
        {customModalBody || this.bodyRenderByActiveStep[activeStep]()}
      </BaseModal>
    );
  }
}

BaseDishModal.propTypes = {
  onSubmit: PropTypes.func,
  restaurant_id: PropTypes.string,
  isInvalid: PropTypes.bool,
  extrasFormProps: PropTypes.object,
};

BaseDishModal.defaultProps = {
  extrasFormProps: {},

  initialValues: {
    dishInfoForm: {
      name: '',
      description: '',
    },
    dishExtrasForm: {
      extras: [],
      extra_lists: [],
    },
    dishSizesForm: {
      sizes: [],
    },
  },
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import { autobind } from 'core-decorators';

import { DragDropContext } from 'react-beautiful-dnd';
import { HelperService } from '../../services';

import { CategoriesList, DishList } from './components';
import { CreateCategoryModal, UpdateCategoryModal } from '../modals/category';
import { DishCreationModal, DishEditingModal } from '../modals/dish';
import { setCategoryModal } from '../../modules/modals/category';
import { setDishModal } from '../../modules/modals/dish';

import { showConfirm } from '../AppConfirm/modules';
import { queryParamsFromPropsSelector } from '../../selectors/common';

import {
  dndDragEnd,
  initializeDroppable,
  saveMenuItemsReordering,
  isCategoriesInDndModeSelector,
  isDishesInDndModeSelector,
  dndDishesSelector,
  dndCategoriesSelector,
  resetDnd,
  CATEGORIES_DROPPABLE,
  DISHES_DROPPABLE,
} from '../../modules/dnd';

import {
  categoriesListLoading,
  categoriesListSelector,
  categoriesListFiltersSelector,
  getCategories,
  deleteCategory,
  updateCategory,
  updateCategoryFilters,
  cleanupCategories,
} from '../../modules/categories';

import {
  setManagedRestaurant,
  clearManagedRestaurant,
} from '../../modules/restaurants';

import {
  getDishes,
  dishListLoadingSelector,
  allDishesSelector,
  publishDishes,
  removeDish,
  updateDishFilters,
  dishListCountSelector,
  dishListFiltersSelector,
  setDishPage,
  unpublishDishes,
  cleanupDish,
  cleanDishList,
} from '../../modules/dishes';

import './Menu.scss';

const mapStateToProps = (state, ownProps) => ({
  categories: categoriesListSelector(state),
  dndCategories: dndCategoriesSelector(state),
  dishes: allDishesSelector(state),
  dndDishes: dndDishesSelector(state),
  dishesCount: dishListCountSelector(state),
  dishesLoading: dishListLoadingSelector(state),
  dishFilters: dishListFiltersSelector(state),
  categoriesFilters: categoriesListFiltersSelector(state),
  categoriesLoading: categoriesListLoading(state),
  queryParams: queryParamsFromPropsSelector(ownProps),
  isDndMode:
    isCategoriesInDndModeSelector(state) && isDishesInDndModeSelector(state),
});

const mapDispatchToProps = {
  getCategories,
  getDishes,
  deleteCategory,
  updateCategory,
  showConfirm,
  updateCategoryFilters,
  publishDishes,
  unpublishDishes,
  updateDishFilters,
  removeDish,
  setDishPage,
  cleanupDish,
  cleanupCategories,
  cleanDishList,

  resetDnd,
  dndDragEnd,
  initializeDroppable,
  saveMenuItemsReordering,

  setCategoryModal,
  setDishModal,

  setManagedRestaurant,
  clearManagedRestaurant,
};

export default
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class MenuRestorator extends Component {
  static propTypes = {
    getCategories: PropTypes.func,
    deleteCategory: PropTypes.func,
    updateCategory: PropTypes.func,
    showConfirm: PropTypes.func,
    categories: PropTypes.array,
    categoriesLoading: PropTypes.bool,
  };

  componentWillUnmount() {
    const {
      cleanupDish,
      cleanupCategories,
      clearManagedRestaurant,
    } = this.props;
    clearManagedRestaurant();
    cleanupCategories();
    cleanupDish();
  }

  async componentDidMount() {
    const {
      getCategories,
      cleanupDish,
      updateCategoryFilters,
      categoriesFilters,
      queryParams,
      setManagedRestaurant,
    } = this.props;
    // eslint-disable-next-line prefer-const
    let { restaurant_id, category_id } = queryParams;
    const categoryBody = { restaurant_id };

    cleanupDish();
    updateCategoryFilters(categoryBody);

    if (restaurant_id) {
      setManagedRestaurant({ id: restaurant_id });
    }

    const categories = await getCategories({
      body: { ...categoriesFilters, ...categoryBody },
    }).promise;

    if (!categories.data.length) {
      return;
    }

    if (!categories.data.find(category => category.id === category_id)) {
      category_id = categories.data[0].id;
    }

    this.handleSetQueryParams({ category_id }, true);
  }

  @autobind
  dishesRequest(category_id) {
    const { dishFilters, updateDishFilters, getDishes } = this.props;

    const dishBody = { category_id };
    updateDishFilters(dishBody);
    getDishes({ body: { ...dishFilters, ...dishBody } });
  }

  @autobind
  onAddCategoryClick() {
    const { toggleCategoryModal, setCategoryModalMode } = this.props;

    toggleCategoryModal();
    setCategoryModalMode('add');
  }

  @autobind
  onAddDishClick() {
    const { toggleDishModal } = this.props;
    toggleDishModal();
  }

  @autobind
  onPublishClick() {
    const { publishDishes, dishes, showConfirm } = this.props;
    const ids = dishes.filter(dish => !dish.isPublished).map(dish => dish.id);

    showConfirm({
      data: { dish_items: ids },
      onSuccess: publishDishes,
      content: 'Are you sure you want to publish all unpublished dishes?',
    });
  }

  isAddNewDishDisabled() {
    const { categories, queryParams } = this.props;

    return !queryParams.category_id || !categories.length;
  }

  isPublishUpdatesDisabled() {
    const { dishes } = this.props;
    return dishes.every(dish => dish.isPublished);
  }

  @autobind
  handleCategoryFilterChange({ id }) {
    this.handleSetQueryParams({ category_id: id });
  }

  handleSetQueryParams(queryParamsObj, forceDishLoading = false) {
    const {
      cleanupDish,
      queryParams: { restaurant_id, category_id },
      history,
    } = this.props;

    if (+queryParamsObj.category_id === +category_id && !forceDishLoading) {
      return;
    }

    const query = HelperService.objToQueryString({
      restaurant_id,
      ...queryParamsObj,
    });

    if (queryParamsObj.category_id) {
      this.dishesRequest(queryParamsObj.category_id);
    } else {
      cleanupDish();
    }

    history.push(`/menu?${query}`);
  }

  @autobind
  async handleDeleteCategory({ body }) {
    const { deleteCategory, categories } = this.props;
    let category_id;

    try {
      await deleteCategory({ body }).promise;

      const filteredCategories = categories.filter(({ id }) => id !== body.id);
      const { length } = filteredCategories;
      if (length) {
        category_id = filteredCategories[length - 1].id;
      }

      this.handleSetQueryParams({ category_id });
    } catch (error) {
      // todo: error notifications
    }
  }

  @autobind
  openCategoryCreatingModal() {
    const { setCategoryModal } = this.props;
    setCategoryModal({ open: true });
  }

  @autobind
  openCategoryEditingModal(categoryId) {
    const { setCategoryModal } = this.props;
    setCategoryModal({
      open: true,
      isEditing: true,
      categoryId,
    });
  }

  @autobind
  openDishCreationModal() {
    const { setDishModal } = this.props;
    setDishModal({ open: true });
  }

  @autobind
  openDishEditingModal(dishId) {
    const { setDishModal } = this.props;

    setDishModal({
      open: true,
      isEditing: true,
      dishId,
    });
  }

  @autobind
  setDndRearrangingMode() {
    const { initializeDroppable, dishes, categories } = this.props;

    initializeDroppable(CATEGORIES_DROPPABLE, categories, true);
    initializeDroppable(DISHES_DROPPABLE, dishes, true);
  }

  @autobind
  renderHeaderButtons() {
    const { isDndMode, resetDnd, saveMenuItemsReordering } = this.props;

    if (isDndMode) {
      return (
        <>
          <Button
            variant="contained"
            className="menu__add-dish-btn"
            onClick={resetDnd}>
            Cancel rearranging
          </Button>

          <Button
            variant="contained"
            color="primary"
            className="menu__add-dish-btn"
            onClick={saveMenuItemsReordering}
            disabled={this.isAddNewDishDisabled()}>
            Save
          </Button>
        </>
      );
    }

    return (
      <>
        <Button
          variant="contained"
          className="menu__add-dish-btn"
          color="primary"
          // onClick={this.onAddCategoryClick}
          onClick={this.openCategoryCreatingModal}>
          <Add />
          Add new category
        </Button>

        <Button
          variant="contained"
          className="menu__add-dish-btn"
          color="primary"
          onClick={this.openDishCreationModal}
          disabled={this.isAddNewDishDisabled()}>
          <Add />
          Add new dish
        </Button>

        <Button
          variant="contained"
          className="menu__add-dish-btn"
          color="primary"
          onClick={this.setDndRearrangingMode}>
          Rearrange
        </Button>
      </>
    );
  }

  render() {
    const { restaurant_id, category_id = '' } = this.props.queryParams;
    const {
      dishes,
      dndDishes,
      categories,
      dndCategories,
      dndDragEnd,
      isDndMode,
    } = this.props;

    return (
      <DragDropContext onDragEnd={dndDragEnd}>
        <CreateCategoryModal />
        <UpdateCategoryModal />
        <DishCreationModal />
        <DishEditingModal />

        <div className="app-static-container menu-container">
          <div className="menu__header">
            <h1>Menu management</h1>
            {this.renderHeaderButtons()}
          </div>

          <div className="menu__content">
            <div className="menu__content-aside">
              <h3>List of categories</h3>
              <CategoriesList
                {...HelperService.pick(this.props, [
                  'categories',
                  'setCategoryModalMode',
                  'toggleCategoryModal',
                  'categoriesLoading',
                  'showConfirm',
                  'dishFilters',
                  'updateDishFilters',
                  'getDishes',
                  'cleanDishList',
                ])}
                restaurant_id={restaurant_id}
                category_id={+category_id}
                handleDeleteCategory={this.handleDeleteCategory}
                handleEditCategoryClick={this.openCategoryEditingModal}
                isDndMode={isDndMode}
                categories={isDndMode ? dndCategories : categories}
              />
              {/*
                            <Button
                                variant={'contained'}
                                onClick={this.onPublishClick}
                                className={'menu__publish-btn'}
                                disabled={this.isPublishUpdatesDisabled()}
                                color={'secondary'}
                            >
                                Publish updates
                            </Button>
                            */}
            </div>

            <DishList
              category_id={category_id}
              isDndMode={isDndMode}
              dishes={isDndMode ? dndDishes : dishes}
              handleEditDishClick={this.openDishEditingModal}
              {...HelperService.pick(this.props, [
                'dishesLoading',
                'dishesCount',
                'setDishPage',
                'toggleDishModal',
                'showConfirm',
                'removeDish',
                'publishDishes',
                'unpublishDishes',
                'dishFilters',
                'getDishes',
                'setDishModalMode',
              ])}
            />
          </div>
        </div>
      </DragDropContext>
    );
  }
}

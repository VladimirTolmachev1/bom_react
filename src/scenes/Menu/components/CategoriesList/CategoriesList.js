import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import List from '@material-ui/core/List';
import { autobind } from 'core-decorators';
import { AppPreloaderSmall } from '../../../../components';
import { CategoryListItem } from '../CategoryListItem';
import './Categories.scss';
import { HelperService } from '../../../../services';
import { CATEGORIES_DROPPABLE } from '../../../../modules/dnd';

export class CategoriesList extends PureComponent {
  @autobind
  renderListItem({ name, id }, index) {
    const { isDndMode, handleEditCategoryClick } = this.props;
    return (
      <Draggable
        key={id}
        draggableId={id}
        index={index}
        isDragDisabled={!isDndMode}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            <CategoryListItem
              key={id}
              id={id}
              name={name}
              handleEditCategoryClick={handleEditCategoryClick}
              {...HelperService.pick(this.props, [
                'restaurant_name',
                'category_name',
                'restaurant_id',
                'category_id',
                'themeColor',
                'mode',
                'showConfirm',
                'handleDeleteCategory',
                'toggleCategoryModal',
                'setCategoryModalMode',
                'updateDishFilters',
                'dishFilters',
                'getDishes',
                'cleanDishList',
              ])}
            />
          </div>
        )}
      </Draggable>
    );
  }

  render() {
    const { categories, categoriesLoading, isDndMode } = this.props;

    return (
      <Droppable droppableId={CATEGORIES_DROPPABLE} isDropDisabled={!isDndMode}>
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <List className="categories-list">
              {categoriesLoading && (
                <AppPreloaderSmall className="categories-list__preloader" />
              )}
              {categories.map(this.renderListItem)}
              {provided.placeholder}
            </List>
          </div>
        )}
      </Droppable>
    );
  }
}

CategoriesList.propTypes = {
  updateDishFilters: PropTypes.func,
  dishFilters: PropTypes.any,
  categories: PropTypes.array,
  restaurant_id: PropTypes.string,
  showConfirm: PropTypes.func,
  handleDeleteCategory: PropTypes.func,
  categoriesLoading: PropTypes.bool,
  toggleCategoryModal: PropTypes.func,
  setCategoryModalMode: PropTypes.func,
  mode: PropTypes.string,
};

CategoriesList.defaultProps = {};

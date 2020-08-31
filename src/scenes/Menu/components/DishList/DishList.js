import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { autobind } from 'core-decorators';

import { HelperService } from '../../../../services';
import { AppPreloaderSmall } from '../../../../components';

import { DISHES_DROPPABLE } from '../../../../modules/dnd';
import { DishItem } from '../DishItem';

import './DishList.scss';

export class DishList extends PureComponent {
  mapDishItems() {
    const { dishes, showConfirm, isDndMode, handleEditDishClick } = this.props;

    return dishes.map((dish, index) => {
      return (
        <Draggable
          draggableId={dish.id}
          index={index}
          isDragDisabled={!isDndMode}
          key={`dish${dish.id}`}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
              <DishItem
                showConfirm={showConfirm}
                dish={dish}
                onEditClick={() => handleEditDishClick(dish.id)}
                {...HelperService.pick(this.props, [
                  'showConfirm',
                  'mode',
                  'updateDishFilters',
                  'removeDish',
                  'addDishInOrder',
                  'publishDishes',
                  'toggleDishModal',
                  'unpublishDishes',
                  'setDishModalMode',
                  'setDishSize',
                  'onBasketClick',
                ])}
              />
            </div>
          )}
        </Draggable>
      );
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScrollToBottom);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollToBottom);
  }

  @autobind
  onScrollToBottom() {
    const {
      dishesLoading,
      setDishPage,
      dishFilters,
      getDishes,
      dishes,
      category_id,
      dishesCount,
    } = this.props;

    const bottomOffset = 20;

    if (
      dishesLoading ||
      Boolean(dishes.length === dishesCount) ||
      !category_id ||
      !dishesCount ||
      window.innerHeight + window.scrollY <
        document.body.offsetHeight - bottomOffset
    ) {
      return false;
    }

    setDishPage(dishFilters.page + 1);
    getDishes({
      body: {
        ...dishFilters,
        page: dishFilters.page + 1,
        category_id,
      },
    });
  }

  render() {
    const { dishesLoading, mode, category, isDndMode } = this.props;
    return (
      <Droppable droppableId={DISHES_DROPPABLE} isDropDisabled={!isDndMode}>
        {provided => (
          <div
            className={`dish-list ${
              mode !== 'client' ? 'dish-list--admin' : ''
            }`}
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {category && category.name && (
              <>
                <Typography variant="h6">{category.name}:</Typography>
                <Typography align="justify" paragraph>
                  {category.description}
                </Typography>
              </>
            )}

            {this.mapDishItems()}

            {dishesLoading && (
              <AppPreloaderSmall className="dish-list__preloader" />
            )}
          </div>
        )}
      </Droppable>
    );
  }
}

DishList.propTypes = {
  category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  updateDishFilters: PropTypes.func,
  dishFilters: PropTypes.any,
  removeDish: PropTypes.func,
  dishesLoading: PropTypes.bool,
  publishDishes: PropTypes.func,
  showConfirm: PropTypes.func,
  toggleDishModal: PropTypes.func,
  setDishModalMode: PropTypes.func,
  dishes: PropTypes.array,
  mode: PropTypes.string,
};

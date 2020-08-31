import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import { autobind } from 'core-decorators';
import { NavLink } from 'react-router-dom';

export class CategoryListItem extends PureComponent {
  @autobind
  onDeleteClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const { showConfirm, handleDeleteCategory, id } = this.props;

    showConfirm({
      data: { body: { id } },
      onSuccess: handleDeleteCategory,
      content:
        'Are you sure you want to delete category? Note, that all dishes within this category will be also deleted.',
    });
  }

  @autobind
  onEditClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const { id, handleEditCategoryClick } = this.props;
    handleEditCategoryClick(id);
  }

  @autobind
  onClickListItem() {
    const {
      getDishes,
      id,
      dishFilters,
      updateDishFilters,
      category_id,
      cleanDishList,
    } = this.props;

    if (+category_id !== +id) {
      const dishBody = { category_id: id, page: 1 };

      cleanDishList();
      updateDishFilters(dishBody);

      getDishes({
        body: {
          ...dishFilters,
          ...dishBody,
        },
      });
    }
  }

  render() {
    const {
      restaurant_id,
      category_id,
      name,
      id,
      mode,
      restaurant_name,
      category_name,
      themeColor,
    } = this.props;
    // TODO: move all constants and renders, that related to "mode" props outside this component.
    // We should pass all specific stuf from outer component and make this component more stupid.
    const link =
      mode === 'client'
        ? `/r/${restaurant_name}/${name}`
        : `/menu?restaurant_id=${restaurant_id}&category_id=${id}`;

    const isActive =
      // eslint-disable-next-line no-nested-ternary
      mode === 'client'
        ? category_name === name
          ? 'active'
          : ''
        : category_id === id
        ? 'active'
        : '';

    const navLinkStyle = {
      backgroundColor: isActive ? themeColor : 'white',
    };

    return (
      <NavLink
        className={`categories-list__item ${isActive}`}
        style={navLinkStyle}
        to={link}
        key={id}>
        <ListItem key={id} onClick={this.onClickListItem}>
          <ListItemText className="categories-list__item-label">
            {name}
          </ListItemText>

          {mode !== 'client' && (
            <>
              <IconButton
                className="categories-list__item-control"
                onClick={this.onEditClick}>
                <Edit />
              </IconButton>

              <IconButton
                className="categories-list__item-control"
                onClick={this.onDeleteClick}>
                <Delete />
              </IconButton>
            </>
          )}
        </ListItem>
      </NavLink>
    );
  }
}

CategoryListItem.propTypes = {
  updateDishFilters: PropTypes.func,
  showConfirm: PropTypes.func,
  handleDeleteCategory: PropTypes.func,
  restaurant_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dishFilters: PropTypes.any,
  mode: PropTypes.string,
};

CategoryListItem.defaultProps = {};

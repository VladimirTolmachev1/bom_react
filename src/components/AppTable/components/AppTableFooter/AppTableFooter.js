import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import { AppTablePaginationActionsWrapped } from '../AppTablePaginationActions';

export class AppTableFooter extends Component {
  handleChangePage = (event, page) => {
    this.props.onPageChange(page + 1);
  };

  handleChangeRowsPerPage = event => {
    const { value } = event.target;
    this.props.onLimitChange(value);
  };

  render() {
    const { limit, page, total } = this.props;

    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            count={total}
            rowsPerPage={limit}
            page={page - 1}
            rowsPerPageOptions={[10, 25, 50, 100]}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            ActionsComponent={AppTablePaginationActionsWrapped}
          />
        </TableRow>
      </TableFooter>
    );
  }
}

AppTableFooter.propTypes = {
  limit: PropTypes.number,
  onLimitChange: PropTypes.func,
  onPageChange: PropTypes.func,
  total: PropTypes.number,
  page: PropTypes.number,
};

AppTableFooter.defaultProps = {
  limit: 10,
};

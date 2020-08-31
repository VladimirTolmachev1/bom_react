import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

import { autobind } from 'core-decorators';
import { AppTableFooter, AppTableHeader } from './components';
import { AppPreloaderSmall } from '../AppPreloaderSmall';

import './AppTable.scss';

export class AppTable extends PureComponent {
  static formatters = {};

  @autobind
  onSortHeaderCellClick(event) {
    let { sort_field } = event.currentTarget.dataset;
    const { onSortChange } = this.getTableOptions();
    let sort_order;

    if (sort_field !== this.props.sort_field) {
      sort_order = 'asc';
      onSortChange({ sort_field, sort_order });
      return;
    }

    switch (this.props.sort_order) {
      case '': {
        sort_order = 'asc';
        break;
      }
      case 'asc': {
        sort_order = 'desc';
        break;
      }
      case 'desc': {
        sort_order = '';
        sort_field = '';
        break;
      }
      default: {
        sort_order = 'asc';
        break;
      }
    }

    onSortChange({ sort_field, sort_order });
  }

  getSortCaretIcon(field) {
    const { sort_order } = this.props;

    // eslint-disable-next-line no-nested-ternary
    return sort_order ? (
      sort_order === 'asc' ? (
        <KeyboardArrowDown data-sort_field={field} />
      ) : (
        <KeyboardArrowUp data-sort_field={field} />
      )
    ) : null;
  }

  mapTableHead() {
    const { dataSettings } = this.props;
    const { sort_field } = this.props;
    return dataSettings.map(({ title, sort, field, style }, index) => {
      if (sort) {
        return (
          <TableCell
            key={index}
            data-sort_field={field}
            onClick={this.onSortHeaderCellClick}>
            <div
              className="voc-table_th-cell voc-table_th-cell--sort"
              style={style}>
              {title}
              {sort_field === field ? (
                this.getSortCaretIcon(field)
              ) : (
                <MoreHoriz data-sort_field={field} />
              )}
            </div>
          </TableCell>
        );
      }

      return (
        <TableCell key={index}>
          <div className="voc-table_th-cell" style={style}>
            {title}
          </div>
        </TableCell>
      );
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getTableCellFormatter(formatter) {
    return formatter ? AppTable.formatters[formatter] : null;
  }

  mapRow(item) {
    const { dataSettings } = this.props;

    return dataSettings.map(({ field, formatter, style, mask }, index) => {
      const dataField = item[field];

      if (typeof formatter === 'function') {
        return (
          <TableCell key={index} style={style}>
            {formatter(dataField, item)}
          </TableCell>
        );
      }

      const TableCellFormatter = this.getTableCellFormatter(formatter);

      return (
        <TableCell key={index} style={style}>
          {TableCellFormatter ? (
            <TableCellFormatter field={dataField} mask={mask} />
          ) : (
            dataField
          )}
        </TableCell>
      );
    });
  }

  mapTableBodyRows() {
    const {
      data,
      options: { rowStyle },
    } = this.props;
    return data.map((item, index) => (
      <TableRow key={index} style={rowStyle}>
        {this.mapRow(item)}
      </TableRow>
    ));
  }

  getEmptyTable() {
    const { dataSettings } = this.props;
    const cellsLength = dataSettings.length;

    return (
      <TableRow className="voc-table__empty">
        <TableCell colSpan={cellsLength}>There is no data to display</TableCell>
      </TableRow>
    );
  }

  getTableOptions() {
    const defaultOptions = {
      onSortChange: this.onSortChange,
      onLimitChange: this.onLimitChange,
      onSearchType: this.onSearchType,
      onPageChange: this.onPageChange,
    };

    return { ...defaultOptions, ...this.props.options };
  }

  updateFiltersAndRequest(newFilters) {
    const {
      options: { updateFilters, requestTrigger },
      filters,
    } = this.props;
    updateFilters(newFilters);
    requestTrigger({ ...filters, ...newFilters });
  }

  @autobind
  onSortChange(newFilters) {
    this.updateFiltersAndRequest(newFilters);
  }

  @autobind
  onPageChange(page) {
    this.updateFiltersAndRequest({ page });
  }

  @autobind
  onLimitChange(limit) {
    this.updateFiltersAndRequest({ limit, page: 1 });
  }

  @autobind
  onSearchType(search) {
    this.updateFiltersAndRequest({ search, page: 1 });
  }

  render() {
    const {
      onPageChange,
      onLimitChange,
      rowStyle,
      onSearchType,
      haveSearch,
      customTableHeader,
    } = this.getTableOptions();

    const { limit, search, page, data, total, loading } = this.props;

    return (
      <div
        className={`voc-table__container ${loading &&
          'voc-table__container-loading'}`}>
        <AppTableHeader
          {...{
            haveSearch,
            search,
            onSearchType,
          }}>
          {customTableHeader}
        </AppTableHeader>
        <div
          className={`voc-table__wrapper ${loading &&
            'voc-table__wrapper-loading'}`}>
          {loading && <AppPreloaderSmall />}
          <Table className="voc-table">
            <TableHead className="voc-table__header">
              <TableRow style={rowStyle}>{this.mapTableHead()}</TableRow>
            </TableHead>
            <TableBody className="voc-table__body">
              {data.length ? this.mapTableBodyRows() : this.getEmptyTable()}
            </TableBody>
            <AppTableFooter
              {...{
                total,
                page,
                limit,
                onPageChange,
                onLimitChange,
              }}
            />
          </Table>
        </div>
      </div>
    );
  }
}

AppTable.propTypes = {
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,

  dataSettings: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      formatter: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      style: PropTypes.shape({
        width: PropTypes.string,
        textAlign: PropTypes.string,
        maxWidth: PropTypes.string,
      }),
      sort: PropTypes.bool,
      mask: PropTypes.string,
    }),
  ).isRequired,

  sort_order: PropTypes.string,
  sort_field: PropTypes.string,
  search: PropTypes.string,
  limit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,

  options: PropTypes.shape({
    onSortChange: PropTypes.func,
    updateFilters: PropTypes.func,
    haveSearch: PropTypes.bool,
    requestTrigger: PropTypes.func,
    rowStyle: PropTypes.shape({
      height: PropTypes.string,
    }),
    customTableHeader: PropTypes.any,
    onSearchType: PropTypes.func,
    onPageChange: PropTypes.func,
    onLimitChange: PropTypes.func,
  }).isRequired,
};

import React, { PureComponent } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { autobind } from 'core-decorators';

import { AppSelect } from '../../../../../../components';

import styles from './styles';

export default
@withStyles(styles)
class ExtrasSuggestionSection extends PureComponent {
  mapExtrasToOptions(extras) {
    return extras.map(({ id, name }) => ({
      name,
      value: id,
    }));
  }

  mapExtrasListsToOptions(lists) {
    return lists.map(({ id, name }) => ({
      name,
      value: id,
    }));
  }

  @autobind
  onExtraChange({ extraId }) {
    const { onExtraSelect, suggestions } = this.props;
    const extra = suggestions.extras.find(({ id }) => id === extraId);

    onExtraSelect && onExtraSelect(extra);
  }

  @autobind
  onExtraListsChange({ extraListId }) {
    const { onExtraListSelect, suggestions } = this.props;
    const extraList = suggestions.extra_lists.find(
      ({ id }) => id === extraListId,
    );

    onExtraListSelect && onExtraListSelect(extraList);
  }

  render() {
    const { suggestions, classes } = this.props;
    const extrasOptions = this.mapExtrasToOptions(suggestions.extras);
    const extrasListsOptions = this.mapExtrasListsToOptions(
      suggestions.extra_lists,
    );

    return (
      <Grid
        container
        item
        spacing={32}
        className={classes.extrasSuggestionSection}>
        {extrasOptions.length > 0 && (
          <Grid item className={classes.sectionIntem}>
            <AppSelect
              withoutNone
              name="extraId"
              label="Attach extra"
              fullWidth
              options={extrasOptions}
              onChange={this.onExtraChange}
            />
          </Grid>
        )}

        {extrasListsOptions.length > 0 && (
          <Grid item className={classes.sectionIntem}>
            <AppSelect
              withoutNone
              name="extraListId"
              label="Attach extra list"
              options={extrasListsOptions}
              fullWidth
              onChange={this.onExtraListsChange}
            />
          </Grid>
        )}
      </Grid>
    );
  }
}

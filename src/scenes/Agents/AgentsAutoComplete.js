import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { AppCleanHOC, AppAutoComplete } from '../../components';

import {
  agentsFiltersSelector,
  agentsListSelector,
  getAgents,
  updateFilters,
  abortPageRequests,
  agentsLoadingSelector,
} from './modules';

const mapStateToProps = state => ({
  agents: agentsListSelector(state),
  filters: agentsFiltersSelector(state),
  loading: agentsLoadingSelector(state),
});

const mapDispatchToProps = {
  getAgents,
  updateFilters,
  abortPageRequests,
};

export default
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@AppCleanHOC
class AgentsAutoComplete extends PureComponent {
  @autobind
  onInputChange(name) {
    const { getAgents } = this.props;
    getAgents({ body: { name } });
  }

  @autobind
  onChange({ label: agent_name }) {
    const { onChange } = this.props;
    onChange({ agent_name });
  }

  @autobind
  componentDidMount() {
    const { getAgents } = this.props;
    getAgents({ body: {} });
  }

  render() {
    const { compareKey } = this.props;

    const { agents, value, loading } = this.props;
    return (
      <AppAutoComplete
        loading={loading}
        onInputChange={this.onInputChange}
        options={agents}
        compareKey={compareKey}
        value={value}
        onChange={this.onChange}
        placeholder="Sales Agent"
      />
    );
  }
}

AgentsAutoComplete.propTypes = {
  agents: PropTypes.array,
  loading: PropTypes.bool,
  compareKey: PropTypes.string,
  onChange: PropTypes.func,
};

AgentsAutoComplete.defaultProps = {
  compareKey: 'label',
};

import React from 'react';

export function AppCleanHOC(Component) {
  return class VocRequestClean extends React.Component {
    componentWillUnmount() {
      this.props.abortPageRequests();
    }

    render() {
      return <Component {...this.props} />;
    }
  };
}

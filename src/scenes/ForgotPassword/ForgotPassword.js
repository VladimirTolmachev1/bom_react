import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Button from '@material-ui/core/Button';
import { autobind } from 'core-decorators';

import {
  forgotPassword,
  abortPageRequests,
  forgotPasswordLoadingSelector,
} from '../../modules/core';
import {
  AppCleanHOC,
  AppPreloaderSmall,
  AppFormTextField,
} from '../../components';
import { forgotPasswordValidation } from './modules';

const formFieldsSelector = formValueSelector('ForgotPassword');

const mapStateToProps = state => ({
  loading: forgotPasswordLoadingSelector(state),
  email: formFieldsSelector(state, 'email'),
});

const mapDispatchToProps = {
  forgotPassword,
  abortPageRequests,
};

export default
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@reduxForm({
  form: 'ForgotPassword',
  validate: forgotPasswordValidation,
})
@AppCleanHOC
class ForgotPassword extends Component {
  state = {
    success: false,
  };

  @autobind
  onSubmit(event) {
    const { forgotPassword, email } = this.props;
    event.preventDefault();
    event.stopPropagation();

    forgotPassword({ email }).promise.then(() => {
      this.setState({
        success: true,
      });
    });
  }

  render() {
    const { loading, invalid } = this.props;
    const { success } = this.state;

    if (success) {
      return (
        <div className="app-static-container auth">
          <h2 className="auth__title">Please, check your email</h2>
        </div>
      );
    }

    return (
      <div className="app-static-container auth">
        <h2 className="auth__title">Please, enter your email</h2>
        <form className="auth__form" onSubmit={this.onSubmit}>
          {loading && <AppPreloaderSmall />}
          <Field
            className="auth__field"
            name="email"
            required
            type="text"
            label="Email"
            component={AppFormTextField}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={loading || invalid}
            className="auth__button"
            color="primary">
            Send recovery link
          </Button>
        </form>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  loading: PropTypes.bool,
  invalid: PropTypes.bool,
};
ForgotPassword.defaultProps = {};

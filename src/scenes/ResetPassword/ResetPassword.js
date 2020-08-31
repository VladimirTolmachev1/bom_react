import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Button from '@material-ui/core/Button';
import { autobind } from 'core-decorators';
import {
  resetPassword,
  abortPageRequests,
  resetPasswordLoadingSelector,
  signOut,
} from '../../modules/core';
import {
  AppCleanHOC,
  AppPreloaderSmall,
  AppFormTextField,
} from '../../components';
import { resetPasswordValidation } from './modules';

const formFieldsSelector = formValueSelector('ResetPassword');

const mapStateToProps = (state, props) => ({
  loading: resetPasswordLoadingSelector(state),
  email: formFieldsSelector(state, 'email'),
  password: formFieldsSelector(state, 'password'),
  password_confirmation: formFieldsSelector(state, 'password_confirmation'),
  token: props.location.pathname.split('/')[3],
});

const mapDispatchToProps = {
  signOut,
  resetPassword,
  abortPageRequests,
};

export default
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@reduxForm({
  form: 'ResetPassword',
  validate: resetPasswordValidation,
})
@AppCleanHOC
class ResetPassword extends Component {
  // todo put this logic in middleware
  @autobind
  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const {
      resetPassword,
      email,
      password,
      password_confirmation,
      token,
    } = this.props;
    const request = resetPassword({
      email,
      password,
      password_confirmation,
      token,
    });
    request.promise.then(() => {
      this.props.history.push('/sign-in');
    });
  }

  componentDidMount() {
    const { signOut } = this.props;
    signOut();
  }

  render() {
    const { loading, invalid } = this.props;

    return (
      <div className="app-static-container auth">
        <h2 className="auth__title">Please, fill the form</h2>
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
          <Field
            className="auth__field"
            name="password"
            required
            type="password"
            label="Password"
            component={AppFormTextField}
          />
          <Field
            className="auth__field"
            name="password_confirmation"
            required
            type="password"
            label="Password confirmation"
            component={AppFormTextField}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={loading || invalid}
            className="auth__button"
            color="primary">
            Reset password
          </Button>
        </form>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  loading: PropTypes.bool,
  invalid: PropTypes.bool,
};
ResetPassword.defaultProps = {};

// password/reset/a170829a59996305b0d389efe7d81bd054170e6d369c8ba667d826a12dc0111a

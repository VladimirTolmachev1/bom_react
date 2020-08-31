import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Button from '@material-ui/core/Button';
import { autobind } from 'core-decorators';
import { NavLink } from 'react-router-dom';
import FormLabel from '@material-ui/core/FormLabel';

import { connect } from 'react-redux';
import {
  singInLoadingSelector,
  signIn,
  abortPageRequests,
  signOut,
} from '../../modules/core';
import {
  AppFormTextField,
  AppCleanHOC,
  AppPreloaderSmall,
} from '../../components';
import { signInValidation } from './modules';

const formFieldsSelector = formValueSelector('SignIn');

const mapStateToProps = state => ({
  email: formFieldsSelector(state, 'email'),
  password: formFieldsSelector(state, 'password'),
  loading: singInLoadingSelector(state),
});

const mapDispatchToProps = {
  signIn,
  abortPageRequests,
  signOut,
};

export default
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@reduxForm({
  form: 'SignIn',
  validate: signInValidation,
})
@AppCleanHOC
class SignIn extends Component {
  @autobind
  onSubmit(event) {
    const { signIn, email, password } = this.props;
    event.preventDefault();
    event.stopPropagation();
    signIn({ email, password });
  }

  componentDidMount() {
    const { signOut } = this.props;
    signOut();
  }

  render() {
    const { loading, invalid } = this.props;

    return (
      <div className="app-static-container auth">
        <h2 className="auth__title">Welcome to Best Online Menus</h2>
        <form className="auth__form" onSubmit={this.onSubmit}>
          {loading && <AppPreloaderSmall />}
          <h4 className="auth__subtitle">Please login to continue</h4>
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
            type="password"
            required
            label="Password"
            component={AppFormTextField}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={loading || invalid}
            className="auth__button"
            color="primary">
            Sign In
          </Button>
          <FormLabel color="primary">
            <NavLink to="/forgot-password"> Forgot password ? </NavLink>
          </FormLabel>
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {};

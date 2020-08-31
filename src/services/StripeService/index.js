export const STRIPE_OAUTH_BASE_URL =
  'https://connect.stripe.com/oauth/authorize?response_type=code&scope=read_write';
export const STRIPE_OAUTH_REDIRECT_URI = `${
  process.env.REACT_APP_HOSTNAME
}/restaurant/connect_to_stripe`;

export class StripeService {
  getStripePublishKey() {
    return process.env.REACT_APP_STRIPE_PUBLISH_KEY;
  }

  getStripeClientId() {
    return process.env.REACT_APP_STRIPE_CLIENT_ID;
  }

  getStripeOauthRedirectUri() {
    return STRIPE_OAUTH_REDIRECT_URI;
  }

  generateStripeOAuthLink() {
    const clientIdQuery = `client_id=${this.getStripeClientId()}`;
    const redirectUriQuery = `redirect_uri=${this.getStripeOauthRedirectUri()}`;

    return `${STRIPE_OAUTH_BASE_URL}&${clientIdQuery}&${redirectUriQuery}`;
  }
}

export default new StripeService();

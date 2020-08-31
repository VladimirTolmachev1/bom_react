import React, { PureComponent } from 'react';

import './Footer.scss';

export class Footer extends PureComponent {
  render() {
    const { color } = this.props;
    const footerStyle = {
      backgroundColor: color,
    };

    return (
      <footer className="app-footer app-container-fluid" style={footerStyle}>
        <div className="app-static-container app-footer__container">
          <div className="app-footer__info">
            <div className="app-footer__copyright">
              © 2018 Best Online Menus
            </div>
          </div>
          <div className="app-footer__powered-by">Powered by Etcetera</div>
        </div>
      </footer>
    );
  }
}

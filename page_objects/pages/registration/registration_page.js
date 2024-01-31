import { BasePage } from '../base_page';
import { HomePage } from '../home_page/home_page';


class RegistrationPage extends BasePage {
  _USERNAME_FIELD = 'input[name="username"]';
  _EMAIL_FIELD = 'input[name="email"]';
  _PASSWORD_FIELD = 'input[name="password"]';
  _SIGN_UP_BUTTON = 'button[type="submit"]';

  constructor () {
    super();
    this._url = '/register';
  }

  register (username, email, password) {
    cy
      .get(this._USERNAME_FIELD)
      .type(username);
    
    cy
      .get(this._EMAIL_FIELD)
      .type(email);

    cy
      .get(this._PASSWORD_FIELD)
      .type(password);

    cy
      .get(this._SIGN_UP_BUTTON)
      .click();

    return new HomePage();
  }

  assertRegistrationErrorIsDisplayed (error) {
    cy
      .contains(error)
      .should('be.visible');
  }
}

export {
  RegistrationPage,
};

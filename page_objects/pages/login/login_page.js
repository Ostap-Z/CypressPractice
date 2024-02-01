import { BasePage } from '../base_page';
import { HomePage } from '../home_page/home_page';


class LoginPage extends BasePage{
  _EMAIL_FIELD = 'input[name="email"]';
  _PASSWORD_FIELD = 'input[name="password"]';
  _SUBMIT_BUTTON = 'button[type="submit"]';

  /**
  * Constructor for the LoginPage class 
  * that calls the superclass (BasePage).
  * Represents the Login page.
  * 
  * @constructor
  */
  constructor () {
    super();
    this._url = '/login';
  }

  /**
  * Logs in with the provided email and password.
  * @param {string} email - email for login.
  * @param {string} password - password for login.
  * @returns {HomePage} HomePage instance after successful login.
  * 
  * @example 
  * // Example with a common usage
  * new LoginPage().login('username', 'password')
  * 
  * @example
  * // Example with the User dataclass usage
  * const user = User.create({
  *   EMAIL: 'email',
  *   USERNAME: 'username',
  *   PASSWORD: 'password',
  *   TOKEN: 'jwtToken'
  * });
  * new LoginPage().login(user.EMAIL, user.PASSWORD);
  */
  login (email, password) {
    cy
      .get(this._EMAIL_FIELD)
      .type(email);

    cy
      .get(this._PASSWORD_FIELD)
      .type(password);

    cy
      .get(this._SUBMIT_BUTTON)
      .click();

    return new HomePage();
  }

  assertLoginErrorIsDisplayed (error) {
    cy
      .contains(error)
      .should('be.visible');
  }
}

export {
  LoginPage,
};

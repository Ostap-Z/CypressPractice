import { BasePage } from '../base_page';


class HomePage extends BasePage{
  _USERNAME_LINK = 'div#root ul.navbar-nav > li:nth-child(4) > a';

  /**
  * Constructor for the HomePage class 
  * that calls the superclass (BasePage).
  * Represents the Home page.
  * 
  * @constructor
  */
  constructor () {
    super();
    this._url = '/';
  }

  assertUserNameIsDisplayed (userName) {
    cy
      .contains(userName)
      .should('be.visible');
  }
}

export {
  HomePage,
};

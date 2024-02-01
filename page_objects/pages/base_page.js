class BasePage {
  _url = '/';

  /**
  * Abstract constructor for the BasePage class.
  * Base class representing a page in the application.
  * 
  * @abstract
  * @constructor
  * @throws {TypeError} If instantiated directly.
  */
  constructor () {
    if (this.constructor === BasePage) {
      throw new TypeError(
        'Abstract class "BasePage" cannot be instantiated directly'
      );
    }
  }

  navigateToPage () {
    cy.visit(this._url);
    this.assertOnCorrectPage();
  }

  assertOnCorrectPage () {
    cy
      .url()
      .then((currentUrl) => {
        expect(currentUrl).to.include(this._url);
      });
  }
}

export {
  BasePage,
};

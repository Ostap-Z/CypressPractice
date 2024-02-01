class UserService {
  constructor (baseApiUrl) {
    this._baseApiUrl = baseApiUrl;
  }

  /**
  * Create a new user via API
  * @param {string} email - email of the user
  * @param {string} username - username of the user
  * @param {string} [password='123456'] - password of the user
  * @param {Object} [headers=null] - headers for the request
  *
  * @returns {Cypress.Chainable<Response>} - Cypress Chainable response
  */
  createUser (
    email,
    username,
    password = '123456',
    headers = null,
  ) {
    const url = `${this._baseApiUrl}/users`;

    return cy.request({
      url,
      method: 'POST',
      headers,
      body: {
        user: {
          email,
          password,
          username
        }
      }
    });
  }
}

export {
  UserService,
};

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// eslint-disable-next-line max-len
import { RegistrationPage } from '../../page_objects/pages/registration/registration_page';
import { HomePage } from '../../page_objects/pages/home_page/home_page';
import { UserService } from '../../helpers/services/user';
import { User } from '../../helpers/data_classes/user';


import {
  generateEmail,
  generateUsername,
  generatePassword,
} from '../../utilities/generators';


const registrationPage = new RegistrationPage();
const homePage = new HomePage();
const userService = new UserService(Cypress.env('conduitApiUrl'));

const email = generateEmail();
const username = generateUsername();
const password = generatePassword();

let user;

Given('I open the register page', () => {
  registrationPage.navigateToPage();
});

Given('I create a user via API', () => {
  const email = generateEmail();
  const userName = generateUsername();
  const password = generatePassword();

  userService.createUser(
    email, 
    userName, 
    password
  ).then((response) => {
    user = User.create({
      EMAIL: response.body.user.email,
      USERNAME: response.body.user.username,
    });
  });
});

When('I perform registration with a valid data', () => {
  registrationPage.register(username, email, password);
});

When(
  'I perform registration with an existing {string}',
  (credentialField) => {
    const username = credentialField === 'username'
      ? user.USERNAME
      : generateUsername();
  
    const email = credentialField === 'email'
      ? user.EMAIL
      : generateEmail();

    registrationPage.register(
      username,
      email,
      generatePassword()
    );
  }
);

When(
  'I leave a {string} empty in the registration form', 
  (credentialField) => {
    const username = credentialField === 'username'
      ? '{backspace}'
      : generateUsername();

    const email = credentialField === 'email'
      ? '{backspace}'
      : generateEmail();

    const password = credentialField === 'password'
      ? '{backspace}'
      : generatePassword();

    registrationPage.register(
      username,
      email,
      password
    );
  }
);

Then('I should see I am logged in', () => {
  homePage.assertUserNameIsDisplayed(username);
});

Then('I should see the {string} error', (error) => {
  registrationPage.assertRegistrationErrorIsDisplayed(error);
});

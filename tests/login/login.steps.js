import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

import { LoginPage } from '../../page_objects/pages/login/login_page';
import { HomePage } from '../../page_objects/pages/home_page/home_page';
import { UserService } from '../../helpers/services/user';
import { 
  generateEmail, 
  generatePassword, 
  generateUsername 
} from '../../utilities/generators';
import { User } from '../../helpers/data_classes/user';

let user;
const loginPage = new LoginPage();
const homePage = new HomePage();
const userService = new UserService(Cypress.env('conduitApiUrl'));


Given('I open the login page', () => {
  loginPage.navigateToPage();
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
      PASSWORD: password
    });
  });
});

When('I perform login with a previous created user', () => {
  loginPage.login(user.EMAIL, user.PASSWORD);
});

When('I perform log in with an invalid {string}', (credentialField) => {
  credentialField === 'email'
    ? loginPage.login(generateEmail(), user.PASSWORD)
    : loginPage.login(user.EMAIL, generatePassword());
});

Then('I should see I am logged in', () => {
  homePage.assertUserNameIsDisplayed(user.USERNAME);
});

Then('I should see the {string} error', (error) => {
  loginPage.assertLoginErrorIsDisplayed(error);
});

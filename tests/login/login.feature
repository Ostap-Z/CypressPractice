Feature: Login

    Feature tests that verifies log in flow

    Scenario: A user can log in with valid credentials
      Given I create a user via API
      And I open the login page
      When I perform login with a previous created user
      Then I should see I am logged in

    Scenario: A user can get an error when loging in with an invalid email
      Given I create a user via API
      And I open the login page
      When I perform log in with an invalid email
      Then I should see the 'email or password is invalid' error

    Scenario: A user can get an error when loging in with an invalid password
      Given I create a user via API
      And I open the login page
      When I perform log in with an invalid password
      Then I should see the 'email or password is invalid' error

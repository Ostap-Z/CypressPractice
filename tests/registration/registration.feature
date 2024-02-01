Feature: Registration

    Feature tests that verifies registration flow

    Scenario: A user can create an account when registering with a valid data
      Given I open the register page
      When I perform registration with a valid data
      Then I should see I am logged in

    Scenario Outline: A user can get an error when registering with existing credentials
      Given I create a user via API
      And I open the register page
      When I perform registration with an existing "<credentialField>"
      Then I should see the "<error>" error
      Examples:
        | credentialField | error                           |
        | username        | username has already been taken |
        | email           | email has already been taken    |

    Scenario Outline: A user can get an error when leave registation field empty
      Given I open the register page
      When I leave a "<credentialField>" empty in the registration form
      Then I should see the "<error>" error
      Examples:
        | credentialField | error                   |
        | username        | username can't be blank |
        | email           | email can't be blank    |
        | password        | password can't be blank |

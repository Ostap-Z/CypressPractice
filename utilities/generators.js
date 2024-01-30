import { faker } from '@faker-js/faker';

function generateEmail (prefix = true) {
  return prefix
    ? `${faker.string.uuid()}_${faker.internet.email()}`
    : `${faker.internet.email()}`;
}

function generateUsername (prefix = true) {
  return prefix
    ? `${faker.string.uuid()}_${faker.internet.userName()}`
    : `${faker.internet.userName()}`;
}

function generatePassword (length = 10) {
  return `${faker.internet.password({ length: length })}`;
}

export {
  generateEmail,
  generateUsername,
  generatePassword,
};

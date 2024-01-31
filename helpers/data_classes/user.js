import { Data } from 'dataclass';


class User extends Data {
  ID;
  EMAIL;
  USERNAME;
  PASSWORD;
  TOKEN;
  BIO;
  IMAGE;
}

export {
  User,
};

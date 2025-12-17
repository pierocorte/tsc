import API from "../api/API.mjs";
import User from "./User.mjs";

class UserList {
  #users = [];

  getUsers() {
    return this.#users;
  }
  setUsers(p) {
    this.#users = p;
  }

  parseFromJson(json) {
    console.log(json)
    let users = json.map((p) => {
      return new User(p);
    });
    this.setUsers(users);
  }
}

const USERS = new UserList();
// USERS.parseFromJson(await API.getUsers());
export default USERS;
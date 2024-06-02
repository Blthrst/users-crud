import Database from "better-sqlite3";

class UsersStorage {
  constructor(path) {
    this.db = new Database(path);
  }

  init() {
    this.db
    .prepare(`create table if not exists users (
            id integer primary key autoincrement,
            username varchar(255) not null
        );`)
    .run()

    return this
  }

  async asyncExecution(method, ...params) {
    return new Promise((res, rej) => {
        try {
            if (params) res(method(...params))

            res(method())
        } catch (err) {
            rej(err)
        }
    })
  }

  getUsers = () => {
    return this.db
    .prepare(`select * from users`)
    .all()
  }

  getUserById = (id) => {
    return this.db
    .prepare(`select * from users where id = ?`)
    .all(id)
  }

  updateUser = (updateBody) => {
    return this.db
    .prepare("update users set id = @newId, username = @username where id = @id")
    .run(updateBody)
  }

  deleteUser = (id) => {
    return this.db
    .prepare("delete from users where id = ?")
    .run(id)

  }

  createUser = (username) => {
    return this.db
    .prepare("insert into users (username) values (?)")
    .run(username)
  }

  async getUsersAsync() {
    return this.asyncExecution(this.getUsers)
  }

  async getUserByIdAsync(id) {
    return this.asyncExecution(this.getUserById, id)
  }

  async updateUserAsync(updateBody) {
    return this.asyncExecution(this.updateUser, updateBody)
  }

  async deleteUserAsync(id) {
    return this.asyncExecution(this.deleteUser, id)
  }

  async createUserAsync(username) {
    return this.asyncExecution(this.createUser, username)
  }
 
}

const model = new UsersStorage("./database.db").init()

export default model
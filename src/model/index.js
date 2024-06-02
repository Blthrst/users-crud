import Database from "better-sqlite3";

class UsersStorage {
  constructor(path) {
    this.__db = new Database(path);
  }

  init() {
    this.__db
    .prepare(`create table if not exists users (
            id int primary key not null,
            username varchar(255) not null
        );`)
    .run()

    return this
  }

  async asyncExecution(method) {
    return new Promise((res, rej) => {
        try {
            const result = method()
            res(result)
        } catch (err) {
            rej(err)
        }
    })
  }

  getUsers() {
    return this.__db
    .prepare(`select * from users`)
    .all()
  }

  getUserById(id) {
    return this.__db
    .prepare(`select * from users where id = ?`)
    .get(id)
  }

  updateUser(updateBody) {
    return this.__db
    .prepare("update users set id = @newId, username = @username where id = @id")
    .run(updateBody)
  }

  deleteUser(id) {
    return this.__db
    .prepare("delete from users where id = ?")
    .run(id)
  }

  async getUsersAsync() {
    return this.asyncExecution(this.getUsers)
  }

  async getUserByIdAsync() {
    return this.asyncExecution(this.getUserById)
  }

  async updateUserAsync(updateBody) {
    return this.asyncExecution(this.updateUser(updateBody))
  }

  async deleteUserAsync(id) {
    return this.asyncExecution(this.deleteUser(id))
  }
 
}

const model = new UsersStorage("./database.db").init()

export default model
import model from "../model/index.js"
import { apiErrors } from "./consts.js"

export async function getUsers(req, res) {

    const users = await model.getUsersAsync()

    if (users) {
        res.writeHead(200, {"Content-Type": "application/json"})
        res.write(JSON.stringify(users))
        res.end()

        return
    }

    res.writeHead(404, {"Content-Type": "application/json"})
    res.write(apiErrors.NOT_FOUND)
    res.end()
}
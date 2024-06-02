import model from "../model/index.js"
import { apiErrors } from "./consts.js"
import { parseBody } from "./parseBody.js"

export async function createUser(req, res) {
    const body = await parseBody(req, res)


    const user = await model.createUserAsync(body.username)

    if (user) {
        res.writeHead(200, {"Content-Type": "application/json"})
        res.write(JSON.stringify(user))
        res.end()

        return
    }

    res.writeHead(404, {"Content-Type": "application/json"})
    res.write(apiErrors.NOT_FOUND)
    res.end()
}
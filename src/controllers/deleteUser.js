import { parseBody } from "./parseBody.js"
import model from "../model/index.js"
import { apiErrors } from "./consts.js"

export async function deleteUser(req, res) {
    const {id} = await parseBody(req, res)

    const result = await model.deleteUserAsync(id)

    if (result) {
        res.writeHead(200, {"Content-Type": "application/json"})
        res.write(JSON.stringify(result))
        res.end()

        return
    }

    res.writeHead(404, {"Content-Type": "application/json"})
    res.write(apiErrors.NOT_FOUND)
    res.end()
}
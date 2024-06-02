import model from "../model/index.js"
import { apiErrors } from "./consts.js"
import { parseBody } from "./parseBody.js"

export async function updateUser(req, res) {
    const body = await parseBody(req, res)

    const user = await model.getUserByIdAsync(body.id)

    if (user) {

        const updatedUser = await model.updateUserAsync({
            newId: body.newId,
            id: body.id,
            username: body.username
        })
        
        res.writeHead(200, {"Content-Type": "application/json"})
        res.write(JSON.stringify(updatedUser))
        res.end()

        return
    }

    res.writeHead(404, {"Content-Type": "application/json"})
    res.write(apiErrors.NOT_FOUND)
    res.end()
}
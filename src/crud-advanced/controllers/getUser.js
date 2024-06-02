import url from "url"

import model from "../model/index.js"
import { apiErrors } from "./consts.js"

export async function getUser(req, res) {
    const {query} = url.parse(req.url, true)

    const user = await model.getUserByIdAsync(parseInt(query.id))

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
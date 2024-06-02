import url from "url"

import { getUser } from "./getUser.js"
import { createUser } from "./createUser.js"

async function router(req, res) {
    const parsedUrl = url.parse(req.url) 
    const {pathname} = parsedUrl
    const {query} = parsedUrl
    const method = req.method

    switch(pathname) {
        case "/users": {
            if (query) {
                await getUser(query.id)
                return
            }

            if (method === "POST") {
                await createUser(req, res)
                return
            }
        }
    }
}

export default router
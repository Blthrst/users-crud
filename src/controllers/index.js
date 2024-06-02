import url from "url"

import { getUser } from "./getUser.js"
import { getUsers } from "./getUsers.js"
import { createUser } from "./createUser.js"
import { updateUser } from "./updateUser.js"
import { deleteUser } from "./deleteUser.js"

async function router(req, res) {
    const parsedUrl = url.parse(req.url) 
    const {pathname} = parsedUrl
    const {query} = parsedUrl
    const method = req.method

    switch(pathname) {
        case "/users": {
            if (query) {
                await getUser(req, res)
                return
            }
            
            if (method === "GET") {
                await getUsers(req, res)
                return
            }

            if (method === "POST") {
                await createUser(req, res)
                return
            }

            if (method === "PUT") {
                await updateUser(req, res)
                return
            }

            if (method === "DELETE") {
                await deleteUser(req, res)
                return
            }
        }
    }
}

export default router
import http from "http"

import router from "./handlers.js"

const server = http.createServer(async (req, res) => await router(req, res))

server.listen(3001)
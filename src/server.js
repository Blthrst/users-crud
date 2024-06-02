import http from "http"

import router from "./controllers/index.js"

const server = http.createServer(async (req, res) => await router(req, res))

export default server
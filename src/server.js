import http from "http"

import router from "./controllers"

const server = http.createServer(router(req, res))

export default server
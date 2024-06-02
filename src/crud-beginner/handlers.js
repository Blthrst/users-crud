import url from "url";

export async function parseBody(req, res) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        resolve(data); // Resolve the promise with the parsed data
      } catch (err) {
        res.statusCode = 400;
        res.end("Invalid JSON");
        reject(err);
      }
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
}

const handlers = {
  users: [],

  getUser(id, res) {
    const user = this.users.find((elem) => elem.id === id);

    if (res) {
      if (!user) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write({ message: "Not found" });
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(user));
        res.end();
      }
    }
  },

  getUsers(res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(this.users));
    res.end();
  },

  createUser(res, user) {
    this.users.push(user);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Success" }));
    res.end();
  },

  updateUser(res, id, updateBody) {
    let user;

    for (let i = 0; i < this.users.length; i++) {
      if (id === this.users[i].id) {
        user = this.users[i];
        break;
      }
    }

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Not found" }));
      res.end();
      return;
    }

    const idx = this.users.indexOf(user);

    this.users.splice(idx, 1, updateBody);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Success" }));
    res.end();
  },

  deleteUser(res, id) {
    let user;

    for (let i = 0; i < this.users.length; i++) {
      if (id === this.users[i].id) {
        user = this.users[i];
        break;
      }
    }

    if (!user) return { message: "Not found" };

    this.users.splice(this.users.indexOf(user), 1);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Success" }));
    res.end();
  },
};

async function router(req, res) {
  const parsedUrl = url.parse(req.url);
  const { query } = parsedUrl;
  const { method } = req;

  switch (parsedUrl.pathname) {
    case "/users":
      {
        if (method === "GET") {
          if (query) {
            handlers.getUser(query.id, res);
          } else {
            handlers.getUsers(res);
          }

          return;
        }

        if (method === "POST") {
          const body = await parseBody(req, res);
          handlers.createUser(res, body);
          return;
        }

        if (method === "PUT") {
          const body = await parseBody(req, res);
          handlers.updateUser(res, body.id, {
            id: body.updateBody.id,
            username: body.updateBody.username,
          });

          return;
        }

        if (method === "DELETE") {
          const body = await parseBody(req, res);
          handlers.deleteUser(res, body.id);
          return;
        }
      }
      break;
  }
}

export default router;

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
      reject(err)
    });
  });
}

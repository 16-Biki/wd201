const http = require("http");
const fs = require("fs");
const path = require("path");
const minimist = require("minimist");
app.get("/registration", (req, res) => {
  res.sendFile(__dirname + "/registration.html");
});
const args = minimist(process.argv.slice(2));
const port = args.port || 3000;
const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/home") {
    fs.readFile(path.join(__dirname, "home.html"), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    });
  } else if (req.url === "/registration") {
    fs.readFile(path.join(__dirname, "registration.html"), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    });
  } else if (req.url === "/projects") {
    fs.readFile(path.join(__dirname, "project.html"), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Not Found</h1>");
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// 1. Core modules
const http = require("http"); // giving networking capabilities, such as building http server
const url = require("url");
const fs = require("fs");

// 2. party modules

// 3. Own modules

/// SERVER ///

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    // Overview page
    res.end("It's Overview");
  } else if (pathname === "/product") {
    // Product page
    res.end("It's Product");
  } else if (pathname === "/api") {
    // API
    /*
    // The version I like
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productData = JSON.parse(data);
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(data);
    });
    */
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(data);
  } else {
    // Not found
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  //Optional callback function for the event when the server start to listen
  console.log("Listening to requests on port 8000");
});

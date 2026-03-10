// const http=require("http");
// // const fs=require("fs");
// // const querystring=require("querystring")
// const server =http.createServer((req,res)=>{
//     res.statusCode=200;
//     res.setHeader("Content-Type","text/plain");
//     res.end("welcome to node.js tutorial");

// });

// server.listen(3000,()=>{
//     console.log("server is running on local host:3000");
// });

// const http = require("http");
// const fs = require("fs");
// const querystring = require("querystring");

// const server = http.createServer((req, res) => {

//     // Show the HTML page
//     if (req.method === "GET" && req.url === "/") {
//         fs.readFile("index.html", (err, data) => {
//             res.writeHead(200, { "Content-Type": "text/html" });
//             res.write(data);
//             res.end();
//         });
//     }

//     // Save the name
//     else if (req.method === "POST" && req.url === "/save") {
//         let body = "";

//         req.on("data", chunk => {
//             body += chunk;
//         });

//         req.on("end", () => {
//             const parsedData = querystring.parse(body);
//             const name = parsedData.username;

//             fs.appendFile("names.txt", name + "\n", () => {
//                 res.writeHead(200, { "Content-Type": "text/html" });
//                 res.end("<h2>Name Saved Successfully!</h2><a href='/'>Go Back</a>");
//             });
//         });
//     }

// });

// server.listen(3000, () => {
//     console.log("Server running at http://localhost:3000");
// });

const http = require("http");
const fs = require("fs");
const querystring = require("querystring");
 
const server = http.createServer((req, res) => {
 
  // Load HTML page
  if (req.method === "GET" && req.url === "/") {
    try {
      const data = fs.readFileSync("index.html");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error loading file");
    }
  }
 
  // Save name
  else if (req.method === "POST" && req.url === "/save") {
    let body = "";
 
    req.on("data", chunk => {
      body += chunk;
    });
 
    req.on("end", () => {
      const parsedData = querystring.parse(body);
      const name = parsedData.username;
 
      try {
        // 🔴 Artificial Blocking Delay
        for (let i = 0; i < 5e9; i++) {}
 
        fs.appendFileSync("names.txt", name + "\n");
 
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h2>Name saved successfully!</h2><a href='/'>Go back</a>");
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error saving name");
      }
    });
  }
 
});
 
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
 
var express = require("express");
var { readFileSync } = require("fs");
var path = require("path");
const app = express();

app.use("/api", async (req, res) => {
  console.log(req.query);
  const { type, bookName, title, author } = req.query;
  if (type && bookName) {
    let filePath = path.join(
      __dirname,
      type.replace(",", "/") + "/" + bookName + ".json"
    );
    const data = readFileSync(filePath);
    let jsonData = JSON.parse(data);
    if (title && title !== "") {
      jsonData = jsonData.filter((item) => {
        return item.title.includes(title);
      });
    }
    return res.json({ status: 200, data: jsonData });
  }
  res.json({ status: 200, data: "test" });
});

app.use("*", async (req, res) => {
  res.status(200).set({ "Content-Type": "text/html" }).end("路由错误！");
});

const port = process.env.SERVER_PORT || 9090;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

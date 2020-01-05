const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Custom-Header");
  next();
});

app.use(bodyParser());

app.post("/api/post", (req, res) => {
  const data = req.body;
  const resp = res;
  request.post(
    "https://api.vtexcrm.com.br/corebiz/dataentities/TE/documents",
    {
      json: {
        ...data
      }
    },
    (error, res, body) => {
      if (error) {
        resp.send(error);
        return;
      }
      console.warn(`statusCode: ${res.statusCode}`);
      resp.send(body);
    }
  );
});

app.listen(port, () => console.warn(`Listening on port ${port}`));

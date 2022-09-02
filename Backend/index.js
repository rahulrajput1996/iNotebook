const connecttomongo = require("./db.js");
const express = require("express");

connecttomongo();
const app = express();
const port = 5000;
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json()); //middleware for send body responses

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/author", require("./routes/author"));
app.use("/api/note", require("./routes/note"));

app.listen(port, () => {
  console.log(`server starts at at http://localhost:${port}`);
});

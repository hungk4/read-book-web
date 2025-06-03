const express = require("express");
const app = express();
const port = 3000;

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

const clientRoutes = require("./routes/client/index.route");
app.use("/", clientRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

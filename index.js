const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
const mongoose = require("mongoose");

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

// Middleware xử lý dữ liệu form và JSON
app.use(express.urlencoded({ extended: true })); // xử lý form POST (application/x-www-form-urlencoded)
app.use(express.json());                          // xử lý JSON từ client (application/json)


const clientRoutes = require("./routes/client/index.route");
const adminRoutes = require("./routes/admin/index.route");
app.use("/", clientRoutes);
app.use("/admin", adminRoutes);



const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Kết nối database thành công");
  } catch (error) {
    console.error("Kết nối database thất bại", error);
  }
};
connect();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

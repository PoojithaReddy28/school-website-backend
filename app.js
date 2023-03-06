const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:5000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

db.sequelize
  .sync({
    force: true,
  })
  .then(() => {
    console.log("Drop and re-sync db.");
    initial();
  });

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "author",
  });

  Role.create({
    id: 3,
    name: "editor",
  });

  Role.create({
    id: 4,
    name: "supervisor",
  });

  Role.create({
    id: 5,
    name: "principal",
  });

  Role.create({
    id: 6,
    name: "admin",
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Project Backend." });
});

require("./routes/article.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

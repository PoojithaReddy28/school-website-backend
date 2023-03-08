const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "project-session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
  })
);

const db = require("./models");
const Role = db.role;

db.sequelize
  .sync({
    force: true,
  })
  .then(() => {
    console.log("Drop and re-sync db.");
    initial();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "editor",
  });

  Role.create({
    id: 3,
    name: "supervisor",
  });

  Role.create({
    id: 4,
    name: "principal",
  });

  Role.create({
    id: 5,
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
require("./routes/media.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

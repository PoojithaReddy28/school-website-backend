const authJwt = require("../middleware/authJwt");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/public", controller.allAccess);

  app.get("/userpanel", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/editorpanel",
    [authJwt.verifyToken, authJwt.isEditor],
    controller.editorBoard
  );

  app.get(
    "/supervisorpanel",
    [authJwt.verifyToken, authJwt.isSupervisor],
    controller.supervisorBoard
  );

  app.get(
    "/principalpanel",
    [authJwt.verifyToken, authJwt.isPrincipal],
    controller.principalBoard
  );

  app.get(
    "/adminpanel",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};

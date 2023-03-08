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

  app.get("/api/private/all", controller.allAccess);

  app.get("/api/private/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/private/editor",
    [authJwt.verifyToken, authJwt.isEditor],
    controller.editorBoard
  );

  app.get(
    "/api/private/supervisor",
    [authJwt.verifyToken, authJwt.isSupervisor],
    controller.supervisorBoard
  );

  app.get(
    "/api/private/principal",
    [authJwt.verifyToken, authJwt.isPrincipal],
    controller.principalBoard
  );

  app.get(
    "/api/private/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};

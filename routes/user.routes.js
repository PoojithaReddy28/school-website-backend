const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/editor",
    [authJwt.verifyToken, authJwt.isEditor],
    controller.editorBoard
  );

  app.get(
    "/api/test/supervisor",
    [authJwt.verifyToken, authJwt.isSupervisor],
    controller.supervisorBoard
  );

  app.get(
    "/api/test/principal",
    [authJwt.verifyToken, authJwt.isPrincipa],
    controller.principalBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};

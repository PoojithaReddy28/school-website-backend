const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

isPrincipal = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "principal") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Principal Role",
      });
      return;
    });
  });
};

isSupervisor = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "supervisor") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Supervisor Role",
      });
      return;
    });
  });
};

isEditor = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "editor") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Editor Role",
      });
      return;
    });
  });
};

isAdminOrPrincipalOrSupervisorOrEditor = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "editor") {
          next();
          return;
        }

        if (roles[i].name === "supervisor") {
          next();
          return;
        }

        if (roles[i].name === "principal") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Editor or Supervisor or Principal or Admin Role",
      });
    });
  });
};

isAdminOrPrincipalOrSupervisor = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "supervisor") {
          next();
          return;
        }
        if (roles[i].name === "principal") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Supervisor or Principal or Admin Role",
      });
    });
  });
};

isAdminOrPrincipal = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "principal") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Principal or Admin Role",
      });
    });
  });
};

const authJWT = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isPrincipal: isPrincipal,
  isSupervisor: isSupervisor,
  isEditor: isEditor,
  isAdminOrPrincipalOrSupervisorOrEditor:
    isAdminOrPrincipalOrSupervisorOrEditor,
  isAdminOrPrincipalOrSupervisor: isAdminOrPrincipalOrSupervisor,
  isAdminOrPrincipal: isAdminOrPrincipal,
};
module.exports = authJWT;

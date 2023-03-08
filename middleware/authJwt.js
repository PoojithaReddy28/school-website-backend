const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.session.token;

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

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};

isPrincipal = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "principal") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Principal Role",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Principal role!",
    });
  }
};

isSupervisor = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "supervisor") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Supervisor Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Supervisor role!",
    });
  }
};

isEditor = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "editor") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Editor Role",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Supervisor role!",
    });
  }
};

isAdminOrPrincipalOrSupervisorOrEditor = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "editor") {
        return next();
      }

      if (roles[i].name === "supervisor") {
        return next();
      }

      if (roles[i].name === "principal") {
        return next();
      }
      if (roles[i].name === "admin") {
        return next();
      }
    }
    return res.status(403).send({
      message: "Require Editor or Supervisor or Principal or Admin Role",
    });
  } catch (error) {
    return res.status(500).send({
      message:
        "Unable to validate Editor or Supervisor or Principal or Admin role!",
    });
  }
};

const authJWT = {
  verifyToken,
  isAdmin,
  isPrincipal,
  isSupervisor,
  isEditor,
  isAdminOrPrincipalOrSupervisorOrEditor,
};
module.exports = authJWT;

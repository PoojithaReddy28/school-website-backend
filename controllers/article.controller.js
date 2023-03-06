const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;

//create and save an article
exports.create = (req, res) => {
  //validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Title cannot be empty",
    });
    return;
  }

  //write an article
  const article = {
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    published: req.body.published ? req.body.published : false,
  };

  //store article in db
  Article.create(db.article)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Article.",
      });
    });
};

//get all articles
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Article.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles.",
      });
    });
};

//get a single article
exports.findOne = (req, res) => {
  const id = req.params.id;

  Article.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Article with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Article with id=" + id,
      });
    });
};

//update an article by id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Article.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Article was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update Article with id=${id}. Maybe Article was not found `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Article with id=" + id,
      });
    });
};

//delete an article with specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Article.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Article was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Article with id=${id}. Maybe Article was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Article with id=" + id,
      });
    });
};

// delete all articles
exports.deleteAll = (req, res) => {
  Article.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Articles were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all articles",
      });
    });
};

//find all published articles
exports.findAllPublished = (req, res) => {
  Article.findAll({
    where: { published: true },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving articles",
      });
    });
};

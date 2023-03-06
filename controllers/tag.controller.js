const db = require("../models");
const Article = db.article;
const Tag = db.tag;

exports.create = (tag) => {
  return Tag.create({
    name: tag.name,
  })
    .then((tag) => {
      console.log(">> Created Tag: " + JSON.stringify(tag, null, 2));
      return tag;
    })
    .catch((err) => {
      console.log(">> Error while creating Tag: ", err);
    });
};

exports.findAll = () => {
  return Tag.findAll({
    include: [
      {
        model: Tutorial,
        as: "tutorials",
        attributes: ["id", "title", "description"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((tags) => {
      return tags;
    })
    .catch((err) => {
      console.log(">> Error while retrieving Tags: ", err);
    });
};

exports.findById = (id) => {
  return Tag.findByPk(id, {
    include: [
      {
        model: Article,
        as: "articles",
        attributes: ["id", "title", "description", "published", "content"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((tag) => {
      return tag;
    })
    .catch((err) => {
      console.log(">> Error while finding Tag: ", err);
    });
};

exports.addArticle = (tagId, articleId) => {
  return Tag.findByPk(tagId)
    .then((tag) => {
      if (!tag) {
        console.log("Tag not found!");
        return null;
      }
      return Article.findByPk(articleId).then((article) => {
        if (!article) {
          console.log("Article not found!");
          return null;
        }

        tag.addArcticle(article);
        console.log(`>> added Article id=${article.id} to Tag id=${tag.id}`);
        return tag;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Article to Tag: ", err);
    });
};

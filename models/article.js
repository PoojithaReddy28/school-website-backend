module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("article", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
    content: {
      type: Sequelize.STRING,
    },
  });

  return Article;
};

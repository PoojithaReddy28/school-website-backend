exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.editorBoard = (req, res) => {
  res.status(200).send("Editor Content");
};

exports.supervisorBoard = (req, res) => {
  res.status(200).send("Supervisor Content");
};

exports.principalBoard = (req, res) => {
  res.status(200).send("Principal Content");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content");
};

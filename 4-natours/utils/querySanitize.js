// Sanitization code by ChatGPT
const sanitize = (obj) => {
  for (let key in obj) {
    if (key.startsWith("$") || key.includes(".")) {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      sanitize(obj[key]);
    }
  }
};

module.exports = (req, res, next) => {
  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);
  next();
};

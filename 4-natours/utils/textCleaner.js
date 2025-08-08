exports.clean = (text) => {
  return text.replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
};

exports.slugify = (text) => {
  return this.clean(text).toLowerCase().replace(/\s/g, "-");
};

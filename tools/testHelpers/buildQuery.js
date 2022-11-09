const buildQuery = (queryArr) => {
  return queryArr.join(" ").trim();
};

module.exports = buildQuery;

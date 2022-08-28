class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keywords = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keywords });
    return this;
  }
  filter() {
    let keywords = { ...this.queryStr };
    const notRequiredKW = ["keyword", "page", "limit"];
    notRequiredKW.forEach((item) => delete keywords[item]);

    let queryString = JSON.stringify(keywords);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );
    keywords = JSON.parse(queryString);

    this.query = this.query.find({ ...keywords });
    return this;
  }

  pagination(pageSize) {
    const currentPage = this.queryStr.page || 1;
    const skip = pageSize * (currentPage - 1);

    this.query = this.query.skip(skip).limit(pageSize);
    return this;
  }
}

module.exports = ApiFeatures;

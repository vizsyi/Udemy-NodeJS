/*
  const query = dataModel.find()
    .where("duration")
    .gte(5)
    .equals(5)
    .where("difficulty")
    .equals("easy");
*/

class APIFeatures {
  constructor(dataModel, queryString) {
    this._dataModel = dataModel;
    this.query = dataModel.find();
    this._queryString = queryString;
  }

  // BUILD QUERY

  filter() {
    // 1A) Filtering
    const queryObj = { ...this._queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((exField) => delete queryObj[exField]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this._queryString.sort) {
      const sortBy = this._queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    //console.log("Query:", this.query);

    return this;
  }

  limitFields() {
    if (this._queryString.fields) {
      const fields = this._queryString.fields.split(",").join(" ");
      console.log("fields:", fields);
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  async paginateAsync() {
    const page = this._queryString.page * 1 || 1;
    const limit = this._queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    if (page > 1) {
      //if (req.query.page)
      const numTours = await this._dataModel.countDocuments();
      if (skip >= numTours) throw new Error("This page does not exist");
    }

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;

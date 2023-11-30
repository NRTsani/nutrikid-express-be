const handle = require("../../../utils/Handler/handlersFactory");
const Category = require("../category");

exports.createCategory = handle.createOne(Category);
exports.updateCategory = handle.updateOne(Category, "category");
exports.allCategories = handle.getAll(Category);
exports.getCategory = handle.getOne(Category, "category");
exports.deleteCategory = handle.deleteOne(Category, "category");

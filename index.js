var lib = require("./lib/query.js");

module.exports = lib.Query;
module.exports.query = lib.query;
module.exports.Query = lib.Query;

module.exports.Parser = {
    RestCondition: require('./lib/RestConditionParser.js').parser
};

module.exports.Executor = {
    ArrayExecutor: require('./lib/ArrayExecutor.js').Executor
};

module.exports.Composer = {
    MongoQueryComposer: require('./lib/composer/MongoQueryComposer.js').MongoQueryComposer
};
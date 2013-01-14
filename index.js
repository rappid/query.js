var lib = require("./lib/query.js");

module.exports = lib.Query;
module.exports.query = lib.query;
module.exports.Query = lib.Query;

module.exports.Parser = {
    RestConditionParser: require('./lib/RestConditionParser.js').parser
};

module.exports.Parser.RestQueryParser = require('./lib/RestQueryParser').RestQueryParser;

module.exports.Executor = {
    ArrayExecutor: require('./lib/ArrayExecutor.js').Executor
};

module.exports.Composer = {
    MongoQueryComposer: require('./lib/composer/MongoQueryComposer.js').MongoQueryComposer,
    RestQueryComposer: require('./lib/composer/RestQueryComposer.js').RestQueryComposer

};
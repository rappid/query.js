var chai = require('chai'),
    expect = chai.expect,
    index = require('..'),
    query = index.query,
    RestQueryParser = index.Parser.RestQueryParser,
    RestQueryComposer = index.Composer.RestQueryComposer;

describe('RestQueryParser', function () {

    describe('#parse', function(){

        it('should parse .where statement ', function(){
            var q = query()
                .gt("age", 4);

            var uriQuery = RestQueryComposer.compose(q);

            var parsedQuery = RestQueryParser.parse(uriQuery);

            expect(parsedQuery.toObject()).to.eql(q.toObject());
        });

        it('should parse .where statement with or', function () {
            var q = query()
                .or(function(){
                    this
                        .lt("number",3)
                        .eql("name","Tony")
                },function(){
                    this
                        .lt("number",5)
                        .eql("name","Marcus")
                })
                .gt("age", 4);

            var uriQuery = RestQueryComposer.compose(q);

            var parsedQuery = RestQueryParser.parse(uriQuery);

            expect(parsedQuery).to.eql(q);
        })
    });


});
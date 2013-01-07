var expect = require('chai').expect,
    index = require('..'),
    query = index.query,
    RestComposer = index.Composer.RestQueryComposer;


describe('RestQueryComposer', function () {

    describe('#compose', function () {

        it('should compose statement with where', function () {
            var q = query()
                .lt("number", 3)
                .gt("age", 4)
                .eql("name", "what")
                .in("unit", ["what", "the", "hell"]);

            var ret = RestComposer.compose(q);

            expect(ret.where).to.exist;
            expect(ret.where).to.equal("number<3 and age>4 and name=what and in(unit,(what,the,hell))");
        });

        it('should compose .where statement with or', function () {
            var q = query()
                .or(function () {
                    this
                        .lt("number", 3)
                        .eql("name", "Tony")
                }, function () {
                    this
                        .lt("number", 5)
                        .eql("name", "Marcus")
                })
                .gt("age", 4);

            var ret = RestComposer.compose(q);

            expect(ret.where).to.exist;
            expect(ret.where).to.equal("((number<3 and name=Tony) or (number<5 and name=Marcus)) and age>4");
        });

        it('should compose string numbers and boolean statements with type', function () {
            var q = query()
                .lt("a", "3")
                .gt("b", "4")
                .eql("c", "false")
                .eql("d", "true");

            var ret = RestComposer.compose(q);

            expect(ret.where).to.exist;
            expect(ret.where).to.equal("a\<string:3 and b>string:4 and c=string:false and d=string:true");
        });
    });

});
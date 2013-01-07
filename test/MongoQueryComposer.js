var expect = require('chai').expect,
    index = require('..'),
    query = index.query,
    MongoComposer = index.Composer.MongoQueryComposer;


describe('MongoQueryComposer', function () {

    describe('#compose', function () {
        it('should compose .where statement', function () {
            var q = query()
                .lt("number", 3)
                .gt("age", 4)
                .eql("name", "what")
                .in("unit", ["what", "the", "hell"]);

            var ret = MongoComposer.compose(q);

            expect(ret.where).to.exist;
            expect(ret.where).to.eql({
                $and: [
                    {
                        number: {
                            $lt: 3
                        }
                    },
                    {
                        age: {
                            $gt: 4
                        }
                    },
                    {
                        name: "what"
                    },
                    {
                        unit: {
                            $in: ["what", "the", "hell"]
                        }
                    }

                ]
            });
        });

        it('should compose .sort statement with right order', function () {
            var q = query()
                .sort("+age", "-name", "created");

            var ret = MongoComposer.compose(q);
            expect(ret.sort).to.exist;
            expect(ret.sort).to.eql({
                age: 1,
                name: -1,
                created: 1
            });

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

            var ret = MongoComposer.compose(q);

            expect(ret.where).to.exist;
            expect(ret.where).to.eql({
                $and: [
                    {
                        $or: [
                            {
                                $and: [
                                    {
                                        number: {
                                            $lt: 3
                                        }
                                    },
                                    {
                                        name: "Tony"
                                    }
                                ]
                            },
                            {
                                $and: [
                                    {
                                        number: {
                                            $lt: 5
                                        }
                                    },
                                    {
                                        name: "Marcus"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        age: {
                            $gt: 4
                        }
                    }
                ]

            });


        })
    });

});
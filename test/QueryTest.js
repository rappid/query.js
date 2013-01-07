var expect = require('chai').expect,
    query = require('..').query;

describe('query', function () {

    describe('empty query', function () {

        it('Create empty query', function () {
            query();
        });

        it('Empty query to parameters should not return any parameters', function () {
            expect(query().toObject()).to.eql({});
        });

    });

    describe('sort', function () {

        it('one field asc', function () {
            var q = query()
                .sort("name");

            expect(q.toObject()).to.eql({
                    sort: [
                        {
                            field: "name",
                            direction: 1
                        }
                    ]
                });

            expect(q.sortCacheId()).to.eql("+name");
        });

        it('one field desc', function () {
            var q = query()
                .sort("-name");

            expect(
                q.toObject()
            ).to.eql({
                    sort: [
                        {
                            field: "name",
                            direction: -1
                        }
                    ]
                });

            expect(q.sortCacheId()).to.eql("-name");
        });


        it('array', function () {
            var q = query()
                .sort([{
                    field: "xyz"
                }, {
                    field: "abc",
                    direction: -1
                }]);

            expect(
                q.toObject()
            ).to.eql({
                    sort: [
                        {
                            field: "xyz",
                            direction: 1
                        },
                        {
                            field: "abc",
                            direction: -1
                        }
                    ]
                });

            expect(q.sortCacheId()).to.eql("+xyz;-abc");
        });

        it('mixed up', function () {
            var q = query()
                .sort("name", "-firstname", "+birthday", {
                    field: "xyz"
                }, {
                    field: "abc",
                    direction: -1
                });

            expect(
                q.toObject()
            ).to.eql({
                    sort: [
                        {
                            field: "name",
                            direction: 1
                        }, {
                            field: "firstname",
                            direction: -1
                        }, {
                            field: "birthday",
                            direction: 1
                        }, {
                            field: "xyz",
                            direction: 1
                        }, {
                            field: "abc",
                            direction: -1
                        }
                    ]
                });

        });

    });

    describe('where', function () {

        it('one comparator', function () {
            expect(
                query()
                    .eql("name", "tony")
                    .toObject()
            ).to.eql({
                    where: {
                        operator: "and",
                        expressions: [
                            {
                                operator: "eql",
                                field: "name",
                                value: "tony"
                            }
                        ]
                    }
                });
        });

        it('multiple comparators', function () {
            expect(
                query()
                    .eql("name", "tony")
                    .gt("age", 18)
                    .toObject()
            ).to.eql({
                    where: {
                        operator: "and",
                        expressions: [
                            {
                                operator: "eql",
                                field: "name",
                                value: "tony"
                            },
                            {
                                operator: "gt",
                                field: "age",
                                value: 18
                            }
                        ]
                    }
                });
        });

        it('multiple comparators', function () {
            expect(
                query()
                    .eql({
                        name: "tony",
                        age: 26
                    })
                    .toObject()
            ).to.eql({
                    where: {
                        operator: "and",
                        expressions: [
                            {
                                operator: "eql",
                                field: "name",
                                value: "tony"
                            },
                            {
                                operator: "eql",
                                field: "age",
                                value: 26
                            }
                        ]
                    }
                });
        });

    });

    describe('sortCacheId', function(){
        it('should generate sort cache id', function(){
            var q = query()
                .sort("name", "-firstname", "+birthday", {
                    field: "xyz"
                }, {
                    field: "abc",
                    direction: -1
                });

            expect(q.sortCacheId()).to.eql("+name;-firstname;+birthday;+xyz;-abc");
        });

    });

    describe('whereCacheId', function(){

        it('should generate unique where cache id', function(){
            expect(
                query()
                    .eql("name", "tony")
                    .in("b",[1,2,3,4])
                    .whereCacheId()
            ).not.to.eql(
                    query()
                        .eql("name", "tony")
                        .in("b", [1, "2", 3, 4])
                        .whereCacheId()
                );

        });

    });


    describe('nested wheres', function () {

        it('not', function () {
            expect(
                query()
                    .not(function (where) {
                        where
                            .eql("name", "tony")
                    })
                    .toObject()
            ).to.eql({
                    where: {
                        operator: "and",
                        expressions: [
                            {
                                operator: "not",
                                expressions: [
                                    {
                                        operator: "and",
                                        expressions: [
                                            {
                                                operator: "eql",
                                                field: "name",
                                                value: "tony"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                });
        });

        it('or', function () {
            expect(
                query()
                    .or(function () {
                        this.eql("name", "tony")
                    }, function () {
                        this.eql("name", "marcus")
                    })
                    .toObject()
            ).to.eql({
                    where: {
                        operator: "and",
                        expressions: [
                            {
                                operator: "or",
                                expressions: [
                                    {
                                        operator: "and",
                                        expressions: [
                                            {
                                                operator: "eql",
                                                field: "name",
                                                value: "tony"
                                            }
                                        ]
                                    },
                                    {
                                        operator: "and",
                                        expressions: [
                                            {
                                                operator: "eql",
                                                field: "name",
                                                value: "marcus"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                });
        });

        it('or with composed wheres', function () {

            var where1 = query()
                .where()
                .eql("name", "tony");

            var where2 = query()
                .where()
                .eql("name", "marcus");

            expect(

                query()
                    .or(where1, where2)
                    .toObject()
            ).to.eql({
                    where: {
                        operator: "and",
                        expressions: [
                            {
                                operator: "or",
                                expressions: [
                                    {
                                        operator: "and",
                                        expressions: [
                                            {
                                                operator: "eql",
                                                field: "name",
                                                value: "tony"
                                            }
                                        ]
                                    },
                                    {
                                        operator: "and",
                                        expressions: [
                                            {
                                                operator: "eql",
                                                field: "name",
                                                value: "marcus"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                });
        });


    });


});

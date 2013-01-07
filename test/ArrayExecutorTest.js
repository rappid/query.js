var index = require(".."),
    expect = require('chai').expect,
    query = index.query,
    Executor = index.Executor.ArrayExecutor;


describe('ArrayExecutor', function () {

    var items = [
        {
            name: "Adam",
            age: 18,
            address: {
                city: "New York"
            }
        },
        {
            name: "Bob",
            age: 20
        },
        {
            name: "Charlie",
            age: 10
        }
    ];

    describe('#filterItems', function () {
        it('should filter eql', function () {
            var q = query()
                .eql("name", "Adam");

            var ret = Executor.filterItems(q,items);

            expect(ret.length).to.equal(1);
        });

        it('should filter gt', function () {
            var q = query()
                .gt("age", 10);

            var ret = Executor.filterItems(q,items);

            expect(ret.length).to.equal(2);
        });

        it('should filter lt', function () {
            var q = query()
                .lt("age", 20);

            var ret = Executor.filterItems(q,items);

            expect(ret.length).to.equal(2);
        });

        it('should filter "and" expressions', function () {
            var q = query()
                .lt("age", 20)
                .gt("age", 10);

            var ret = Executor.filterItems(q,items);

            expect(ret.length).to.equal(1);
        });

        it('should filter "or" expressions', function () {
            var q = query()
                .or(function () {
                    this.eql("name", "Adam");
                }, function () {
                    this.eql("name", "Bob");
                });


            var ret = Executor.filterItems(q,items);

            expect(ret.length).to.equal(2);
        });

        it('should filter over paths', function () {
            var q = query()
                .eql("address.city","New York");

            var ret = Executor.filterItems(q, items);

            expect(ret.length).to.equal(1);
        });

    });


    describe('#sortItems', function () {
        it('should sort items ascending', function () {
            var q = query()
                .sort("age");

            var ret = Executor.sortItems(q,items);

            expect(ret[0].age).to.equal(10);
            expect(ret[1].age).to.equal(18);
            expect(ret[2].age).to.equal(20);
        });

        it('should sort items descending', function () {
            var q = query()
                .sort("-age");

            var ret = Executor.sortItems(q,items);

            expect(ret[2].age).to.equal(10);
            expect(ret[1].age).to.equal(18);
            expect(ret[0].age).to.equal(20);
        })

    });


});
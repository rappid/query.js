[![Build Status](https://travis-ci.org/it-ony/query.js.png?branch=master)](https://travis-ci.org/it-ony/query.js)

# query.js
## Introduction

query.js is an abstract query language which can be mapped to different query language implementation. 
It runs in the browser as well as on Node.js.

## Installation
On Node.js include the query module.

    var query = require("query").query;
    var myQuery = query().eql("foo",3);

For use in the browser include the query.js file.

    <script src="lib/query.js" type="text/javascript"></script> 

## Javascript Module

To create a new query instance you have two options:

    var query = query();
    var query2 = new Query();


### SORTING
    
Sorting ascending by name:
    
    var q = query()
                .sort("name");

Sorting descending by name:

    var q = query()
                .sort("-name");
    
Sorting over more than one field (short written):
    
    var q = query()
                .sort("name", "-firstname", "+birthday");

Sorting over more than one field (long written):

    var q = query()
                .sort([{
                    field: "xyz"
                }, {
                    field: "abc",
                    direction: -1
                }]);
   
### COMPARISON operator

Comparison operators are by default concatinated with ANDs.

    var q = query()
              .eql("name", "tony")
              .gt("age", 18);
              
   
### NOT operator

    var q = query()
              .not(function (where) {
                  where
                      .eql("name", "tony")
              });
   
### OR operator
    
    var q = query()
              .or(function () {
                  this.eql("name", "tony")
              }, function () {
                  this.eql("name", "marcus")
              });

### AND operator
    var q = query()
              .and(function () {
                  this.eql("name", "tony")
              }, function () {
                  this.eql("name", "marcus")
              });
    

    
    
## Array query executor

The ArrayExecutor allows you to execute the query on an array of items.
    
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
    
    var q = query().eql("name", "Adam");

    var filterItems = ArrayExecutor.filterItems(q,items);
    
    /* output: [{
            name: "Adam",
            age: 18,
            address: {
                city: "New York"
            }
        }] */
    


## Query Parsers
* REST query parser - parses a REST query string to a query object

## Query Composers

The project includes the following query composers:
* REST query composer - composes the query to a REST query string
* MongoDB query composer - composes the query to a MongoDB JSON query format

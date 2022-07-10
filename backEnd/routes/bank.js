var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var mongodb = require('../models/mongodb');
var tableName1 = "bank"

router.post('/add', function (req, res, next) {
    var obj = req.body;
    delete obj._id;
    mongodb.insert(req, tableName1, obj, function (err, r) {
        if (err) {
            console.log(tableName1 + "add Error :-", err);
            res.json({ status: false });
        }
        else {
            res.json({ status: true })
        }
    })
    // })
});

router.post('/update', function (req, res, next) {
    var _id = ObjectID(req.body._id);
    var obj = req.body;
    delete obj._id;
    var myquery = { _id: _id };
    var newvalues = { $set: obj };
    mongodb.update(req, tableName1, myquery, newvalues, function (err, r) {
        if (err) {
            console.log(tableName1 + "update Error :-", err);
            res.json({ status: false });
        }
        else {
            res.json({ status: true })
        }
    })

});
router.get('/details', function (req, res, next) {

    mongodb.find(req, tableName1, {}, function (err, result) {
        if (err) res.json({});
        else {
            res.json(result);
        }
    })
});

module.exports = router;

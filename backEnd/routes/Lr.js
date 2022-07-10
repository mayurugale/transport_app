const { query } = require('express');
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var mongodb = require('../models/mongodb');
var _ = require('underscore');
var tableName1 = "lr"
var tableName2 = "consignor"

/* GET users listing. */
router.post('/add', function (req, res, next) {
    var obj = req.body;
    obj.isDeleted = false;
    obj.billStatus = false;
    delete obj._id;
    // obj.lrNo = 1
    // return res.json({ status: false });
    // db.collection.findOne().sort({ age: -1 })
    // mongodb.findSort(req, "lr", {}, { lrNo: -1 }, function (err, MaxR) {
    //     if (MaxR) {
    //         obj.lrNo = MaxR.lrNo ? MaxR.lrNo + 1 : 1;
    //     }
    mongodb.insert(req, tableName1, obj, function (err, r) {
        if (err) {
            console.log("LR add Error :-", err);
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
            console.log("LR update Error :-", err);
            res.json({ status: false });
        }
        else {
            res.json({ status: true })
        }
    })

});
router.get('/list', function (req, res, next) {

    var query = { isDeleted: false, billStatus: false };
    mongodb.find(req, tableName1, query, function (err, result) {
        if (err) res.json({});
        else {
            res.json(result);
        }
    })
});

router.get('/lrKey/:key', function (req, res, next) {
    let key = req.params.key
    let obj = {}
    obj[key] = 1

    let query = { isDeleted: false };
    console.log(req.params);
    // return res.json({});
    mongodb.findSelection(req, tableName1, query, obj, function (err, result) {
        if (err) res.json({});
        else {

            const plunkDatta = _.pluck(result, key)
            const finalResult = _.union(plunkDatta, plunkDatta)
            let query1 = { consignorName: { $in: finalResult } }
            mongodb.find(req, tableName2, query1, function (err1, result1) {
                if (err1) res.json({});
                else {
                    res.json(result1);
                }
            })
            // res.json(finalResult);
        }
    })
});

router.post('/filter', function (req, res, next) {

    var query = req.body;
    console.log(query);
    mongodb.find(req, tableName1, query, function (err, result) {
        if (err) res.json({});
        else {
            res.json(result);
        }
    })
});



module.exports = router;

var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var mongodb = require('../models/mongodb');
var tableName1 = "vehicle"


router.post('/add', function (req, res, next) {
    var obj = req.body;
    obj.isDeleted = false;
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
router.get('/list', function (req, res, next) {
    var query = { isDeleted: false };
    mongodb.find(req, tableName1, query, function (err, result) {
        if (err) res.json({});
        else {
            res.json(result);
        }
    })
});


router.post('/filter', function (req, res, next) {

    var query = req.body;
    if (query._id) {
        query._id = ObjectID(query._id);
    }
    console.log(query);
    mongodb.find(req, tableName1, query, function (err, result) {
        if (err) res.json({});
        else {
            res.json(result);
        }
    })
});


router.post('/trip/add', function (req, res, next) {
    let _id = ObjectID(req.body._id);
    let obj = req.body;
    delete obj._id;
    obj.t_id = new ObjectId();
    let t_obj = { trip: obj }
    let myquery = { _id: _id };
    let newvalues = { $push: t_obj };
    console.log(newvalues);
    // return res.json({ status: false });
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

router.post('/trip/remove', function (req, res, next) {
    let _id = ObjectID(req.body._id);
    let t_id = ObjectID(req.body.t_id);
    let obj = req.body;
    delete obj._id;
    let t_obj = { trip: { t_id: t_id } }
    let myquery = { _id: _id };
    let newvalues = { $pull: t_obj }; ``
    console.log(newvalues);
    // return res.json({ status: false });
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

router.post('/trip/:id', function (req, res, next) {
    if (!req.params.id) return res.json({ status: false });
    let _id = ObjectID(req.params.id);
    let aggregate = [
        {
            $match:
            {
                _id: _id
            }
        },
        {
            $addFields:
            {
                totalDue: { $sum: "$trip.pendingAmount" },
            }
        }
    ]

    mongodb.aggregate(req, tableName1, aggregate, function (err, result) {
        if (err) res.json({});
        else {
            res.json(result);
        }
    })
});


module.exports = router;

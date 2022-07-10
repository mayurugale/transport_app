var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const { ObjectId } = require('mongodb');

var mongodb = require('../models/mongodb');
var tableName1 = "consignor"
var tableName2 = "bill"

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
            res.json({ status: true, _id: r._id })
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
    console.log(query);
    mongodb.find(req, tableName1, query, function (err, result) {
        if (err) res.json({});
        else {
            res.json(result);
        }
    })
});

router.get('/billList/:id', function (req, res, next) {
    let _id = req.params.id
    let aggregate = [
        {
            $match:
            {
                isDeleted: false,
                billPaid: false,
                "partyName._id": _id
            },
        },
        {
            $addFields:
            {
                totalDue: { $sum: "$totalAmount" },
            }
        }
    ]

    mongodb.aggregate(req, tableName2, aggregate, function (err, result) {
        if (err) res.json({});
        else {
            res.json(result);
        }
    })
});

router.post('/transaction/add', function (req, res, next) {
    let _id = ObjectID(req.body._id);
    let obj = req.body;
    let bill_id = []
    if (req.body.billId) {
        bill_id = req.body.billId.map(e => { return ObjectID(e) })
    }
    delete obj._id;
    obj.t_id = new ObjectId();
    let t_obj = { transaction: obj }
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
            let myquery1 = { _id: { $in: bill_id } };
            let newvalues1 = { $set: { billPaid: true } };
            mongodb.update(req, tableName2, myquery1, newvalues1, function (err, r) {
                if (err) {
                    console.log(tableName2 + "update Error :-", err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true })
                }
            })
        }
    })
});

router.post('/transaction/remove', function (req, res, next) {
    let _id = ObjectID(req.body._id);
    let t_id = ObjectID(req.body.t_id);
    let obj = req.body;
    delete obj._id;
    let t_obj = { transaction: { t_id: t_id } }
    let bill_id = []
    if (req.body.billId) {
        bill_id = req.body.billId.map(e => { return ObjectID(e) })
    }
    let myquery = { _id: _id };
    let newvalues = { $pull: t_obj };
    console.log(newvalues);
    // return res.json({ status: false });
    mongodb.update(req, tableName1, myquery, newvalues, function (err, r) {
        if (err) {
            console.log(tableName1 + "update Error :-", err);
            res.json({ status: false });
        }
        else {
            let myquery1 = { _id: { $in: bill_id } };
            let newvalues1 = { $set: { billPaid: false } };
            console.log(myquery1, newvalues1);
            mongodb.update(req, tableName2, myquery1, newvalues1, function (err, r) {
                if (err) {
                    console.log(tableName2 + "update Error :-", err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true })
                }
            })
        }
    })
});



module.exports = router;

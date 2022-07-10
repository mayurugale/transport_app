var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var mongodb = require('../models/mongodb');
var _ = require('underscore');
var tableName1 = "bill";
var tableName2 = "lr";
var tableName3 = "consignor";


/* GET home page. */


router.post('/add', function (req, res, next) {
    let obj = req.body;
    obj.isDeleted = false;
    obj.billPaid = false;
    delete obj._id;
    obj.billNo = 1
    let lrNo = []
    if (req.body.lr) {
        lrNo = _.pluck(req.body.lr, "lrNo")
    }
    var myquery = { "lrNo": { $in: lrNo } };
    var newvalues = { $set: { "billStatus": true } };
    mongodb.findSort(req, tableName1, { isDeleted: false }, { billNo: -1 }, function (err, MaxR) {
        if (MaxR) {
            obj.billNo = MaxR.billNo ? MaxR.billNo + 1 : 1;
        }
        mongodb.updateMany(req, tableName2, myquery, newvalues, function (err, r) {
            if (err) {
                console.log("bill updateMany Error :-", err);
            }
        })
        mongodb.insert(req, tableName1, obj, function (err, r) {
            if (err) {
                console.log("bill add Error :-", err);
                res.json({ status: false });
            }
            else {
                res.json({ status: true, billId: r.insertedId })
            }
        })

    })





});

router.post('/update', function (req, res, next) {
    var _id = ObjectID(req.body._id);
    var obj = req.body;
    delete obj._id;
    var myquery = { _id: _id };
    var newvalues = { $set: obj };
    let lrNo = []
    let PreviousLrNo = []
    let deletedLr = []
    let query = []
    if (req.body.lr) {
        lrNo = _.pluck(req.body.lr, "lrNo")
        query.push({
            updateMany: {
                filter: { "lrNo": { $in: lrNo } },
                update: { $set: { "billStatus": true } }
            }
        })
    }
    mongodb.findOne(req, tableName1, myquery, function (err, result) {
        if (result) {
            if (result.lr) {
                PreviousLrNo = _.pluck(result.lr, "lrNo");
                deletedLr = _.difference(PreviousLrNo, lrNo);
            }
            if (deletedLr.length) {
                query.push({
                    updateMany: {
                        filter: { "lrNo": { $in: deletedLr } },
                        update: { $set: { "billStatus": false } }
                    }
                })
            }
            mongodb.bulkWrite(req, tableName2, query, function (bulkWriteerr, bulkWriteresult) {
                if (bulkWriteerr) {
                    console.log("bill updateMany Error :-", bulkWriteerr);
                }
            })
            mongodb.update(req, tableName1, myquery, newvalues, function (err, r) {
                if (err) {
                    console.log("LR update Error :-", err);
                    res.json({ status: false });
                }
                else {
                    res.json({ status: true })
                }
            })
        }
        else {
            res.json({ status: false, Massage: "Record not present" });
        }

    })

});

router.get('/remove/:id', function (req, res, next) {
    var _id = ObjectID(req.params.id);
    var myquery = { _id: _id };
    var newvalues = { $set: { isDeleted: true } };
    let lrNo = [];
    let query = [];
    mongodb.findOne(req, tableName1, myquery, function (err, result) {
        if (result) {
            if (result.lr) {
                lrNo = _.pluck(result.lr, "lrNo");
                query.push({
                    updateMany: {
                        filter: { "lrNo": { $in: lrNo } },
                        update: { $set: { "billStatus": false } }
                    }
                })
                mongodb.bulkWrite(req, tableName2, query, function (updateManyerr, updateManyresult) {
                    if (updateManyerr) {
                        console.log("bill remove Error :-", updateManyerr);
                    }
                })
                mongodb.update(req, tableName1, myquery, newvalues, function (err, r) {
                    if (err) {
                        console.log("LR update Error :-", err);
                        res.json({ status: false });
                    }
                    else {
                        res.json({ status: true })
                    }
                })
            }
        }
        else {
            res.json({ status: false, Massage: "Record not present" });

        }
    })

})

router.post('/list', function (req, res, next) {
    var query = { isDeleted: false };
    mongodb.find(req, tableName1, query, function (err, result) {
        if (err) res.json({});
        else {
            res.json(result);
        }
    })
});

router.get('/:key', function (req, res, next) {
    var key = ObjectID(req.params.key)
    var myquery = { _id: key };
    // return res.json({});
    mongodb.findOne(req, tableName1, myquery, function (err, result) {
        if (err) res.json({});
        else {
            res.json(result);
        }
    })
});

router.get('/test/test', function (req, res, next) {
    var query = { isDeleted: false };
    mongodb.find(req, tableName3, query, function (err, result) {
        if (err) {
            console.log(err);
            res.json({});
        }
        else {
            mongodb.find(req, tableName1, {}, function (err1, result1) {
                if (err1) res.json({});
                else {
                    let updateObj = []
                    result1.map(ele => {
                        console.log(typeof ele.partyName);
                        if (typeof ele.partyName == "string") {
                            let index = result.findIndex((element) => { return element.consignorName == ele.partyName })
                            if (index != -1) {
                                result[index]._id = result[index]._id.toString()
                                updateObj.push({
                                    updateOne: {
                                        filter: { _id: ele._id },
                                        update: { $set: { partyName: result[index] } }
                                    }
                                })

                            }
                        }
                    })
                    req.db.collection(tableName1).bulkWrite(updateObj, function (err, result) {
                        if (err) {
                            console.log("bulkWrite error : ", err);
                            return
                        }
                        else {
                            console.log("bulkWrite result : ", JSON.stringify(result));
                            return
                        }


                    })

                    res.json(result1);
                }
            })
        }
    })
    mongodb.updateMany(req, tableName1, {}, { billPaid: false }, function (e, r) {

    })
});

router.get('/totalDue', function (req, res, next) {
    let aggregate = [
        {
            $match:
            {
                isDeleted: false,
                billPaid: false
            }
        },
        {
            $group:
                { _id: null, totalDue: { $sum: "$totalAmount" } }
        },
    ]

    mongodb.aggregate(req, tableName1, aggregate, function (err, result) {
        if (err) res.json({});
        else {
            res.json(result[0]);
        }
    })
})
module.exports = router;

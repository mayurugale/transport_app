
exports.insert = function (req, tName, data, cb) {
    req.db.collection(tName).insertOne(data, function (err, result) {
        if (err) return cb(err, null)
        else return cb(null, result)
    });
}

exports.update = function (req, tName, query, data, cb) {
    req.db.collection(tName).updateOne(query, data, function (err, result) {
        if (err) return cb(err, null)
        else return cb(null, result)
    });
}

exports.updateMany = function (req, tName, query, data, cb) {
    req.db.collection(tName).updateMany(query, data, function (err, result) {
        if (err) return cb(err, null)
        else return cb(null, result)
    });
}

exports.findOne = function (req, tName, data, cb) {
    req.db.collection(tName).findOne(data, function (err, result) {
        if (err) return cb(err, null)
        else return cb(null, result)
    });
}

exports.find = function (req, tName, data, cb) {
    req.db.collection(tName).find(data).toArray(function (err, result) {
        if (err) return cb(err, null)
        else return cb(null, result)
    });
}
exports.findSelection = function (req, tName, data, select, cb) {
    req.db.collection(tName).find(data, select).toArray(function (err, result) {
        if (err) return cb(err, null)
        else return cb(null, result)
    });
}
exports.findSort = function (req, tName, data, sort, cb) {
    req.db.collection(tName).find(data).sort(sort).limit(1).toArray(function (err, result) {
        // req.db.collection(tName).find(data).toArray(function (err, result) {
        if (err) return cb(err, null)
        else return cb(null, result[0])
    });
}

exports.remove = function (req, tName, data, cb) {
    req.db.collection(tName).remove(data, function (err, result) {
        if (err) return cb(err, null)
        else return cb(null, result)
    });
}
exports.bulkWrite = function (req, tName, data, cb) {
    req.db.collection(tName).bulkWrite(data, function (err, result) {
        if (err) return cb(err, null)
        else return cb(null, result)
    });
}

exports.drop = function (req, tName, cb) {
    req.db.collection(tName).drop(function (err, result) {
        if (err) return cb(err, null)
        else return cb(null, result)
    });
}

exports.aggregate = function (req, tName, data, cb) {
    req.db.collection(tName).aggregate(data).toArray(function (err, result) {
        if (err) return cb(err, null)
        else return cb(null, result)
    });
}


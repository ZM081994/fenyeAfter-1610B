var mongodb = require('mongodb');
// 定义你自己的数据库地址
var dbAddress = 'mongodb://localhost:27017';
var mongoClient = mongodb.MongoClient;

function getCollection(collectionName, ck) {
    mongoClient.connect(dbAddress, { useNewUrlParser: true }, function(err, con) {
        if (err) {
            return typeof ck === 'function' && ck(err);
        }
        // 这里 修改成你自己的数据库名称
        var db = con.db('number');
        var collection = db.collection(collectionName);
        typeof ck === 'function' && ck(null, con, collection);
    });
}
module.exports = getCollection;
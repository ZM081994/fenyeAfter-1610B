var express = require('express');
var router = express.Router();
var getCollection = require("../utils/getCollection");

/* GET home page. */
router.get('/api/page', function(req, res, next) {
    var parms = req.query,
        page = parms.page * 1, //页数
        page_size = parms.page_size * 1, //一页显示几条
        type = parms.type;

    getCollection("list", function(err, con, collection) {
        if (err) {
            return res.end();
        }
        var index = (page - 1) * page_size;
        collection.find({ type: type }).count(function(err, result) {
            if (err) {
                return res.end();
            }
            var totle = Math.ceil(result / page_size)
            selectPage(totle)
        });

        function selectPage(totle) {
            collection.find({ type: type }).skip(index).limit(page_size).toArray(function(err, result) {
                if (err) {
                    res.json({ code: 0, msg: err })
                } else {
                    res.json({ code: 1, msg: result, totle: totle })
                }
            })
        }
    })
});

module.exports = router;
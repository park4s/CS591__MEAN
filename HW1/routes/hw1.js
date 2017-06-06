/**
 * Created by jay on 2017. 6. 3..
 */
var express = require('express');
var router = express.Router();

router.get('/:named', function(req, res, next) {
    var namedParameter = req.params.named;
    var length = namedParameter.length;
    return res.json({
        string: namedParameter,
        length: length
    });
});

router.post('/postexample', function(req, res, next) {
    var string = req.body.string;
    var length = string.length;
    return res.json({
        string: string,
        length: length
    });
});


module.exports = router;

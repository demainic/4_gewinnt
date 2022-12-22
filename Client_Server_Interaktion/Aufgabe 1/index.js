var express = require('express');
var app = express();
const path = require('path');

var data = {state:{}}
var apiKeys = ['c4game']

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use('/api', function(req, res, next){
    var key = req.query['api-key']

    if (!key) {
        return next(error(400, 'api key required'))
    }
    if (!~apiKeys.indexOf(key)) {
        return next(error(401, 'invalid api key'))
    }
    req.key = key
    next()
})

app.get('/api/data/:id', function(req, res, next){
    var id = req.params.id
    var result = data[id]

    if (result) res.send(result)
    else next()
})

app.post('/api/data', function (req, res, next) {
    let id = guidGenerator()
    data[id] = req.body
    res.send({id})
})

app.delete('/api/data/:id', function(req, res, next){
    var id = req.params.id
    delete data[id]
    res.sendStatus(204)
})

app.put('/api/data/:id', function(req, res, next){
    var id = req.params.id
    if (data[id]) {
        data[id] = req.body
        res.send(req.body)
    }
    else next()
})

app.use(function(err, req, res, next){
    res.status(err.status || 500)
    res.send({ error: err.message })
})

app.use(function(req, res){
    res.status(404)
    res.send({ error: "not found" })
})

function error(status, msg) {
    let err = new Error(msg)
    err.status = status
    return err
}

app.listen(3000, () => console.log('Example app listening on port 3000!'));
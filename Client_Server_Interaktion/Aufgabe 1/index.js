var express = require('express');
var app = express();
const path = require('path');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.use('/public', express.static(path.join(__dirname, 'public')))


app.put('/api/data', (request, response) => {
         console.log(request);
    }
);

app.get('/api/data', (request, response) => {
        console.log(request);
    }
);




app.listen(3000, () => console.log('Example app listening on port 3000!'));
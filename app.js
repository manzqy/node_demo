const http = require('http')

let router = require('./router')

const app = http.createServer()

app.listen(3003, '127.0.0.1', () => {
    console.log('server is running at http://127.0.0.1:3003');
    
})

app.on('request', function(req, res) {
    router(req, res)
})
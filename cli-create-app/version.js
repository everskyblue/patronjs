const https = require('https');

const opt = {
    hostname: 'api.github.com',
    port: 443,
    path: '/repos/everskyblue/patronjs/tags',
    method: 'GET',
    headers: {
        'User-Agent': 'request'
    }
}


module.exports = function (callback) {
    const req = https.get(opt, res => {
        let data = '';

        res.on('data', d => { data += d })
        
        res.on('end', () => {
            callback(JSON.parse(data));
        });
    })

    req.on('error', error => {
        console.error(`an error occurred while making a request on github to get the version: ` + error)
    })

    req.end();
}
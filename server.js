const http = require('http');
const fs = require('fs');
const crypto = require("crypto");
const { parse } = require('querystring');
const hostname = '127.0.0.1';
const port = 8083;


const server = http.createServer((req, res) => {
    // req.method
    // req.url
    console.log(req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if(req.url.indexOf('/client-builder/clientconfig') === 0) {
        if(req.method === 'POST') {
            let id = null;
            let hasId = req.url.replace('/client-builder/clientconfig/', '');
            if(hasId.length === 32) {
                id = hasId;
            } else {
                id = crypto.randomBytes(16).toString("hex");
            }
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
            });
            req.on('end', () => {
                
                let boundryLen = body.indexOf('\r\n');
                let boundry = body.indexOf('\r\n\r\n'); //body.substring(0, body.indexOf('\n'));
                body = body.substring(boundry, body.length - boundryLen-4);
                console.log("Saving ", boundry, id, body);
                fs.writeFile('configs/'+id+'.json', body, (err) => {
                    if(err) {
                        console.log(err);
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'text/plain');
                        return res.end('Error saving settings!\n');
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        return res.end(JSON.stringify({status:'success', settings_id: id}));
                    }
                }); 
            });
        } else if(req.method === 'GET') {
            let [url, queryString] = req.url.split('?');
            let queries = queryString.split('&');
            let query = {};
            queries.forEach((q) => {
                let [k, v] = q.split('=');
                query[k] = v;
            });

            if(query.settings && query.settings.toLowerCase().match(/[a-f0-9]{32}/)) {
                fs.readFile('configs/'+query.settings+'.json', (err, data) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(data.toString());
                });
            }
        } else if(req.method === 'OPTIONS') {
            res.statusCode = 200;
            return res.end();
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Nothing!\n');
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
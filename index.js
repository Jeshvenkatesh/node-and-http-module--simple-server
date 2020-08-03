const http = require('http');

const fs = require('fs');

const path = require('path');

const port = 4000;

const hostname = 'localhost';

const server = http.createServer((req,res)=>{
    console.log(req.headers, req.url,req.method);

    if(req.method == 'GET'){
        var fileurl;
        if(req.url == '/'){
            fileurl = '/index.html';
        }else{
            fileurl = req.url;
        }
    var filePath = path.resolve('./Public' + fileurl);
    var fileExt = path.extname(filePath);
    if(fileExt == '.html'){
        fs.exists(filePath,(exists)=>{
            if(!exists){
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end('<html><body><h1>Error 404 :' + fileurl + ' is not found </h1></body></html>');
                return;
            }
            res.statusCode == 200;
            res.setHeader('Content-Type','text/html');
            fs.createReadStream(filePath).pipe(res);
        })

    }else{
        res.statusCode = 404;
        res.setHeader('Content-Type','text/html');
        res.end('<html><body><h1>Error 404 : '+ fileurl +' not an html file </h1></body></html>');
        return;
    }
    }else{
        res.statusCode = 404;
        res.setHeader('Content-type', 'text/html');
        res.end('<html><body><h1>Error 404:' + req.method + ' not supported </h1></body></html>');
    }
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    // res.end('<html><body><h1>Hello world</h1></body></html>');
});

server.listen(port,hostname,()=>{
    console.log(`server running at http://${hostname}:${port}`);
});

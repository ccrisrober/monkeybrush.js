#!/usr/bin/env node

var http = require('http');

const PORT = process.argv[2] ? parseInt(process.argv[2], 0) : 8000;

function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

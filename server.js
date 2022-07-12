const http = require('http');
const fs = require('fs');
const qs = require('qs');

let server = http.createServer((req, res) => {
    let methodRequest = req.method;
    if(methodRequest === 'GET'){
        fs.readFile('./templates/creat.html', 'utf-8', (err, data) => {
            if(err){ console.log(err.message)}
            res.writeHeader(200, {'Content-Type':'text/html'});
            res.write(data);
            return res.end();
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            let parsedata = qs.parse(data);
            let name = `${parsedata.name}\n`;
            fs.writeFile('./data/data.txt', name, {flag:'a'}, (err) => {
                if(err){
                    console.log(err.message);
                    return res.end();
                } else {
                    return res.end('Create success');
                }
            });
        });
        req.on('error', ()=>{
            console.log('error');
        })
    }
})

server.listen(8080, () => {
    console.log('Server is running on port 8080');
})
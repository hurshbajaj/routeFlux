class routeFlux{ //entry point
    static serversLog = []
    static http = require("http")
    constructor(){

    }
}

class Server extends routeFlux{
    static uuidv4 = require('uuid').v4;
    constructor(PORT, handlers) {
        super();

        this.id = Server.uuidv4();
        this.httpRef = routeFlux.http.createServer((req, res) => {

            handlers.forEach(handler => {
                if(handler.url === req.url){
                    //challenge (:
                    routeFlux.serversLog.forEach((server) => {
                        server.id === this.id && server.reqLog.push(req);
                    })
                    handler.callback(req, res);
                }

            })

        })
        this.httpRef.listen(PORT);

        routeFlux.serversLog.push({
            serverId: this.id,
            port: PORT,
            reqLog: []
        })
        console.log(routeFlux.serversLog);
    }
}
class handler{
    constructor(type, url, callback = (req, res) => {}) {
        this.type = type
        this.url = url;
        this.callback = callback;

    }
}

function test(){
    let home = new handler("GET", "/", (req, res) => {
        res.setHeader("Content-Type", "text/plain");
        res.end("Hello World");
    })
    let about = new handler("GET", "/about", (req, res) => {
        res.setHeader("Content-Type", "text/plain");
        res.end("about world");
    })
    const server = new Server(3000, [home, about]);
}
test()


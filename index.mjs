import http from "http";
import url, { URLSearchParams } from "url";
import querystring from "querystring";

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url);
    const parsedQuery = new URLSearchParams(query);

    if(pathname ==="/page") {
     if(pathname==="/page") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("You are on the home page\n");
    } else if(pathname==="/page/about") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        const tabQuery = parsedQuery.get("tab");
        if(tabQuery){
            res.end(`You are on the about page with tab = ${tabQuery}`);
        } else {
            res.end("You are on the about page");
        }
        
    } else if(pathname==="/page/blog") {
        res.statusCode = 200;   
        res.setHeader("Content-Type", "text/plain");
        res.end("You are on the blog page");
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Page not found");
    }
} else if (pathname.includes("/api")) {
    if (req.method === "POST" && pathname === "/api/submit") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
            console.log({chunk: chunk.toString(),});
        });

        req.on("end", () => {
            const parsedData = querystring.parse(body);
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain");
            res.end(`Data received: ${JSON.stringify(parsedData)}\n`);
        });
    }
}
});
   
    
server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
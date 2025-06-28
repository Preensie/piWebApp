const httpInstance = require('http');
const httpStatusInstance = require('http-status-codes');
const fsInstance = require('fs');
const portNumber = 3000;

// Create a server instance
const httpServer = httpInstance.createServer((req, res) => {
    if (req.url === '/'){
        res.writeHead(httpStatusInstance.StatusCodes.OK, {
		"Content-Type": "text/html"
	});
	readFile(redirectToHtml(`pages/landing`), res)
    }
    else if (req.url === '/projectV1') {
        // Write an html response to the client
        res.writeHead(httpStatusInstance.StatusCodes.OK, {
            "Content-Type": "text/html"
        });
        readFile(redirectToHtml(`pages/projectV1`), res);
    }
});

// Concat the url with `html` extension
const redirectToHtml = (url) => {
    return `${url}.html`;
};

// Read file
const readFile = (file_path, res) => {
    if (fsInstance.existsSync(file_path)) {
        fsInstance.readFile(file_path, (error, data) => {
            if (error) {
                console.log(error);
                handleError(res);
                return;
            }
            res.write(data);
            res.end();
        });
    } else {
        handleError(res);
    }
};

const handleError = res => {
    res.writeHead(httpStatusInstance.StatusCodes.NOT_FOUND, {
        "Content-Type": "text/html"
    });
    res.write(`<h1>HTML file not found!</h1>`);
    res.end();
};

// Setup the server to listen on port 8080
httpServer.listen(portNumber, () => {
    console.log(`Server is listening on port ${portNumber}`);
});

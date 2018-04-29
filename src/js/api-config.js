const hostname = window && window.location && window.location.hostname;
let apiHostname;
let port;

if (hostname === 'localhost') {
    apiHostname = 'localhost';
    port = '3001';
} else {
    apiHostname = '138.68.87.152';
    port = '3001';
}

export {apiHostname, port};
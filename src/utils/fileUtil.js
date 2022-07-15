function bytesToSize(bytes) {
    if(bytes === 0) return "0 B";

    var k = 1024;
    var sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    var i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
}

export default {
    bytesToSize
}
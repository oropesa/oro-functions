const osIsLinux = function() {
    return process.platform === 'linux';
}

module.exports = { osIsLinux };
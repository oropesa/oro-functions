const osIsWindows = function() {
    return process.platform === 'win32';
}

module.exports = { osIsWindows };
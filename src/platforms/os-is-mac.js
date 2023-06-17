const osIsMac = function() {
    return process.platform === 'darwin';
}

module.exports = { osIsMac };
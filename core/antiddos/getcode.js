const slowAES = require("./aes")

function toNumbers(_0xa341x2) {
    var _0xa341x3 = [];
    _0xa341x2['replace'](/(..)/g, function(_0xa341x2) {
        _0xa341x3['push'](parseInt(_0xa341x2, 16))
    });
    return _0xa341x3
}

function toHex() {
    for (var _0xa341x2 = 1 == arguments['length'] && arguments[0]['constructor'] == Array ? arguments[0] : arguments, _0xa341x3 = '', _0xa341x5 = 0; _0xa341x5 < _0xa341x2['length']; _0xa341x5++) {
        _0xa341x3 += (16 > _0xa341x2[_0xa341x5] ? '0' : '') + _0xa341x2[_0xa341x5].toString(16)
    };
    return _0xa341x3['toLowerCase']()
}

module.exports = function getCode(words){
    const a = toNumbers(words[0])
    const b = toNumbers(words[1])
    const c = toNumbers(words[2])
    return toHex(slowAES.decrypt(c, 2, a, b))
}
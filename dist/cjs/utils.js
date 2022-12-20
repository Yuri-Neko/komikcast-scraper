"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUrl = exports.domain = void 0;
exports.domain = 'site';
const REGEX_URL = /\/komik\/(.*)\/?/;
/**
 * Help me to fix this :/
 */
function parseUrl(url) {
    let result;
    if (/http?s:\/\//i.test(url)) {
        const Match = url.match(REGEX_URL);
        if (Match) {
            if (Match[1].includes('chapter')) {
                result = 'https://apk.nijisan.my.id/komik/baca/' + Match[1];
            }
            else {
                result = 'https://apk.nijisan.my.id/komik/info/' + Match[1];
            }
        }
        else {
            result = false;
        }
    }
    else {
        if (url.includes('chapter')) {
            result = 'https://apk.nijisan.my.id/komik/baca/' + url;
        }
        else {
            result = 'https://apk.nijisan.my.id/komik/info/' + url;
        }
    }
    return result;
}
exports.parseUrl = parseUrl;
//# sourceMappingURL=utils.js.map
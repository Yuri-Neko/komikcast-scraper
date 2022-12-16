const domain = 'site';
const REGEX_URL = /\/komik\/(.*)\/?/;
function parseUrl(url) {
    if (/http?s:\/\//i.test(url)) {
        const Match = url.match(REGEX_URL);
        if (Match) {
            if (Match.includes('chapter')) {
                return {
                    passed: true,
                    type: 0,
                    url: 'https://apk.nijisan.my.id/komik/baca/' + Match[1],
                };
            }
            return {
                passed: true,
                type: 1,
                url: 'https://apk.nijisan.my.id/komik/info/' + Match[1],
            };
        }
        else {
            return {
                passed: false,
            };
        }
    }
    else {
        if (url.includes('chapter')) {
            return {
                passed: true,
                type: 0,
                url: 'https://apk.nijisan.my.id/komik/baca/' + url,
            };
        }
        else {
            return {
                passed: true,
                type: 1,
                url: 'https://apk.nijisan.my.id/komik/info/' + url,
            };
        }
    }
}
export { domain, parseUrl };
//# sourceMappingURL=utils.js.map
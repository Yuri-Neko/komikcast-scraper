"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info = exports.Search = exports.Latest = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_js_1 = require("./utils.js");
const BASE_URL = 'https://apk.nijisan.my.id';
const API_LATEST = `${BASE_URL}/premium/home/latest/1/1`;
const API_SEARCH = (query) => `${BASE_URL}/komik/search/${query}/1/1`;
/**
 * Get latest comics update
 * @returns {Promise<Object>}
 */
const Latest = async () => {
    let result;
    const data = await axios_1.default
        .request({
        url: API_LATEST,
        method: 'GET',
        headers: {
            'User-Agent': 'okhttp/4.9.3',
        },
    })
        .catch((e) => {
        return e.response;
    });
    if (data.data && data.data.data.length) {
        result = {
            success: true,
            ...data.data,
        };
    }
    else {
        result = {
            success: false,
            message: 'Failed to fetch data from {API_LATEST}',
        };
    }
    return result;
};
exports.Latest = Latest;
/**
 * Get comics data by query
 * @param {String} query
 * @returns {Promise<object>}
 */
const Search = async (query) => {
    let result;
    const data = await axios_1.default
        .request({
        url: API_SEARCH(query),
        method: 'GET',
        headers: {
            'User-Agent': 'okhttp/4.9.3',
        },
    })
        .catch((e) => {
        return e.response;
    });
    if (data.data && data.data.page) {
        const _tmp = [];
        for (const i of data.data.page) {
            _tmp.push({
                ...i,
                link: `https://komikcast.${utils_js_1.domain}/komik/${i.linkId}/`,
            });
        }
        result = {
            success: true,
            data: _tmp,
        };
    }
    else {
        result = {
            success: false,
            message: `Error, Query "${query}" Not Found or idk`,
        };
    }
    return result;
};
exports.Search = Search;
/**
 * get comic details
 * @param {String} url
 * @returns {Promise<Object>}
 */
const Info = async (url) => {
    let result;
    const uri = (0, utils_js_1.parseUrl)(url);
    if (!uri) {
        return {
            success: false,
            message: "Error, url didn't match {parseUrl}",
        };
    }
    const data = await axios_1.default
        .request({
        url: String(uri),
        method: 'GET',
        headers: {
            'User-Agent': 'okhttp/4.9.3',
        },
    })
        .catch((e) => {
        return e.response;
    });
    if (data.data) {
        if (data.data && data.data.images) {
            result = {
                success: true,
                ...data.data,
            };
        }
        else if (data.data && data.data.list_chapter) {
            let _tmp = [];
            for (const i of data.data.list_chapter) {
                _tmp.push({
                    ...i,
                    link: `https://komikcast.${utils_js_1.domain}/komik/${i.linkId}/`,
                });
            }
            data.data['type'] = data.data['type'].replace(/Type: /g, '');
            data.data['released'] = data.data['released'].replace(/\D/g, '');
            delete data.data['list_chapter'];
            result = {
                success: true,
                ...data.data,
                list_chapter: _tmp,
            };
        }
        else {
            result = {
                success: false,
                message: 'Error, something wrong with {parseUrl} maybe',
            };
        }
    }
    else {
        result = {
            success: false,
            message: 'Axios failed sending GET request to {parseUrl}',
        };
    }
    return result;
};
exports.Info = Info;
const komikcast = {
    Search: exports.Search,
    Latest: exports.Latest,
    Info: exports.Info,
    search: exports.Search,
    latest: exports.Latest,
    detail: exports.Info,
};
exports.default = komikcast;
//# sourceMappingURL=index.js.map
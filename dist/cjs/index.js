"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info = exports.Latest = exports.Search = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_js_1 = require("./utils.js");
async function Latest() {
    const result = [];
    try {
        const { data } = await axios_1.default.request({
            url: 'https://apk.nijisan.my.id/premium/home/latest/1/1',
            method: 'GET',
            headers: {
                'User-Agent': 'okhttp/4.9.3',
            },
        });
        for (const i of data.data) {
            result.push({
                title: i.title,
                ch: i.ch,
                type: i.type,
                rating: i.rating,
                image: i.image,
                image2: i.image2,
                link: i.link,
            });
        }
        return result;
    }
    catch (error) {
        return error;
    }
}
exports.Latest = Latest;
async function Search(query) {
    const result = [];
    try {
        const { data } = await axios_1.default.request({
            url: `https://apk.nijisan.my.id/komik/search/${query}/1/1`,
            method: 'GET',
            headers: {
                'User-Agent': 'okhttp/4.9.3',
            },
        });
        for (const i of data.page) {
            result.push({
                title: i.title,
                chapter: i.chapter,
                rating: i.rating,
                image: i.image,
                image2: i.image2,
                type: i.type,
                isCompleted: i.isCompleted || false,
                link: `https://komikcast.${utils_js_1.domain}/komik/${i.linkId}/`,
                LinkId: i.linkId,
            });
        }
        return result;
    }
    catch (error) {
        return error;
    }
}
exports.Search = Search;
async function Info(url) {
    const _a = (0, utils_js_1.parseUrl)(url);
    if (!_a.passed) {
        return false;
    }
    try {
        const { data } = await axios_1.default.request({
            url: _a.url,
            method: 'GET',
            headers: {
                'User-Agent': 'okhttp/4.9.3',
            },
        });
        if (_a.type == 0) {
            return {
                title: data.comic_title,
                chapter: data.ch,
                prev_ch: data.prev_ch || false,
                next_ch: data.next_ch || false,
                images: data.images,
            };
        }
        else if (_a.type == 1) {
            const result = [];
            for (const i of data.list_chapter) {
                result.push({
                    chapter: i.ch,
                    time_release: i.time_release,
                    link: `https://komikcast.${utils_js_1.domain}/komik/${i.linkId}/`,
                    linkId: i.linkId,
                });
            }
            return {
                link: url,
                title: data.title,
                title_other: data.title_other,
                author: data.author,
                image: data.image,
                image2: data.image2,
                rating: data.rating,
                sinopsis: data.sinopsis,
                type: data.type.replace(/Type: /g, ''),
                status: data.status,
                released: data.released.replace(/\D/g, ''),
                total_chapter: data.total_chapter,
                updated_on: data.updated_on,
                genres: data.genres,
                chapters: result,
            };
        }
        return false;
    }
    catch (error) {
        return error;
    }
}
exports.Info = Info;
//# sourceMappingURL=index.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { domain, parseUrl } from "./utils";
function Latest() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        try {
            const { data } = yield axios.request({
                url: "https://apk.nijisan.my.id/premium/home/latest/1/1",
                method: "GET",
                headers: {
                    "User-Agent": "okhttp/4.9.3",
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
    });
}
function Search(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        try {
            const { data } = yield axios.request({
                url: `https://apk.nijisan.my.id/komik/search/${query}/1/1`,
                method: "GET",
                headers: {
                    "User-Agent": "okhttp/4.9.3",
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
                    link: `https://komikcast.${domain}/komik/${i.linkId}/`,
                    LinkId: i.linkId,
                });
            }
            return result;
        }
        catch (error) {
            return error;
        }
    });
}
function Info(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const _a = parseUrl(url);
        if (!_a.passed) {
            return false;
        }
        try {
            const { data } = yield axios.request({
                url: _a.url,
                method: "GET",
                headers: {
                    "User-Agent": "okhttp/4.9.3",
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
                        link: `https://komikcast.${domain}/komik/${i.linkId}/`,
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
                    type: data.type.replace(/Type: /g, ""),
                    status: data.status,
                    released: data.released.replace(/\D/g, ""),
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
    });
}
export { Search, Latest, Info };

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info = exports.Latest = exports.Search = void 0;
var axios_1 = __importDefault(require("axios"));
var utils_1 = require("./utils");
function Latest() {
    return __awaiter(this, void 0, void 0, function () {
        var result, data, _i, _b, i, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    result = [];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.request({
                            url: "https://apk.nijisan.my.id/premium/home/latest/1/1",
                            method: "GET",
                            headers: {
                                "User-Agent": "okhttp/4.9.3",
                            },
                        })];
                case 2:
                    data = (_c.sent()).data;
                    for (_i = 0, _b = data.data; _i < _b.length; _i++) {
                        i = _b[_i];
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
                    return [2 /*return*/, result];
                case 3:
                    error_1 = _c.sent();
                    return [2 /*return*/, error_1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.Latest = Latest;
function Search(query) {
    return __awaiter(this, void 0, void 0, function () {
        var result, data, _i, _b, i, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    result = [];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.request({
                            url: "https://apk.nijisan.my.id/komik/search/".concat(query, "/1/1"),
                            method: "GET",
                            headers: {
                                "User-Agent": "okhttp/4.9.3",
                            },
                        })];
                case 2:
                    data = (_c.sent()).data;
                    for (_i = 0, _b = data.page; _i < _b.length; _i++) {
                        i = _b[_i];
                        result.push({
                            title: i.title,
                            chapter: i.chapter,
                            rating: i.rating,
                            image: i.image,
                            image2: i.image2,
                            type: i.type,
                            isCompleted: i.isCompleted || false,
                            link: "https://komikcast.".concat(utils_1.domain, "/komik/").concat(i.linkId, "/"),
                            LinkId: i.linkId,
                        });
                    }
                    return [2 /*return*/, result];
                case 3:
                    error_2 = _c.sent();
                    return [2 /*return*/, error_2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.Search = Search;
function Info(url) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, result, _i, _b, i, error_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = (0, utils_1.parseUrl)(url);
                    if (!_a.passed) {
                        return [2 /*return*/, false];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.request({
                            url: _a.url,
                            method: "GET",
                            headers: {
                                "User-Agent": "okhttp/4.9.3",
                            },
                        })];
                case 2:
                    data = (_c.sent()).data;
                    if (_a.type == 0) {
                        return [2 /*return*/, {
                                title: data.comic_title,
                                chapter: data.ch,
                                prev_ch: data.prev_ch || false,
                                next_ch: data.next_ch || false,
                                images: data.images,
                            }];
                    }
                    else if (_a.type == 1) {
                        result = [];
                        for (_i = 0, _b = data.list_chapter; _i < _b.length; _i++) {
                            i = _b[_i];
                            result.push({
                                chapter: i.ch,
                                time_release: i.time_release,
                                link: "https://komikcast.".concat(utils_1.domain, "/komik/").concat(i.linkId, "/"),
                                linkId: i.linkId,
                            });
                        }
                        return [2 /*return*/, {
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
                            }];
                    }
                    return [2 /*return*/, false];
                case 3:
                    error_3 = _c.sent();
                    return [2 /*return*/, error_3];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.Info = Info;

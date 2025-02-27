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
        while (_) try {
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
var superagent_1 = __importDefault(require("superagent"));
var cheerio_1 = __importDefault(require("cheerio"));
// node文件操作
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var crowller = /** @class */ (function () {
    // 类初始化就会触发构造器
    function crowller() {
        this.url = 'http://h33413398.host3v.com/';
        this.getHtml();
    }
    // 请求网页数据
    crowller.prototype.getHtml = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, superagent_1.default.get(this.url)];
                    case 1:
                        result = _a.sent();
                        this.getCurrentInfo(result.text);
                        return [2 /*return*/];
                }
            });
        });
    };
    // 提取需要的数据
    crowller.prototype.getCurrentInfo = function (html) {
        // 使用插件
        var $ = cheerio_1.default.load(html);
        var courseItem = $('.course-item');
        // 数据结构数组
        var itemObj = [];
        courseItem.map(function (index, element) {
            var descs = $(element).find('.course-desc');
            // 标题
            var title = descs.eq(0).text();
            // 人数
            var count = parseInt(descs.eq(1).text().split('：')[1]);
            itemObj.push({
                title: title,
                count: count
            });
        });
        // 生成对应的数据结构
        this.structureData(itemObj);
    };
    // 生成数据结构
    crowller.prototype.structureData = function (data) {
        // 传给存储数据结构的函数
        this.saveItem({
            time: new Date().getTime(),
            data: data
        });
    };
    // 存储数据
    crowller.prototype.saveItem = function (data) {
        var filePath = path_1.default.join(__dirname, '../data/dest.json');
        // 文件内容
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            // 文件存在
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[data.time] = data.data;
        fs_1.default.writeFileSync(filePath, JSON.stringify(fileContent));
    };
    return crowller;
}());
// 实例化类
// const crwller = new crowller()
exports.default = crowller;

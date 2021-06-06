"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowller_1 = __importDefault(require("./crowller"));
// node文件操作
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var util_1 = require("./util");
// 实例化路由
var router = express_1.Router();
// 创建登录请求
router.post('/login', function (req, res) {
    if (req.body.password == 123) {
        if (req.session) {
            req.session.login = true;
        }
        res.json(util_1.getResponseData(true));
    }
    else {
        res.json(util_1.getResponseData(false, '密码错误，登录失败！'));
    }
});
// 是否已登录
router.get('/islogin', function (req, res) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.json(util_1.getResponseData(true));
    }
    else {
        res.json(util_1.getResponseData(false, '用户未登录请先登录！'));
    }
});
// 退出登录
router.get('/outlogin', function (req, res) {
    if (req.session) {
        req.session.login = false;
    }
    res.json(util_1.getResponseData(true));
});
// 刷新网页爬取数据
router.get('/getData', function (req, res) {
    // 实例化类
    new crowller_1.default();
    res.json(util_1.getResponseData(true));
});
// 将数据展示给页面
router.get('/backData', function (req, res) {
    var filePath = path_1.default.join(__dirname, '../data/dest.json');
    // 文件内容
    var fileContent = {};
    if (fs_1.default.existsSync(filePath)) {
        // 文件存在
        fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
    }
    else {
        res.json();
    }
    res.json(util_1.getResponseData(fileContent));
});
// 导出
exports.default = router;

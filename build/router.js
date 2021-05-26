"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowller_1 = __importDefault(require("./crowller"));
var util_1 = require("./util");
// 实例化路由
var router = express_1.Router();
// 创建get请求
router.get('/', function (req, res) {
    console.log(req.body);
    res.send('helo!');
});
// 刷新网页爬取数据
router.get('/getData', function (req, res) {
    // 实例化类
    var htmlData = new crowller_1.default();
    res.json(util_1.getResponseData(true));
});
// 导出
exports.default = router;

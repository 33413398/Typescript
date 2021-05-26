"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var router_1 = __importDefault(require("./router"));
// 实例化express服务器
var app = express_1.default();
// 解析请求参数，务必写到路由前面
app.use(body_parser_1.default.urlencoded({ extended: false }));
// cookie登录保存
app.use(cookie_session_1.default({
    name: 'session',
    keys: ['userName'],
    //Cookie Options
    maxAge: 24 * 60 * 60 * 1000 //24hours
}));
// 路由挂载
app.use(router_1.default);
// 监听服务器
app.listen(7001, function () {
    console.log('服务器启动成功！');
});

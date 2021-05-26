import express from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import router from './router'

// 实例化express服务器
const app = express()
// 解析请求参数，务必写到路由前面
app.use(bodyParser.urlencoded({extended:false}))
// cookie登录保存
app.use(cookieSession({
  name: 'session',
  keys: ['userName'],
  //Cookie Options
  maxAge: 24*60*60*1000 //24hours
}))
// 路由挂载
app.use(router)
// 监听服务器
app.listen(7001,()=>{
  console.log('服务器启动成功！');
  
})
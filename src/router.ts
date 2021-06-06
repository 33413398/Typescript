import {Router,Request,Response} from 'express'
import Crwller from './crowller'
// node文件操作
import fs from 'fs'
import path from 'path'
import {getResponseData} from './util'

// 实例化路由
const router = Router()
// 数据类型
interface Item {
  title: string;
  count: number;
}
// 内容类型
interface Content {
  // propName任意变量
  [propName:number]:Item[]
}
// 创建登录请求
router.post('/login',(req:Request,res:Response)=>{
  if(req.body.password==123) {
    if(req.session) {
      req.session.login = true
    }
    res.json(getResponseData(true))
  }else {
    res.json(getResponseData(false,'密码错误，登录失败！'))
  }
})
// 是否已登录
router.get('/islogin',(req:Request,res:Response)=>{
  const isLogin = req.session?req.session.login:false
  if(isLogin) {
    res.json(getResponseData(true))
  }else {
    res.json(getResponseData(false,'用户未登录请先登录！'))
  }
})
// 退出登录
router.get('/outlogin',(req:Request,res:Response)=>{
  if(req.session) {
    req.session.login = false
  }
  res.json(getResponseData(true))
})
// 刷新网页爬取数据
router.get('/getData',(req:Request,res:Response)=>{
  // 实例化类
    new Crwller();
    res.json(getResponseData(true))
})
// 将数据展示给页面
router.get('/backData',(req:Request,res:Response)=>{
  const filePath = path.join(__dirname,'../data/dest.json')
    // 文件内容
    let fileContent:Content = {}
    if(fs.existsSync(filePath)) {
      // 文件存在
      fileContent=JSON.parse(fs.readFileSync(filePath,'utf-8'))
    }else {
      res.json()
    }
    res.json(getResponseData(fileContent))
})

// 导出
export default router